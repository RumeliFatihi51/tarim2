const { chromium } = require("/opt/codex/cua_node/lib/node_modules/playwright");
const assert = require("node:assert/strict"),
  fs = require("node:fs");
const { PNG } = require("/opt/codex/cua_node/lib/node_modules/pngjs");
const base = process.env.QA_BASE_URL || "http://localhost:4173/";
const result = { base, checks: [], errors: [] };
const sample = (buffer) => {
  const im = PNG.sync.read(buffer),
    a = [];
  for (let y = 0; y < 128; y++)
    for (let x = 0; x < 128; x++) {
      let i =
        (Math.floor((y / 128) * im.height) * im.width +
          Math.floor((x / 128) * im.width)) *
        4;
      a.push(im.data[i], im.data[i + 1], im.data[i + 2]);
    }
  return a;
};
const difference = (a, b) =>
  a.reduce((s, v, i) => s + Math.abs(v - b[i]), 0) / a.length;
(async () => {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-dev-shm-usage",
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
    ],
  });
  try {
    const mobile = await browser.newContext({
      viewport: { width: 390, height: 844 },
    });
    let page = await mobile.newPage();
    page.on("pageerror", (e) => result.errors.push(e.message));
    await page.goto(base, { waitUntil: "networkidle" });
    const v = page.locator(".orbital-stage video");
    await page.waitForFunction(
      () => {
        const v = document.querySelector(".orbital-stage video");
        return v.readyState >= 3 && !v.paused;
      },
      { timeout: 20000 },
    );
    assert((await v.evaluate((v) => v.currentSrc)).includes("-mobile.webm"));
    assert.equal(await page.locator("canvas").count(), 0);
    result.checks.push("Mobile uses its own decoded WebM film, no WebGL");
    const toggle = page.locator(".orbital-stage .film-toggle");
    await toggle.click();
    assert(await v.evaluate((v) => v.paused));
    await toggle.click();
    await page.waitForFunction(
      () => !document.querySelector(".orbital-stage video").paused,
    );
    result.checks.push("Mobile film pause and resume");
    await page.getByRole("button", { name: "Menüyü aç", exact: true }).click();
    assert(await v.evaluate((v) => v.paused));
    await page
      .getByRole("button", { name: "Menüyü kapat", exact: true })
      .click();
    await page.waitForFunction(
      () => !document.querySelector(".orbital-stage video").paused,
    );
    result.checks.push("Menu pauses and resumes film");
    await page.evaluate(() =>
      window.scrollTo({ top: 2500, behavior: "instant" }),
    );
    await page.waitForTimeout(250);
    assert(await v.evaluate((v) => v.paused));
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForTimeout(150);
    assert(await v.evaluate((v) => v.paused));
    result.checks.push("Offscreen and reduced-motion pause");
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(base + "platform/", { waitUntil: "networkidle" });
    await page.locator(".landscape-stage").scrollIntoViewIfNeeded();
    await page.waitForFunction(
      () => {
        const v = document.querySelector(".landscape-stage video");
        return v.readyState >= 3 && !v.paused;
      },
      { timeout: 20000 },
    );
    assert(
      (
        await page
          .locator(".landscape-stage video")
          .evaluate((v) => v.currentSrc)
      ).includes("field-mobile"),
    );
    result.checks.push(
      "Independent terrain camera film decodes and plays on Platform",
    );
    await mobile.close();
    const mp4 = await browser.newContext({
      viewport: { width: 390, height: 844 },
    });
    await mp4.route("**/*.webm", (r) => r.abort());
    page = await mp4.newPage();
    await page.goto(base, { waitUntil: "networkidle" });
    await page.waitForFunction(
      () => {
        const v = document.querySelector(".orbital-stage video");
        return v.readyState >= 3 && !v.paused;
      },
      { timeout: 20000 },
    );
    assert(
      (
        await page.locator(".orbital-stage video").evaluate((v) => v.currentSrc)
      ).endsWith("-mobile.mp4"),
    );
    result.checks.push("MP4 plays when WebM fails");
    await mp4.close();
    const noMedia = await browser.newContext({
      viewport: { width: 390, height: 844 },
    });
    await noMedia.route(/\.(webm|mp4)(\?.*)?$/, (r) => r.abort());
    page = await noMedia.newPage();
    await page.goto(base, { waitUntil: "networkidle" });
    await page.waitForTimeout(300);
    assert(
      await page
        .locator(".orbital-stage img")
        .evaluate((i) => i.complete && i.naturalWidth > 0),
    );
    assert.equal(await page.locator(".orbital-stage .film-ready").count(), 0);
    assert(
      await page
        .getByRole("link", { name: "Platformu keşfet", exact: true })
        .first()
        .isVisible(),
    );
    result.checks.push("Broken videos retain poster and navigation");
    await noMedia.close();
    const glFail = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
    });
    await glFail.route("**/*.glb", (r) => r.abort());
    page = await glFail.newPage();
    await page.goto(base, { waitUntil: "networkidle" });
    await page.waitForFunction(
      () => {
        const v = document.querySelector(".orbital-stage video");
        return v.readyState >= 3 && !v.paused;
      },
      { timeout: 20000 },
    );
    assert.equal(await page.locator(".webgl-active").count(), 0);
    assert(
      await page
        .locator(".orbital-stage img")
        .evaluate((i) => i.naturalWidth > 0),
    );
    result.checks.push("GLB failure falls back to the actual desktop film");
    await glFail.close();
    const desktop = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
    });
    page = await desktop.newPage();
    page.on("pageerror", (e) => result.errors.push(e.message));
    await page.goto(base, { waitUntil: "networkidle" });
    await page.locator(".webgl-active canvas").waitFor({ timeout: 30000 });
    await page.waitForTimeout(200);
    assert(
      await page.locator(".orbital-stage video").evaluate((v) => v.paused),
    );
    assert(await page.locator(".scene-toggle").isVisible());
    await page.locator(".scene-toggle").click();
    assert.equal(
      await page.locator(".scene-toggle").getAttribute("aria-pressed"),
      "true",
    );
    const canvas = page.locator(".orbital-stage canvas");
    const still1 = sample(await canvas.screenshot());
    await page.waitForTimeout(100);
    const still2 = sample(await canvas.screenshot());
    result.pauseDifference = difference(still1, still2);
    assert(result.pauseDifference < 0.5);
    await page.locator(".scene-toggle").click();
    result.checks.push(
      "Original GLB renders, hidden video stops, 3D pause freezes the actual image",
    );
    // Isolate a fixed canvas viewport so forward/reverse camera pixels can be compared fairly.
    await page.addStyleTag({
      content:
        ".home-hero>.orbital-stage{position:fixed!important;right:0;top:80px;width:51vw;height:780px;min-height:0;z-index:10}html{scroll-behavior:auto!important}",
    });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(900);
    const before = sample(await canvas.screenshot());
    await page.evaluate(() =>
      window.scrollTo({ top: 470, behavior: "instant" }),
    );
    await page.waitForTimeout(900);
    const forward = sample(await canvas.screenshot());
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.waitForTimeout(900);
    const reverse = sample(await canvas.screenshot());
    result.forwardDifference = difference(before, forward);
    result.reverseDifference = difference(before, reverse);
    assert(result.forwardDifference > 4);
    assert(result.reverseDifference < result.forwardDifference * 0.6);
    result.checks.push(
      "Native scroll changes the real 3D camera and scrolling back returns toward its initial framing",
    );
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForFunction(
      () => document.querySelectorAll("canvas").length === 0,
      null,
      { timeout: 5000 },
    );
    assert.equal(await page.locator("canvas").count(), 0);
    result.checks.push("Runtime reduced-motion disposes the GPU scene");
    await desktop.close();
    const resize = await browser.newContext({
      viewport: { width: 1100, height: 900 },
    });
    page = await resize.newPage();
    await page.goto(base, { waitUntil: "networkidle" });
    await page.locator(".webgl-active canvas").waitFor({ timeout: 30000 });
    await page.setViewportSize({ width: 800, height: 900 });
    await page.waitForFunction(
      () => document.querySelectorAll("canvas").length === 0,
      null,
      { timeout: 5000 },
    );
    assert.equal(await page.locator("canvas").count(), 0);
    await page.setViewportSize({ width: 1100, height: 900 });
    await page.locator(".webgl-active canvas").waitFor({ timeout: 30000 });
    result.checks.push(
      "Resize below desktop threshold releases GPU and back restores the scene",
    );
    await resize.close();
    assert.deepEqual(result.errors, []);
  } finally {
    await browser.close();
    fs.writeFileSync(
      "qa/v3/media-results.json",
      JSON.stringify(result, null, 2),
    );
  }
  console.log(JSON.stringify(result));
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

const { chromium } = require("/opt/codex/cua_node/lib/node_modules/playwright");
const assert = require("node:assert/strict"),
  fs = require("node:fs");
const { PNG } = require("/opt/codex/cua_node/lib/node_modules/pngjs");
const base = process.env.QA_BASE_URL || "http://localhost:4173/";
const result = { base, checks: [], errors: [] };
const difference = (a, b) => {
  a = PNG.sync.read(a);
  b = PNG.sync.read(b);
  assert.equal(a.data.length, b.data.length);
  let x = 0;
  for (let i = 0; i < a.data.length; i += 4)
    x +=
      Math.abs(a.data[i] - b.data[i]) +
      Math.abs(a.data[i + 1] - b.data[i + 1]) +
      Math.abs(a.data[i + 2] - b.data[i + 2]);
  return x / (a.width * a.height * 3);
};
(async () => {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    headless: true,
    args: [
      "--no-sandbox",
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
    ],
  });
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    });
    const p = await context.newPage();
    p.on("pageerror", (e) => result.errors.push(e.message));
    await p.goto(base, { waitUntil: "networkidle" });
    await p.locator(".world-opening img").evaluate((i) => i.decode());
    await p.screenshot({ path: "qa/journey/opening-desktop.png" });
    const pos = await p
      .locator(".journey")
      .evaluate((e) => ({ top: e.offsetTop, height: e.offsetHeight }));
    for (let i = 0; i < 6; i++) {
      await p.evaluate(
        (y) => scrollTo({ top: y, behavior: "instant" }),
        pos.top + ((pos.height - 900) * i) / 5,
      );
      await p.waitForTimeout(450);
      await p
        .locator(".journey-sticky.world-ready")
        .waitFor({ timeout: 30000 });
      assert.equal(
        await p
          .locator(".journey-copy .eyebrow")
          .innerText()
          .then((s) => s.slice(0, 2)),
        `0${i + 1}`,
      );
      await p.screenshot({ path: `qa/journey/phase-${i}.png` });
    }
    result.checks.push(
      "Desktop six real camera stages, readable headings and final reveal",
    );
    await p.addStyleTag({
      content:
        ".journey-sticky{position:fixed!important;inset:0!important;height:900px!important;width:1440px!important;z-index:10}.journey-copy,.journey-nav,.journey-top,.journey-note{visibility:hidden!important}html{scroll-behavior:auto!important}",
    });
    const canvas = p.locator(".journey canvas");
    await p.evaluate((y) => scrollTo({ top: y, behavior: "instant" }), pos.top);
    await p.waitForTimeout(300);
    const before = await canvas.screenshot();
    await p.evaluate(
      (y) => scrollTo({ top: y, behavior: "instant" }),
      pos.top + (pos.height - 900) * 0.6,
    );
    await p.waitForTimeout(300);
    const forward = await canvas.screenshot();
    await p.evaluate((y) => scrollTo({ top: y, behavior: "instant" }), pos.top);
    await p.waitForTimeout(300);
    const reverse = await canvas.screenshot();
    result.forwardDifference = difference(before, forward);
    result.reverseDifference = difference(before, reverse);
    assert(result.forwardDifference > 5);
    assert(result.reverseDifference < 2);
    result.checks.push(
      "Camera forward/reverse verified with actual pixel comparison",
    );
    await p.emulateMedia({ reducedMotion: "reduce" });
    await p.waitForFunction(
      () => !document.querySelector(".journey canvas"),
      null,
      { timeout: 8000 },
    );
    result.checks.push("Runtime reduced motion releases WebGL");
    await context.close();
    for (const fail of [false, true]) {
      const c = await browser.newContext({
        viewport: { width: fail ? 1100 : 390, height: 844 },
      });
      if (fail) await c.route("**/crop.glb", (r) => r.abort());
      const page = await c.newPage();
      page.on("pageerror", (e) => result.errors.push(e.message));
      await page.goto(base, { waitUntil: "networkidle" });
      await page.locator(".journey").scrollIntoViewIfNeeded();
      const v = page.locator(".journey video");
      if (!fail) {
        await page.waitForFunction(
          () => document.querySelector(".journey video").readyState >= 2,
          null,
          { timeout: 30000 },
        );
        const pos = await page
          .locator(".journey")
          .evaluate((e) => ({ top: e.offsetTop, height: e.offsetHeight }));
        await page.evaluate(
          (y) => scrollTo({ top: y, behavior: "instant" }),
          pos.top + (pos.height - 844) * 0.8,
        );
        await page.waitForFunction(
          () => {
            const v = document.querySelector(".journey video");
            return !v.seeking && v.currentTime > 8;
          },
          null,
          { timeout: 20000 },
        );
        await page.evaluate(
          (y) => scrollTo({ top: y, behavior: "instant" }),
          pos.top,
        );
        await page.waitForFunction(
          () => document.querySelector(".journey video").currentTime < 0.3,
          null,
          { timeout: 20000 },
        );
        assert.equal(await page.locator(".journey canvas").count(), 0);
        result.checks.push(
          "Mobile real video seeks forward and back after rapid scrolling",
        );
        await page.screenshot({ path: "qa/journey/mobile-journey.png" });
      } else {
        await page
          .locator(".journey img")
          .first()
          .evaluate((i) => i.decode());
        await page.waitForFunction(
          () => document.querySelector(".journey video").readyState >= 2,
          null,
          { timeout: 30000 },
        );
        assert(
          await page
            .locator(".journey img")
            .first()
            .evaluate((i) => i.naturalWidth > 0),
        );
        result.checks.push("Missing crop asset preserves visible scene/poster");
      }
      await c.close();
    }
    assert.deepEqual(result.errors, []);
  } finally {
    await browser.close();
    fs.writeFileSync(
      "qa/journey/experience.json",
      JSON.stringify(result, null, 2),
    );
  }
  console.log(JSON.stringify(result));
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

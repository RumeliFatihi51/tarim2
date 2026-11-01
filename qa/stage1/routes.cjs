const { chromium } = require("/opt/codex/cua_node/lib/node_modules/playwright");
const AxeBuilder =
  require("/workspace/qa-tools/node_modules/@axe-core/playwright").default;
const assert = require("node:assert/strict"),
  fs = require("node:fs");
const base = process.env.QA_BASE_URL || "http://localhost:4173/";
const routes = [
  "",
  "platform/",
  "teknoloji/",
  "filiz/",
  "cozumler/",
  "hakkimizda/",
  "iletisim/",
  "gizlilik/",
  "kullanim/",
  "gorsel-kredileri/",
  "404.html",
];
const result = {
  base,
  routes: [],
  accessibility: [],
  navigation: [],
  noJavaScript: [],
  failures: [],
};
(async () => {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/chromium",
    headless: true,
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
    ...(base.startsWith("https:") ? {proxy:{server:process.env.HTTPS_PROXY || process.env.HTTP_PROXY}} : {}),
  });
  try {
    for (const width of [1440, 768, 390, 320]) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        reducedMotion: "reduce",
        ignoreHTTPSErrors: true,
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      for (const route of routes) {
        const response = await page.goto(base + route, {
          waitUntil: "networkidle",
        });
        await page.evaluate(() => document.fonts.ready);
        assert.equal(response.status(), 200, route);
        assert.equal(await page.locator("h1").count(), 1, route);
        const state = await page.evaluate(() => ({
          overflow: document.documentElement.scrollWidth - innerWidth,
          title: document.title,
          main: document.querySelector("main").innerText.length,
          badImages: [...document.images]
            .filter(
              (i) => i.loading !== "lazy" && (!i.complete || !i.naturalWidth),
            )
            .map((i) => i.currentSrc),
          forms: document.querySelectorAll("form,input,textarea").length,
          videoSources: document.querySelectorAll("video source[src]").length,
          canvas: document.querySelectorAll("canvas").length,
        }));
        assert(state.overflow <= 1, route + " overflow " + width);
        assert(state.main > 60);
        assert.equal(state.forms, 0);
        assert.equal(
          state.videoSources,
          0,
          "Reduced motion must not download videos",
        );
        assert.equal(state.canvas, 0);
        assert.deepEqual(state.badImages, []);
        result.routes.push({ route, width, ...state });
        if ((width === 1440 || width === 390) && route !== "404.html") {
          const axe = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze();
          result.accessibility.push({
            route,
            width,
            violations: axe.violations.map((v) => ({
              id: v.id,
              nodes: v.nodes.map((n) => n.target),
            })),
          });
          assert.equal(
            axe.violations.length,
            0,
            JSON.stringify(
              axe.violations.map((v) => ({
                id: v.id,
                nodes: v.nodes.map((n) => n.target),
              })),
            ),
          );
        }
      }
      if (width === 390) {
        await page.goto(base, { waitUntil: "networkidle" });
        const trigger = page.getByRole("button", {
          name: "Menüyü aç",
          exact: true,
        });
        await trigger.click();
        assert(await page.locator("dialog").evaluate((d) => d.open));
        const axe = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze();
        result.accessibility.push({
          route: "mobile-menu",
          width,
          violations: axe.violations.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((n) => n.target),
          })),
        });
        assert.equal(axe.violations.length, 0, JSON.stringify(axe.violations));
        await page
          .getByRole("button", { name: "Menüyü kapat", exact: true })
          .focus();
        await page.keyboard.press("Shift+Tab");
        assert.equal(
          await page.evaluate(() => document.activeElement.textContent.trim()),
          "07İletişim",
        );
        await page.keyboard.press("Tab");
        assert.equal(
          await page.evaluate(() =>
            document.activeElement.getAttribute("aria-label"),
          ),
          "Menüyü kapat",
        );
        await page.keyboard.press("Escape");
        assert.equal(
          await page.locator("dialog").evaluate((d) => d.open),
          false,
        );
        assert.equal(
          await trigger.evaluate((b) => b === document.activeElement),
          true,
        );
        result.navigation.push(
          "Native dialog traps focus, Escape closes, trigger receives focus",
        );
        await trigger.click();
        await page.locator('dialog nav a[href="/teknoloji/"]').click();
        await page.waitForURL("**/teknoloji/");
        assert((await page.locator("h1").innerText()).includes("bilim"));
        await page.reload({ waitUntil: "networkidle" });
        assert((await page.locator("h1").innerText()).includes("bilim"));
        await page.goBack({ waitUntil: "networkidle" });
        result.navigation.push(
          "Mobile menu navigation, deep-link reload and history back",
        );
      }
      assert.deepEqual(errors, [], JSON.stringify(errors));
      await context.close();
    }
    const context = await browser.newContext({
      javaScriptEnabled: false,
      viewport: { width: 390, height: 844 },
      ignoreHTTPSErrors: true,
    });
    const page = await context.newPage();
    for (const route of routes.slice(0, 7)) {
      await page.goto(base + route, { waitUntil: "networkidle" });
      assert.equal(await page.locator("h1").count(), 1);
      assert((await page.locator("main").innerText()).length > 150);
      assert.equal(await page.locator("footer nav a").count(), 6);
      result.noJavaScript.push(route || "/");
    }
    await context.close();

  } finally {
    await browser.close();
    fs.writeFileSync(
      "qa/stage1/routes.json",
      JSON.stringify(result, null, 2),
    );
  }
  console.log(
    JSON.stringify({
      routes: result.routes.length,
      axe: result.accessibility.length,
      noJs: result.noJavaScript.length,
      navigation: result.navigation,
    }),
  );
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});

import React from "react";
import { renderToString } from "react-dom/server";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { App } from "../src/App";
import { metadata, type PageId } from "../src/content/site";
const base = process.env.BASE_PATH || "/";
const origin = (
  process.env.SITE_ORIGIN ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL
    : "")
).replace(/\/$/, "");
if (!base.startsWith("/") || !base.endsWith("/"))
  throw new Error("BASE_PATH must start and end with /");
const template = readFileSync("dist/index.html", "utf8");
const escape = (s: string) =>
  s.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;");
const pages = Object.keys(metadata) as PageId[];
for (const page of pages) {
  const meta = metadata[page];
  const path = page === "home" ? "" : page === "404" ? "404.html" : `${page}/`;
  const media =
    page === "home" || page === "teknoloji"
      ? "orbit-poster"
      : page === "platform" || page === "filiz"
        ? "field-poster"
        : page === "hakkimizda"
          ? "canopy"
          : "agriculture";
  const mobileMedia = media + "-mobile";
  const film = media.endsWith("-poster");
  const preloadImage = [
    "home",
    "platform",
    "teknoloji",
    "filiz",
    "cozumler",
    "hakkimizda",
  ].includes(page)
    ? `<link rel="preload" as="image" href="${base}media/${media}.webp" media="(min-width:${film ? 768 : 601}px)"/><link rel="preload" as="image" href="${base}media/${mobileMedia}.webp" media="(max-width:${film ? 767 : 600}px)"/>`
    : "";
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escape(meta.title)}</title>`)
    .replace(
      "<!--metadata-->",
      `<meta name="description" content="${escape(meta.description)}"/><meta property="og:title" content="${escape(meta.title)}"/><meta property="og:description" content="${escape(meta.description)}"/><meta property="og:type" content="website"/><meta property="og:locale" content="tr_TR"/><meta name="twitter:card" content="summary_large_image"/><meta property="og:image" content="${origin}${base}media/og.jpg"/>${origin ? `<link rel="canonical" href="${origin}${base}${path}"/><meta property="og:url" content="${origin}${base}${path}"/>` : ""}<link rel="icon" href="${base}favicon.svg" type="image/svg+xml"/><link rel="preload" as="font" href="${base}fonts/instrument-sans.woff2" type="font/woff2" crossorigin/>${preloadImage}${page === "404" ? '<meta name="robots" content="noindex"/>' : ""}`,
    )
    .replace(
      '<div id="root">',
      `<div id="root" data-page="${page}" data-base="${base}">`,
    )
    .replace("<!--app-->", renderToString(<App page={page} base={base} />));
  const output =
    page === "home"
      ? "dist/index.html"
      : page === "404"
        ? "dist/404.html"
        : `dist/${page}/index.html`;
  mkdirSync(output.slice(0, output.lastIndexOf("/")), { recursive: true });
  writeFileSync(output, html);
}
writeFileSync("dist/.nojekyll", "");
writeFileSync(
  "dist/robots.txt",
  `User-agent: *\nAllow: /\n${origin ? `Sitemap: ${origin}${base}sitemap.xml\n` : ""}`,
);
if (origin)
  writeFileSync(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages
      .filter((p) => p !== "404")
      .map(
        (p) =>
          `<url><loc>${origin}${base}${p === "home" ? "" : p + "/"}</loc></url>`,
      )
      .join("")}</urlset>`,
  );
console.log(
  `Prerendered ${pages.length} pages. JavaScript-free content and deep links ready. Base: ${base}`,
);

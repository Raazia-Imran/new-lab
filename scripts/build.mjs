import { build, loadEnv } from "vite";
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("..", import.meta.url));
process.chdir(root);
const config = path.join(root, "frontend-ui/vite.config.js");
await build({ configFile: config });
await build({
  configFile: config,
  build: {
    ssr: path.join(root, "frontend-ui/src/prerender.jsx"),
    outDir: path.join(root, ".ssr"),
    emptyOutDir: true,
  },
});
const { render, paths, routeNames, content } = await import(
  path.join(root, ".ssr/prerender.js")
);
const template = await readFile("dist/index.html", "utf8");
const env = loadEnv("production", root, "");
const publicIndexing =
  (process.env.VITE_PUBLIC_INDEXING ?? env.VITE_PUBLIC_INDEXING) === "true";
let origin = process.env.VITE_SITE_URL || env.VITE_SITE_URL || "";
if (publicIndexing && !/^https:\/\//.test(origin))
  throw new Error(
    "VITE_SITE_URL must be an HTTPS origin before public indexing is enabled.",
  );
origin = origin.replace(/\/$/, "");
const escape = (s) =>
  String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
for (const route of [...paths, "/404/"]) {
  const known = paths.includes(route);
  const title =
    route === "/"
      ? content.settings.title
      : `${routeNames[route] || "Page not found"} | ${content.settings.title}`;
  const description =
    route === "/"
      ? content.home.heroDescription
      : `${routeNames[route] || "Page not found"} — ${content.settings.title}, ${content.settings.university}.`;
  const robots = publicIndexing && known ? "index,follow" : "noindex,nofollow";
  const url = origin + route;
  const tags = `<title>${escape(title)}</title><meta name="description" content="${escape(description)}"/><meta name="robots" content="${robots}"/><meta property="og:title" content="${escape(title)}"/><meta property="og:description" content="${escape(description)}"/><meta property="og:type" content="website"/><meta name="twitter:card" content="summary_large_image"/>${origin ? `<link rel="canonical" href="${escape(url)}"/><meta property="og:url" content="${escape(url)}"/><meta property="og:image" content="${escape(origin + "/brand/social-card.png")}"/>` : ""}`;
  const html = template
    .replace("<!--app-html-->", render(route))
    .replace("<!--page-meta-->", tags)
    .replace(
      "</head>",
      `<script id="initial-content" type="application/json">${JSON.stringify(content).replaceAll("<", "\\u003c")}</script></head>`,
    );
  const out =
    route === "/404/"
      ? "dist/404.html"
      : route === "/"
        ? "dist/index.html"
        : `dist${route}index.html`;
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, html);
}
await writeFile(
  "dist/robots.txt",
  publicIndexing
    ? `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`
    : "User-agent: *\nDisallow: /\n",
);
if (publicIndexing)
  await writeFile(
    "dist/sitemap.xml",
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((p) => `<url><loc>${escape(origin + p)}</loc></url>`).join("")}</urlset>`,
  );
await rm(".ssr", { recursive: true, force: true });
console.log(
  `Pre-rendered ${paths.length} pages and 404. Indexing: ${publicIndexing ? "enabled" : "disabled for review"}.`,
);

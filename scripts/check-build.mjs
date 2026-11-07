import { readFile, access, readdir } from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
import { paths } from "../frontend-ui/src/content.js";
for (const p of paths) {
  const html = await readFile(
    p === "/" ? "dist/index.html" : `dist${p}index.html`,
    "utf8",
  );
  assert.ok(/<h1[ >]/.test(html), `No prerendered heading: ${p}`);
  assert.ok(html.includes("<nav "));
  assert.ok(!html.includes("<!--app-html-->"));
  for (const [, src] of html.matchAll(/(?:src|href)="(\/[^"#?]*)"/g)) {
    if (src === "/") continue;
    const resolved = src.endsWith("/") ? `dist${src}index.html` : `dist${src}`;
    await access(resolved);
  }
}
assert.ok((await readFile("dist/404.html", "utf8")).includes("PAGE NOT FOUND"));
console.log(
  `Verified ${paths.length} prerendered pages, local links/assets and 404.`,
);

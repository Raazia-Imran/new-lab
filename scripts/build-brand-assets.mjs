import { readFile, writeFile } from "node:fs/promises";
import sharp from "sharp";
const img = await sharp(
  await readFile("frontend-ui/public/images/simulation-art.webp"),
)
  .png()
  .toBuffer();
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#080d28"/><image href="data:image/png;base64,${img.toString("base64")}" width="740" height="630" x="460" preserveAspectRatio="xMidYMid slice"/><rect width="640" height="630" fill="#080d28"/><rect x="65" y="76" width="34" height="5" rx="2" fill="#ff8c00"/><text x="65" y="126" font-family="Arial" font-size="15" letter-spacing="2" fill="#a9b0ce">NED UNIVERSITY</text><g font-family="Arial" font-size="54" font-weight="600" fill="white"><text x="60" y="238">Multiscale</text><text x="60" y="305">Modelling &amp;</text><text x="60" y="372">Simulation Lab</text></g><text x="65" y="459" font-family="Arial" font-size="20" fill="#f7941d">Research across scales.</text><text x="65" y="554" font-family="Arial" font-size="14" fill="#a9b0ce">Department of Mechanical Engineering</text></svg>`;
await sharp(Buffer.from(svg))
  .png()
  .toFile("frontend-ui/public/brand/social-card.png");
// Native vector icon derived from the supplied lab mark, not a replacement logo.
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="15" fill="white"/><path d="M10 54V30a9 9 0 0 1 9-9h8v33" fill="#2e3192"/><path d="M33 54V17a9 9 0 0 1 9-9h12v46" fill="#f7941d"/><g stroke="white" stroke-width="1.5"><path d="M15 31h8m-4-4v8M39 21h9m-4-5v10M39 35h9m-4-4v8"/></g><g fill="white"><circle cx="16" cy="42" r="1.5"/><circle cx="22" cy="42" r="1.5"/><circle cx="16" cy="47" r="1.5"/><circle cx="22" cy="47" r="1.5"/></g></svg>`;
await writeFile("frontend-ui/public/brand/favicon.svg", favicon);
for (const size of [16, 32, 180, 192, 512])
  await sharp(Buffer.from(favicon))
    .resize(size, size)
    .png()
    .toFile(`frontend-ui/public/brand/icon-${size}.png`);
await writeFile(
  "frontend-ui/public/site.webmanifest",
  JSON.stringify(
    {
      name: "Multiscale Modelling & Simulation Lab",
      short_name: "Multiscale Lab",
      start_url: "/",
      display: "browser",
      background_color: "#ffffff",
      theme_color: "#080d28",
      icons: [
        { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    },
    null,
    2,
  ),
);

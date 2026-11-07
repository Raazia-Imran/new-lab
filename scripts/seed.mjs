import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
const root = fileURLToPath(new URL("..", import.meta.url));
const data = JSON.parse(
  await readFile(path.join(root, "frontend-ui/src/content.json"), "utf8"),
);
const documents = [
  data.settings,
  data.home,
  data.pageSettings,
  ...data.projects,
  ...data.publications,
  ...data.achievements,
  ...data.partners,
  ...data.resources,
];
const apply = process.argv.includes("--apply");
console.log(
  `${apply ? "Import" : "Preview"}: ${documents.length} supplied documents; existing documents will be kept.`,
);
console.log(
  "All supplied claims are marked as needing client review. No invented content is added.",
);
if (!apply) {
  for (const d of documents)
    console.log(`${d._type}: ${d.title || d.heroTitle}`);
  console.log(
    "No API requests or writes made. Use npm run cms:seed:apply after configuring the NEW lab project.",
  );
  process.exit(0);
}
const projectId = process.env.SANITY_PROJECT_ID || "4isekt9n";
const dataset = process.env.SANITY_DATASET || "production";
if (!projectId || !process.env.SANITY_API_TOKEN)
  throw new Error(
    "Set SANITY_PROJECT_ID and SANITY_API_TOKEN in the root .env.",
  );
if (["dxinqb51"].includes(projectId))
  throw new Error(
    "Refusing to import into the existing NC4SCM project. Create a dedicated lab project.",
  );
const client = createClient({
  projectId,
  dataset,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2025-02-19",
  useCdn: false,
});
const ids = documents.map((d) => d._id);
const existing = new Set(await client.fetch("*[_id in $ids]._id", { ids }));
const incoming = structuredClone(documents.filter((d) => !existing.has(d._id)));
for (const doc of incoming) {
  const assetPaths =
    doc._type === "siteSettings"
      ? [["logoPath", "logo"]]
      : doc._type === "homePage"
        ? [["heroImagePath", "heroImage"]]
        : doc._type === "partner"
          ? [["logoPath", "logo"]]
          : [];
  for (const [pathField, imageField] of assetPaths) {
    const local = path.join(root, "frontend-ui/public", doc[pathField]);
    const asset = await client.assets.upload("image", await readFile(local), {
      filename: path.basename(local),
    });
    doc[imageField] = {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    };
  }
}
let transaction = client.transaction();
for (const doc of incoming) transaction = transaction.createIfNotExists(doc);
if (incoming.length) await transaction.commit();
console.log(
  `Created ${incoming.length} documents with original images. Preserved ${existing.size} existing documents.`,
);

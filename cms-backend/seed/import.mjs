import { getCliClient } from "sanity/cli";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
const root = fileURLToPath(new URL("../..", import.meta.url));
const data = JSON.parse(
  await readFile(path.join(root, "frontend-ui/src/content.json"), "utf8"),
);
const client = getCliClient({ apiVersion: "2025-02-19" }).withConfig({
  useCdn: false,
});
if (client.config().projectId !== "4isekt9n")
  throw new Error(
    "This migration is restricted to the client-selected lab project 4isekt9n.",
  );
const all = [
  data.settings,
  data.home,
  ...(data.pageSettings ? [data.pageSettings] : []),
  ...data.projects,
  ...data.publications,
  ...data.achievements,
  ...data.partners,
  ...data.resources,
];
const ids = all.map((x) => x._id);
const existing = new Set(await client.fetch("*[_id in $ids]._id", { ids }));
const missing = structuredClone(all.filter((x) => !existing.has(x._id)));
console.log(
  `Project 4isekt9n: ${missing.length} new documents, ${existing.size} existing documents preserved.`,
);
if (!process.argv.includes("--apply")) {
  console.log("Preview only. Pass --apply to import.");
  process.exit(0);
}
for (const doc of missing) {
  const images =
    doc._type === "siteSettings"
      ? [["logoPath", "logo"]]
      : doc._type === "homePage"
        ? [["heroImagePath", "heroImage"]]
        : doc._type === "partner"
          ? [["logoPath", "logo"]]
          : [];
  for (const [localField, imageField] of images) {
    const file = path.join(root, "frontend-ui/public", doc[localField]);
    const asset = await client.assets.upload("image", await readFile(file), {
      filename: path.basename(file),
    });
    doc[imageField] = {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    };
  }
}
let transaction = client.transaction();
for (const doc of missing) transaction = transaction.createIfNotExists(doc);
if (missing.length) await transaction.commit();
console.log(
  `Imported ${missing.length} documents and original assets. Existing content was not replaced.`,
);

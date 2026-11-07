import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes/index.js";
const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
if (!projectId)
  throw new Error(
    "Set SANITY_STUDIO_PROJECT_ID in cms-backend/.env to the NEW lab project ID. No existing client project is used.",
  );
const singletons = ["siteSettings", "homePage"];
export default defineConfig({
  name: "default",
  title: "Multiscale Lab Content Studio",
  projectId,
  dataset: process.env.SANITY_STUDIO_DATASET || "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Multiscale Lab")
          .items([
            S.listItem()
              .title("Lab identity & contact")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
            S.listItem()
              .title("Home page & headings")
              .child(
                S.document().schemaType("homePage").documentId("homePage"),
              ),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !singletons.includes(item.getId()),
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter((t) => !singletons.includes(t.schemaType)),
  },
  document: {
    actions: (actions, context) =>
      singletons.includes(context.schemaType)
        ? actions.filter(
            (a) => !["delete", "duplicate", "unpublish"].includes(a.action),
          )
        : actions,
  },
});

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemaTypes/index.js";
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || "4isekt9n";
if (!projectId)
  throw new Error(
    "Set SANITY_STUDIO_PROJECT_ID in cms-backend/.env to the NEW lab project ID. No existing client project is used.",
  );
const singletons = ["siteSettings", "homePage", "pageSettings"];
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
              .title("Global Site Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
            S.listItem()
              .title("Home Page")
              .child(
                S.document().schemaType("homePage").documentId("homePage"),
              ),
            ...[
              ["About Page", "about", null],
              ["Team Page", "team", "teamMember"],
              ["Projects Page", "projects", "project"],
              ["Research Papers Page", "papers", "publication"],
              ["Achievements Page", "achievements", "achievement"],
              ["Clients and Partners Page", "clients", "partner"],
              ["Resources Page", "resources", "resource"],
              ["Contact Page", "contact", null],
              ["Privacy Page", "privacy", null],
            ].map(([title, key, type]) =>
              S.listItem()
                .title(title)
                .child(
                  S.list()
                    .title(title)
                    .items([
                      S.listItem()
                        .title("Page heading and introduction")
                        .child(
                          S.document()
                            .schemaType("pageContent")
                            .documentId("page-" + key),
                        ),
                      ...(key === "contact"
                        ? [
                            S.listItem()
                              .title("Contact details")
                              .child(
                                S.document()
                                  .schemaType("siteSettings")
                                  .documentId("siteSettings"),
                              ),
                          ]
                        : []),
                      ...(key === "about"
                        ? [
                            S.listItem()
                              .title("About the lab text")
                              .child(
                                S.document()
                                  .schemaType("homePage")
                                  .documentId("homePage")
                                  .views([S.view.form().title("About text")]),
                              ),
                          ]
                        : []),
                      ...(type
                        ? [
                            S.listItem()
                              .title(
                                {
                                  teamMember: "Team profiles",
                                  project: "Project entries",
                                  publication: "Papers and PDFs",
                                  achievement: "Milestones",
                                  partner: "Partner logos",
                                  resource: "Resource entries",
                                }[type],
                              )
                              .child(S.documentTypeList(type).title(title)),
                          ]
                        : []),
                    ]),
                ),
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

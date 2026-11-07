import { defineType, defineField } from "sanity";
const text = (name, title, options = {}) =>
  defineField({ name, title, type: "string", ...options });
const area = (name, title) =>
  defineField({ name, title, type: "text", rows: 4 });
const required = (Rule) => Rule.required();
const image = (name, title) =>
  defineField({ name, title, type: "image", options: { hotspot: true } });
const url = (name, title) =>
  defineField({
    name,
    title,
    type: "url",
    validation: (Rule) =>
      Rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
  });
const order = text("order", "Display order", {
  type: "number",
  initialValue: 10,
  validation: (Rule) => Rule.integer().min(0),
});
const status = text("reviewStatus", "Client content review", {
  options: {
    list: [
      { title: "Needs client review", value: "needs-review" },
      { title: "Approved by client", value: "approved" },
    ],
  },
  initialValue: "needs-review",
  description:
    "The migration preserves supplied content. Confirm claims, names and links before public launch.",
});
const common = [order, status];
const schema = (name, title, fields) =>
  defineType({
    name,
    title,
    type: "document",
    fields,
    orderings: [
      {
        title: "Display order",
        name: "displayOrder",
        by: [{ field: "order", direction: "asc" }],
      },
    ],
  });
export const schemaTypes = [
  defineType({
    name: "pageContent",
    title: "Page content",
    type: "document",
    fields: [
      text("path", "Page address", { readOnly: true }),
      text("kicker", "Small heading"),
      text("title", "Page title", { validation: required }),
      area("description", "Page introduction"),
    ],
    preview: { select: { title: "title", subtitle: "path" } },
  }),
  defineType({
    name: "teamMember",
    title: "Team member",
    type: "document",
    fields: [
      text("name", "Full name", { validation: required }),
      text("role", "Role"),
      area("biography", "Biography"),
      image("photo", "Profile photograph"),
      url("profileUrl", "Academic profile link"),
      order,
    ],
    preview: { select: { title: "name", subtitle: "role", media: "photo" } },
  }),
  defineType({
    name: "pageSettings",
    title: "Page headings and introductions",
    type: "document",
    fields: [
      defineField({
        name: "pages",
        title: "Pages",
        type: "array",
        of: [
          {
            type: "object",
            fields: [
              text("path", "Page path", { validation: required }),
              text("kicker", "Section label"),
              text("title", "Page title"),
              area("description", "Introduction"),
            ],
            preview: { select: { title: "path", subtitle: "title" } },
          },
        ],
      }),
      status,
    ],
  }),
  defineType({
    name: "siteSettings",
    title: "Site settings",
    type: "document",
    fields: [
      text("title", "Lab name", { validation: required }),
      text("university", "University", { validation: required }),
      text("department", "Department"),
      image("logo", "Original lab logo"),
      text("logoPath", "Bundled logo path", { readOnly: true }),
      text("emailPlaceholder", "Placeholder shown until email is confirmed"),
      text("nedLogoPath", "NED logo path", { readOnly: true }),
      text("email", "Contact email", { validation: (Rule) => Rule.email() }),
      text("phone", "Phone"),
      text("phoneNote", "Phone clarification"),
      text("labHead", "Lab head"),
      defineField({
        name: "address",
        title: "Postal address",
        type: "array",
        of: [{ type: "string" }],
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "socialLinks",
        title: "Social / academic links",
        type: "array",
        of: [
          {
            type: "object",
            fields: [text("label", "Label"), url("url", "URL")],
          },
        ],
      }),
      defineField({
        name: "navigation",
        title: "Navigation",
        type: "array",
        of: [
          {
            type: "object",
            fields: [
              text("label", "Label", { validation: required }),
              text("path", "Page path", {
                validation: (Rule) =>
                  Rule.required().custom(
                    (v) =>
                      [
                        "/",
                        "/about/",
                        "/team/",
                        "/privacy/",
                        "/projects/",
                        "/papers/",
                        "/achievements/",
                        "/clients/",
                        "/resources/",
                        "/contact/",
                      ].includes(v) || "Select an existing page path.",
                  ),
              }),
            ],
          },
        ],
      }),
      status,
    ],
    preview: { select: { title: "title" } },
  }),
  defineType({
    name: "homePage",
    title: "Home page & section headings",
    type: "document",
    fields: [
      text("eyebrow", "Hero eyebrow"),
      text("heroTitle", "Hero title", { validation: required }),
      area("heroDescription", "Hero introduction"),
      image("heroImage", "Hero image"),
      text("heroImagePath", "Bundled hero image path", { readOnly: true }),
      text("aboutTitle", "About heading"),
      defineField({
        name: "aboutParagraphs",
        title: "About paragraphs",
        type: "array",
        of: [{ type: "text" }],
        validation: required,
      }),
      ...[
        ["projectTitle", "Projects heading"],
        ["papersTitle", "Research papers heading"],
        ["achievementTitle", "Achievements heading"],
        ["partnersTitle", "Clients heading"],
        ["partnersSubtitle", "Clients introduction"],
        ["resourcesTitle", "Resources heading"],
        ["contactTitle", "Contact heading"],
        ["primaryActionLabel", "Projects button"],
        ["secondaryActionLabel", "About button"],
        ["contactActionLabel", "Contact button"],
      ].map(([n, t]) => text(n, t)),
      status,
    ],
    preview: { select: { title: "heroTitle" } },
  }),
  schema("project", "Project", [
    text("title", "Project title", { validation: required }),
    text("slug", "Page anchor", {
      validation: (Rule) => Rule.required().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    }),
    text("discipline", "Research discipline"),
    defineField({
      name: "methods",
      title: "Methods",
      type: "array",
      of: [{ type: "string" }],
    }),
    area("summary", "Summary"),
    area("description", "Additional project details"),
    ...common,
  ]),
  schema("publication", "Research paper", [
    text("title", "Paper title", { validation: required }),
    text("authors", "Short author line"),
    defineField({
      name: "authorList",
      title: "Complete author list in publication order",
      type: "array",
      of: [{ type: "string" }],
    }),
    text("doi", "DOI", {
      description: "Enter the DOI starting with 10. Do not invent a DOI.",
      validation: (Rule) =>
        Rule.custom(
          (v) =>
            !v ||
            /^10\.[0-9]{4,9}\//.test(v) ||
            "Enter a DOI starting with 10.",
        ),
    }),
    area("abstract", "Abstract"),
    defineField({
      name: "pdf",
      title: "Publication PDF with permission to share",
      type: "file",
      options: { accept: "application/pdf" },
    }),
    text("year", "Year", {
      type: "number",
      validation: (Rule) => Rule.required().integer().min(1900).max(2200),
    }),
    text("journal", "Journal / venue"),
    url("url", "DOI or publication URL"),
    ...common,
  ]),
  schema("achievement", "Achievement", [
    text("title", "Achievement", { validation: required }),
    area("description", "Additional details"),
    ...common,
  ]),
  schema("partner", "Client / partner", [
    text("title", "Organization name / image alt text", {
      validation: required,
    }),
    image("logo", "Logo"),
    text("logoPath", "Bundled logo path", { readOnly: true }),
    text("sourceAlt", "Original source alt text", {
      readOnly: true,
      description:
        "Some source alt text conflicts with the actual image. Confirm the organization name.",
    }),
    url("url", "Organization website"),
    ...common,
  ]),
  schema("resource", "Resource", [
    text("category", "Resource category", {
      options: {
        list: [
          "Guide",
          "Equipment",
          "Tutorial",
          "Software",
          "Dataset",
          "Resource",
        ],
      },
    }),
    text("title", "Resource title", { validation: required }),
    area("description", "Description"),
    url("url", "External resource URL"),
    defineField({ name: "file", title: "Downloadable file", type: "file" }),
    ...common,
  ]),
];

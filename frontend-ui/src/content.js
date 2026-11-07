import source from "./content.json" with { type: "json" };
export const fallbackContent = source;
export const paths = [
  "/",
  "/about/",
  "/projects/",
  "/papers/",
  "/achievements/",
  "/clients/",
  "/resources/",
  "/contact/",
  "/privacy/",
];
export const routeNames = {
  "/": "Home",
  "/about/": "About Us",
  "/projects/": "Projects",
  "/papers/": "Research Papers",
  "/achievements/": "Achievements",
  "/clients/": "Clients & Partners",
  "/resources/": "Resources",
  "/contact/": "Contact Us",
  "/privacy/": "Privacy Notice",
};
export function safeUrl(value) {
  if (
    typeof value !== "string" ||
    !value ||
    value === "#" ||
    /[\\\x00-\x1f]/.test(value)
  )
    return null;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try {
    const u = new URL(value);
    return ["https:", "http:", "mailto:", "tel:"].includes(u.protocol)
      ? value
      : null;
  } catch {
    return null;
  }
}
export function imageUrl(item, imageField, pathField) {
  return safeUrl(item?.[imageField]?.asset?.url) || safeUrl(item?.[pathField]);
}
export function normalizeContent(data) {
  if (!data?.settings) return source;
  return {
    settings: { ...source.settings, ...data.settings },
    home: { ...source.home, ...(data.home || {}) },
    pageSettings: data.pageSettings || source.pageSettings,
    ...Object.fromEntries(
      ["projects", "publications", "achievements", "partners", "resources"].map(
        (key) => [key, Array.isArray(data[key]) ? data[key] : []],
      ),
    ),
  };
}
export async function fetchContent(projectId, dataset = "production", signal) {
  if (
    !projectId ||
    !/^[a-z0-9]+$/.test(projectId) ||
    !/^[a-z0-9_-]+$/.test(dataset)
  )
    return source;
  const imageProjection = '"asset": asset->{url}';
  const query = `{
    "pageSettings": *[_type == "pageSettings" && _id == "pageSettings"][0],
    "settings": *[_type == "siteSettings" && _id == "siteSettings"][0]{...,logo{${imageProjection}}},
    "home": *[_type == "homePage" && _id == "homePage"][0]{...,heroImage{${imageProjection}}},
    "projects": *[_type == "project"] | order(order asc, _id asc),
    "publications": *[_type == "publication"] | order(order asc, _id asc){...,"pdfUrl":pdf.asset->url},
    "achievements": *[_type == "achievement"] | order(order asc, _id asc),
    "partners": *[_type == "partner"] | order(order asc, _id asc){...,logo{${imageProjection}}},
    "resources": *[_type == "resource"] | order(order asc, _id asc){...,"fileUrl":file.asset->url}
  }`;
  const url = new URL(
    `https://${projectId}.apicdn.sanity.io/v2025-02-19/data/query/${dataset}`,
  );
  url.searchParams.set("query", query);
  url.searchParams.set("perspective", "published");
  const response = await fetch(url, { signal: signal || AbortSignal.timeout(8000), credentials: "omit" });
  if (!response.ok)
    throw new Error(`Content service returned ${response.status}`);
  const payload = await response.json();
  return normalizeContent(payload.result);
}

import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import { paths, routeNames, fallbackContent, fetchContent } from "./content.js";
const content = await fetchContent(
  import.meta.env.VITE_SANITY_PROJECT_ID,
  import.meta.env.VITE_SANITY_DATASET || "production",
).catch(() => fallbackContent);
export { paths, routeNames, content };
export function render(path) {
  return renderToString(<App path={path} initialData={content} />);
}

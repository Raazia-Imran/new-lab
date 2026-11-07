import React from "react";
import { renderToString } from "react-dom/server";
import { cmsConfig } from "./lib/config.js";
import App from "./App.jsx";
import { paths, routeNames, fallbackContent, fetchContent } from "./content.js";
const content = await fetchContent(
  cmsConfig.projectId,
  cmsConfig.dataset,
).catch(() => fallbackContent);
export { paths, routeNames, content };
export function render(path) {
  return renderToString(<App path={path} initialData={content} />);
}

import React, { useEffect, useState } from "react";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import InnerPage from "./pages/InnerPage.jsx";
import Icon from "./components/Icon.jsx";
import { fallbackContent, fetchContent, paths, routeNames } from "./content.js";
import { cmsConfig } from "./lib/config.js";
import useNavigation from "./hooks/useNavigation.js";
import useReveal from "./hooks/useReveal.js";
export default function App({
  path: initialPath = "/",
  initialData = fallbackContent,
}) {
  const path = useNavigation(initialPath);
  const [data, setData] = useState(initialData);
  useReveal(path);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    fetchContent(cmsConfig.projectId, cmsConfig.dataset, controller.signal)
      .then(setData)
      .catch(() => {})
      .finally(() => clearTimeout(timeout));
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);
  useEffect(() => {
    document.title =
      path === "/"
        ? data.settings.title
        : `${routeNames[path] || "Page not found"} | ${data.settings.title}`;
  }, [path, data.settings.title]);
  return (
    <Layout settings={data.settings} path={path}>
      {path === "/" ? (
        <Home data={data} />
      ) : paths.includes(path) ? (
        <InnerPage path={path} data={data} />
      ) : (
        <section className="section not-found">
          <span className="eyebrow">404 / PAGE NOT FOUND</span>
          <h1>
            A different path
            <br />
            back to the lab.
          </h1>
          <p>This page could not be found.</p>
          <a className="button primary" href="/">
            Return home
            <Icon name="arrow" />
          </a>
        </section>
      )}
    </Layout>
  );
}

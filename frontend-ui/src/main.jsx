import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles.css";
const root = document.getElementById("root");
const path = window.location.pathname.endsWith("/")
  ? window.location.pathname
  : window.location.pathname + "/";
const serialized = document.getElementById("initial-content");
const initialData = serialized ? JSON.parse(serialized.textContent) : undefined;
const app = <App path={path} initialData={initialData} />;
if (root.children.length) hydrateRoot(root, app);
else createRoot(root).render(app);

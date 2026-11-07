import React, { useState } from "react";
import Icon from "./Icon.jsx";
import { safeUrl } from "../content.js";
export default function Resources({ data, compact = false }) {
  const [filter, setFilter] = useState("All");
  const cats = ["All", ...new Set(data.map((x) => x.category || "Resource"))];
  const found = data.filter((x) => filter === "All" || x.category === filter);
  return (
    <>
      {!compact && (
        <div className="resource-filters" aria-label="Resource categories">
          {cats.map((x) => (
            <button
              key={x}
              aria-pressed={filter === x}
              onClick={() => setFilter(x)}
            >
              {x}
            </button>
          ))}
        </div>
      )}
      <div className="resource-grid">
        {found.map((r, i) => {
          const href = safeUrl(r.fileUrl) || safeUrl(r.url);
          return (
            <article
              className={`resource-card resource-${i % 4}`}
              key={r._id}
              data-reveal
            >
              <div className="resource-card-top">
                <span className="resource-icon">
                  <Icon
                    name={["book", "layers", "grid", "file"][i % 4]}
                    size={29}
                  />
                </span>
                <span className="resource-category">
                  {r.category || "Research resource"}
                </span>
              </div>
              <h3>{r.title}</h3>
              <p>{r.description}</p>
              <div className="resource-card-bottom">
                {href ? (
                  <a
                    className="text-link"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open resource
                    <Icon name="download" />
                  </a>
                ) : (
                  <span className="coming-soon">
                    <i />
                    Coming soon
                  </span>
                )}
                <span className="resource-index">0{i + 1}</span>
              </div>
            </article>
          );
        })}
      </div>
      {!found.length && (
        <p className="empty-state">Resources will be added here.</p>
      )}
    </>
  );
}

import React, { useState, useCallback } from "react";
import Icon from "./Icon.jsx";
import Dialog from "./Dialog.jsx";
import { Lattice } from "./ScaleExplorer.jsx";
export default function Projects({ data, compact = false }) {
  const [active, setActive] = useState(0);
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);
  if (!data.length)
    return <p className="empty-state">Projects will be published here.</p>;
  const p = data[active] || data[0];
  return (
    <>
      <div className="research-browser" data-reveal>
        <div className="research-select" aria-label="Research projects">
          {data.map((x, i) => (
            <button
              key={x._id}
              className={i === active ? "active" : ""}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              <span className="project-order">0{i + 1}</span>
              <span>
                <small>{x.discipline || "Computational research"}</small>
                <strong>{x.title}</strong>
              </span>
              <Icon name="upRight" />
            </button>
          ))}
        </div>
        <article className="research-feature" key={p._id}>
          <div className="research-art">
            <Lattice scale={active % 3} />
            <span className="art-annotation">
              MULTISCALE / {String(active + 1).padStart(2, "0")}
            </span>
            <span className="art-dot" />
          </div>
          <div className="research-feature-copy">
            <span className="eyebrow">
              {p.discipline || "Research project"}
            </span>
            <h3>{p.title}</h3>
            <p>{p.summary}</p>
            <div className="tags">
              {p.methods?.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
            <button className="text-link" onClick={() => setSelected(p)}>
              Project overview
              <Icon name="upRight" />
            </button>
          </div>
        </article>
      </div>
      {!compact && (
        <div className="research-note">
          <Icon name="layers" />
          <p>
            Our work connects material behaviour, fluid dynamics and structural
            mechanics through multiscale methods.
          </p>
        </div>
      )}
      {selected && (
        <Dialog title={selected.title} onClose={close}>
          <div className="tags">
            {selected.methods?.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
          <p>{selected.summary}</p>
          {selected.description && <p>{selected.description}</p>}
          <a className="button primary" href="/contact/">
            Ask about this research
            <Icon name="upRight" />
          </a>
        </Dialog>
      )}
    </>
  );
}

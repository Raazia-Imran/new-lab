import React, { useState, useMemo, useCallback } from "react";
import Icon from "./Icon.jsx";
import Dialog from "./Dialog.jsx";
import { safeUrl } from "../content.js";
export default function Publications({ data, compact = false }) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("all");
  const [sort, setSort] = useState("newest");
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);
  const filtered = useMemo(
    () =>
      data
        .filter(
          (p) =>
            `${p.title} ${p.authors} ${p.journal} ${(p.authorList || []).join(" ")}`
              .toLowerCase()
              .includes(query.toLowerCase()) &&
            (year === "all" || String(p.year) === year),
        )
        .sort((a, b) =>
          sort === "oldest" ? a.year - b.year : b.year - a.year,
        ),
    [data, query, year, sort],
  );
  return (
    <>
      {!compact && (
        <div className="publication-tools" data-reveal>
          <label className="search-field">
            <Icon name="search" />
            <input
              type="search"
              aria-label="Search publications"
              placeholder="Search by title, author or journal"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <div className="filter-row">
            <div className="year-chips" aria-label="Filter publication year">
              <Icon name="filter" size={17} />
              <button
                aria-pressed={year === "all"}
                onClick={() => setYear("all")}
              >
                All years
              </button>
              {[...new Set(data.map((p) => p.year))]
                .sort((a, b) => b - a)
                .map((y) => (
                  <button
                    key={y}
                    aria-pressed={year === String(y)}
                    onClick={() => setYear(String(y))}
                  >
                    {y}
                  </button>
                ))}
            </div>
            <label className="sort-label">
              Sort
              <select
                aria-label="Sort publications"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </label>
          </div>
        </div>
      )}
      <div className="publication-count" aria-live="polite">
        <span>
          {filtered.length}{" "}
          {filtered.length === 1 ? "publication" : "publications"}
        </span>
        {!compact && (query || year !== "all") && (
          <button
            onClick={() => {
              setQuery("");
              setYear("all");
            }}
          >
            Clear filters <Icon name="close" size={13} />
          </button>
        )}
      </div>
      <div className="publication-grid">
        {filtered.map((p, i) => (
          <article className="publication-card" key={p._id} data-reveal>
            <div className="publication-cover" aria-hidden="true">
              <span>
                RESEARCH
                <br />
                PAPER
              </span>
              <Icon name="book" size={45} />
              <strong>{p.year}</strong>
              <i />
            </div>
            <div className="publication-body">
              <div className="publication-topline">
                <span>JOURNAL ARTICLE</span>
                <span>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <p className="journal">{p.journal}</p>
              <h3>
                <button onClick={() => setSelected(p)}>{p.title}</button>
              </h3>
              <p className="publication-authors">
                {p.authorList?.length ? p.authorList.join(", ") : p.authors}
              </p>
              {p.abstract && <p className="abstract-preview">{p.abstract}</p>}
              <div className="publication-actions">
                <button className="text-link" onClick={() => setSelected(p)}>
                  View paper
                  <Icon name="upRight" size={16} />
                </button>
                {safeUrl(p.pdfUrl || p.pdfPath) ? (
                  <a
                    className="paper-action"
                    href={safeUrl(p.pdfUrl || p.pdfPath)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="download" size={16} />
                    PDF
                  </a>
                ) : (
                  <span className="unavailable">
                    <Icon name="file" size={14} />
                    PDF pending
                  </span>
                )}
                {safeUrl(p.url) ||
                (p.doi && /^10\.[0-9]{4,9}\//.test(p.doi)) ? (
                  <a
                    className="paper-action"
                    href={
                      safeUrl(p.url) || `https://doi.org/${encodeURI(p.doi)}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    DOI
                    <Icon name="upRight" size={14} />
                  </a>
                ) : null}
              </div>
            </div>
          </article>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <Icon name="search" size={30} />
          <h3>No matching publications</h3>
          <p>Try a different title, author or year.</p>
        </div>
      )}
      {selected && (
        <Dialog title={selected.title} onClose={close}>
          <dl className="paper-facts">
            <div>
              <dt>Authors</dt>
              <dd>
                {selected.authorList?.length
                  ? selected.authorList.join(", ")
                  : selected.authors}
              </dd>
            </div>
            <div>
              <dt>Published in</dt>
              <dd>
                {selected.journal}, {selected.year}
              </dd>
            </div>
            {selected.doi && (
              <div>
                <dt>DOI</dt>
                <dd>{selected.doi}</dd>
              </div>
            )}
          </dl>
          {selected.abstract && (
            <>
              <h3>Abstract</h3>
              <p>{selected.abstract}</p>
            </>
          )}
          {safeUrl(selected.pdfUrl || selected.pdfPath) ? (
            <a
              className="button primary"
              href={safeUrl(selected.pdfUrl || selected.pdfPath)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open paper PDF
              <Icon name="download" />
            </a>
          ) : (
            <p className="content-note">
              The paper PDF and complete bibliographic details will be added
              after confirmation by the lab.
            </p>
          )}
        </Dialog>
      )}
    </>
  );
}

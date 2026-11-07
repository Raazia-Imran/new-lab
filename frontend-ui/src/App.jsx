import React, { useEffect, useState } from "react";
import {
  fallbackContent,
  fetchContent,
  paths,
  routeNames,
  safeUrl,
  imageUrl,
} from "./content.js";

function Icon({ name = "arrow", size = 20, ...props }) {
  const marks = {
    arrow: (
      <>
        <path d="M4 12h16M13 5l7 7-7 7" />
      </>
    ),
    diagonal: (
      <>
        <path d="M6 18 18 6M6 6h12v12" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 6 9 7 9-7" />
      </>
    ),
    location: (
      <>
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    file: (
      <>
        <path d="M14 2H5v20h14V7Z M14 2v6h5M8 13h8M8 17h6" />
      </>
    ),
    close: <path d="m6 6 12 12M6 18 18 6" />,
    menu: <path d="M3 6h18M3 12h18M3 18h18" />,
    search: (
      <>
        <circle cx="10" cy="10" r="6" />
        <path d="m15 15 6 6" />
      </>
    ),
    atom: (
      <>
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 10 5-10 5L2 8Zm-10 9 10 5 10-5M2 16l10 5 10-5" />
      </>
    ),
    grid: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="1" />
        <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {marks[name] || marks.arrow}
    </svg>
  );
}
function Mesh({ variant = 0 }) {
  const nodes = Array.from({ length: 36 }, (_, i) => ({
    x: 40 + (i % 6) * 42 + Math.sin(i * 1.6 + variant) * 12,
    y: 32 + Math.floor(i / 6) * 31 + Math.cos(i + variant) * 10,
  }));
  return (
    <svg
      className={`mesh mesh-${variant}`}
      viewBox="0 0 300 210"
      fill="none"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth=".65" opacity=".4">
        {nodes.map((p, i) => (
          <g key={i}>
            {i % 6 < 5 && (
              <path d={`M${p.x} ${p.y} L${nodes[i + 1].x} ${nodes[i + 1].y}`} />
            )}
            {i < 30 && (
              <path d={`M${p.x} ${p.y} L${nodes[i + 6].x} ${nodes[i + 6].y}`} />
            )}
            {i < 29 && i % 6 < 5 && (
              <path d={`M${p.x} ${p.y} L${nodes[i + 7].x} ${nodes[i + 7].y}`} />
            )}
          </g>
        ))}
      </g>
      {nodes.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={i % 7 === 0 ? 3.5 : 1.8}
          fill="currentColor"
        />
      ))}
    </svg>
  );
}
function SectionHeading({ kicker, title, href, label = "View all" }) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{kicker}</span>
        <h2>{title}</h2>
      </div>
      {href && (
        <a className="text-link" href={href}>
          {label}
          <Icon />
        </a>
      )}
    </div>
  );
}
function Empty({ label }) {
  return <p className="empty">{label}</p>;
}
function ProjectList({ data, home = false }) {
  return data.length ? (
    <div className="project-grid">
      {data.map((p, i) => (
        <article className="project-card" id={p.slug} key={p._id}>
          <a
            href={home ? `/projects/#${p.slug}` : undefined}
            className={home ? "project-link" : undefined}
          >
            <div className="project-art">
              <span className="project-number">
                {String(i + 1).padStart(2, "0")} / RESEARCH
              </span>
              <Mesh variant={i % 3} />
              {home && (
                <span className="project-arrow">
                  <Icon name="diagonal" />
                </span>
              )}
            </div>
            <div className="project-copy">
              <h3>{p.title}</h3>
              <p>{p.summary}</p>
              {!home && p.description && <p>{p.description}</p>}
            </div>
          </a>
        </article>
      ))}
    </div>
  ) : (
    <Empty label="Projects will be added here." />
  );
}
function Papers({ data, compact = false }) {
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("all");
  const found = data.filter(
    (p) =>
      `${p.title} ${p.authors} ${p.journal}`
        .toLowerCase()
        .includes(query.toLowerCase()) &&
      (year === "all" || String(p.year) === year),
  );
  return (
    <>
      {!compact && (
        <div className="filters">
          <label className="search">
            <Icon name="search" />
            <input
              type="search"
              aria-label="Search research papers"
              placeholder="Search title, author or journal"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
          <label className="year-filter">
            <span>Year</span>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              aria-label="Filter papers by year"
            >
              <option value="all">All years</option>
              {[...new Set(data.map((p) => p.year))]
                .sort((a, b) => b - a)
                .map((y) => (
                  <option key={y}>{y}</option>
                ))}
            </select>
          </label>
          <p aria-live="polite">
            {found.length} {found.length === 1 ? "paper" : "papers"}
          </p>
        </div>
      )}
      <div className="paper-list">
        {found.map((p, i) => (
          <article key={p._id} className="paper-row">
            <span className="paper-index">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="paper-meta">{p.journal}</p>
              <h3>
                {safeUrl(p.url) ? (
                  <a
                    href={safeUrl(p.url)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {p.title}
                    <Icon name="diagonal" size={16} />
                  </a>
                ) : (
                  p.title
                )}
              </h3>
              <p className="authors">{p.authors}</p>
            </div>
            <span className="paper-year">{p.year}</span>
          </article>
        ))}
      </div>
      {found.length === 0 && (
        <Empty
          label={
            data.length
              ? "No papers match your search."
              : "Research papers will be added here."
          }
        />
      )}
    </>
  );
}
function Partners({ data, compact = false }) {
  return data.length ? (
    <div className={`partners-grid ${compact ? "compact" : ""}`}>
      {data.map((p) => (
        <div className="partner" key={p._id}>
          {safeUrl(p.url) ? (
            <a href={safeUrl(p.url)} target="_blank" rel="noopener noreferrer">
              <img
                loading="lazy"
                src={imageUrl(p, "logo", "logoPath")}
                alt={p.title}
              />
            </a>
          ) : (
            <img
              loading="lazy"
              src={imageUrl(p, "logo", "logoPath")}
              alt={p.title}
            />
          )}
        </div>
      ))}
    </div>
  ) : (
    <Empty label="Clients and partners will be added here." />
  );
}
function Achievements({ data }) {
  return data.length ? (
    <ol className="achievement-list">
      {data.map((a, i) => (
        <li key={a._id}>
          <span>{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3>{a.title}</h3>
            {a.description && <p>{a.description}</p>}
          </div>
          <Icon name="diagonal" />
        </li>
      ))}
    </ol>
  ) : (
    <Empty label="Achievements will be added here." />
  );
}
function Resources({ data }) {
  return data.length ? (
    <div className="resource-list">
      {data.map((r) => {
        const href = safeUrl(r.fileUrl) || safeUrl(r.url);
        return (
          <article key={r._id} className="resource-row">
            <span className="resource-icon">
              <Icon name="file" size={27} />
            </span>
            <div>
              <h3>{r.title}</h3>
              {r.description && <p>{r.description}</p>}
            </div>
            {href ? (
              <a
                className="text-link"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open resource
                <Icon name="diagonal" />
              </a>
            ) : (
              <span className="pending">Coming soon</span>
            )}
          </article>
        );
      })}
    </div>
  ) : (
    <Empty label="Resources will be added here." />
  );
}
function Contact({ settings }) {
  return (
    <div className="contact-grid">
      <div className="contact-brand">
        <img
          src={imageUrl(settings, "logo", "logoPath")}
          alt={settings.title}
        />
        <div className="contact-brand-caption">{settings.university}</div>
      </div>
      <div className="contact-details">
        <div className="contact-line">
          <Icon name="location" />
          <div>
            <span className="eyebrow">Visit the lab</span>
            <address>
              {settings.address.map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </address>
          </div>
        </div>
        <div className="contact-line">
          <Icon name="mail" />
          <div>
            <span className="eyebrow">Email</span>
            <a href={`mailto:${settings.email}`}>{settings.email}</a>
          </div>
        </div>
        <div className="contact-extra">
          <div>
            <span className="eyebrow">Phone</span>
            <p>
              {settings.phone}
              <br />
              <small>{settings.phoneNote}</small>
            </p>
          </div>
          <div>
            <span className="eyebrow">Lab Head</span>
            <p>{settings.labHead}</p>
          </div>
        </div>
        {settings.socialLinks?.some((s) => safeUrl(s.url)) && (
          <div className="social-links">
            {settings.socialLinks
              .filter((s) => safeUrl(s.url))
              .map((s) => (
                <a
                  className="text-link"
                  key={s._key}
                  href={safeUrl(s.url)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {s.label}
                  <Icon name="diagonal" />
                </a>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
function AboutContent({ home, settings, full = false }) {
  return (
    <div className="about-layout">
      <div className="about-mark">
        <span className="eyebrow">{settings.department}</span>
        <div className="scale-visual">
          <div>
            <Icon name="atom" size={40} />
            <span>Atomic</span>
          </div>
          <i />
          <div>
            <Icon name="grid" size={40} />
            <span>Microscopic</span>
          </div>
          <i />
          <div>
            <Icon name="layers" size={40} />
            <span>Macroscopic</span>
          </div>
        </div>
        <p>Multiscale modelling & simulation</p>
      </div>
      <div className="about-copy">
        {home.aboutParagraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {!full && (
          <a className="text-link" href="/about/">
            Discover the lab
            <Icon />
          </a>
        )}
      </div>
    </div>
  );
}
function Home({ data }) {
  const {
    home,
    settings,
    projects,
    publications,
    partners,
    achievements,
    resources,
  } = data;
  return (
    <>
      <section className="hero" id="home">
        <div className="hero-copy">
          <span className="eyebrow">
            <i className="small-dot" />
            {home.eyebrow}
          </span>
          <h1>{home.heroTitle}</h1>
          <span className="title-rule" />
          <p>{home.heroDescription}</p>
          <div className="hero-actions">
            <a className="button primary" href="/projects/">
              {home.primaryActionLabel}
              <Icon />
            </a>
            <a className="button secondary" href="/about/">
              {home.secondaryActionLabel}
              <Icon name="diagonal" />
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src={imageUrl(home, "heroImage", "heroImagePath")}
            alt="Computational simulation visualization from the supplied lab website"
            fetchPriority="high"
          />
          <div className="hero-frame" />
          <span className="visual-label">
            MULTISCALE MODELLING
            <br />& SIMULATION
          </span>
          <div className="scale-tag">
            <span className="orange-dot" />
            Atomic<span>→</span>Microscopic<span>→</span>Macroscopic
          </div>
        </div>
      </section>
      <div className="intro-strip">
        <span>Multiscale simulations</span>
        <span>Material behavior</span>
        <span>Fluid dynamics</span>
        <span>Structural mechanics</span>
      </div>
      <section className="section" id="about">
        <SectionHeading kicker="01 / THE LAB" title={home.aboutTitle} />
        <AboutContent home={home} settings={settings} />
      </section>
      <section className="section wash" id="projects">
        <SectionHeading
          kicker="02 / COMPUTATIONAL RESEARCH"
          title={home.projectTitle}
          href="/projects/"
          label="Explore projects"
        />
        <ProjectList data={projects} home />
      </section>
      <section className="section" id="papers">
        <SectionHeading
          kicker="03 / RESEARCH OUTPUT"
          title={home.papersTitle}
          href="/papers/"
          label="All research papers"
        />
        <Papers data={publications} compact />
      </section>
      <section className="section achievement-section" id="achievements">
        <div className="achievement-intro">
          <span className="eyebrow">04 / MILESTONES</span>
          <h2>{home.achievementTitle}</h2>
          <a className="text-link" href="/achievements/">
            View achievements
            <Icon />
          </a>
          <Mesh variant={1} />
        </div>
        <Achievements data={achievements} />
      </section>
      <section className="section" id="clients">
        <SectionHeading
          kicker="05 / COLLABORATION"
          title={home.partnersTitle}
          href="/clients/"
          label="Our clients"
        />
        <p className="section-description">{home.partnersSubtitle}</p>
        <Partners data={partners} compact />
      </section>
      <section className="section wash" id="resources">
        <SectionHeading
          kicker="06 / KNOWLEDGE & TOOLS"
          title={home.resourcesTitle}
          href="/resources/"
          label="All resources"
        />
        <Resources data={resources} />
      </section>
      <section className="section" id="contact">
        <SectionHeading kicker="07 / CONNECT" title={home.contactTitle} />
        <Contact settings={settings} />
      </section>
    </>
  );
}
function InnerPage({ path, data }) {
  const { home, settings } = data;
  const titles = {
    "/about/": home.aboutTitle,
    "/projects/": home.projectTitle,
    "/papers/": home.papersTitle,
    "/achievements/": home.achievementTitle,
    "/clients/": home.partnersTitle,
    "/resources/": home.resourcesTitle,
    "/contact/": home.contactTitle,
  };
  const title = titles[path];
  return (
    <>
      <section className="page-hero">
        <div className="breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>{title}</span>
        </div>
        <span className="eyebrow">{settings.university}</span>
        <h1>{title}</h1>
        <div className="page-orbit" aria-hidden="true">
          <Mesh variant={1} />
        </div>
      </section>
      <section className="section inner-section">
        {path === "/about/" && (
          <AboutContent home={home} settings={settings} full />
        )}
        {path === "/projects/" && <ProjectList data={data.projects} />}
        {path === "/papers/" && <Papers data={data.publications} />}
        {path === "/achievements/" && <Achievements data={data.achievements} />}
        {path === "/clients/" && (
          <>
            <p className="section-description">{home.partnersSubtitle}</p>
            <Partners data={data.partners} />
          </>
        )}
        {path === "/resources/" && <Resources data={data.resources} />}
        {path === "/contact/" && <Contact settings={settings} />}
      </section>
      {path !== "/contact/" && (
        <div className="contact-callout">
          <div>
            <span className="eyebrow">{settings.title}</span>
            <h2>{home.contactTitle}</h2>
          </div>
          <a className="button primary" href="/contact/">
            {home.contactActionLabel}
            <Icon />
          </a>
        </div>
      )}
    </>
  );
}
export default function App({ path = "/", initialData = fallbackContent }) {
  const [data, setData] = useState(initialData);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const c = new AbortController();
    fetchContent(
      import.meta.env.VITE_SANITY_PROJECT_ID,
      import.meta.env.VITE_SANITY_DATASET || "production",
      c.signal,
    )
      .then(setData)
      .catch((e) => {
        if (e.name !== "AbortError")
          console.warn(
            "The content service is unavailable. Showing the supplied website content.",
          );
      });
    return () => c.abort();
  }, []);
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);
  const { settings } = data;
  const known = paths.includes(path);
  const title =
    path === "/"
      ? settings.title
      : `${routeNames[path] || "Page not found"} | ${settings.title}`;
  useEffect(() => {
    document.title = title;
  }, [title]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="university-bar">
        <span>{settings.university}</span>
        <span>{settings.department}</span>
      </div>
      <header className="header">
        <a className="brand" href="/" aria-label={`${settings.title} home`}>
          <img
            src={imageUrl(settings, "logo", "logoPath")}
            alt={settings.title}
            width="246"
            height="116"
          />
        </a>
        <button
          className="menu-toggle"
          id="menu-toggle"
          aria-controls="main-nav"
          aria-expanded={open}
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
        <nav
          id="main-nav"
          className={open ? "nav open" : "nav"}
          aria-label="Main navigation"
        >
          {settings.navigation.map((n) => (
            <a
              key={n._key}
              href={safeUrl(n.path) || "/"}
              aria-current={path === n.path ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </a>
          ))}
          <a
            className="nav-contact"
            href="/contact/"
            aria-current={path === "/contact/" ? "page" : undefined}
          >
            Contact
            <Icon name="diagonal" size={16} />
          </a>
        </nav>
      </header>
      <main id="main" tabIndex="-1">
        {!known ? (
          <section className="section not-found">
            <span className="eyebrow">404 / PAGE NOT FOUND</span>
            <h1>Let’s get you back.</h1>
            <p>The page you’re looking for could not be found.</p>
            <a className="button primary" href="/">
              Return home
              <Icon />
            </a>
          </section>
        ) : path === "/" ? (
          <Home data={data} />
        ) : (
          <InnerPage path={path} data={data} />
        )}
      </main>
      <footer>
        <div className="footer-main">
          <div>
            <span className="footer-title">{settings.title}</span>
            <p>{settings.university}</p>
          </div>
          <a href={`mailto:${settings.email}`}>
            {settings.email}
            <Icon name="diagonal" size={18} />
          </a>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {settings.title}. All rights reserved.
          </span>
          <a href="#main">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}

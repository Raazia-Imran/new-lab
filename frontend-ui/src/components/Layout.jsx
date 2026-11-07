import React, { useEffect, useState } from "react";
import Icon from "./Icon.jsx";
import { imageUrl, safeUrl } from "../content.js";
export default function Layout({ settings, path, children }) {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const scroll = () => setCompact(window.scrollY > 65);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    return () => window.removeEventListener("scroll", scroll);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    if (!open) return;
    const f = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", f);
    return () => document.removeEventListener("keydown", f);
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="affiliation">
        <span>NED UNIVERSITY OF ENGINEERING & TECHNOLOGY</span>
        <span>
          Department of Mechanical Engineering <i />
        </span>
      </div>
      <div className="nav-space">
        <header className={`header ${compact ? "compressed" : ""}`}>
          <a className="brand" href="/" aria-label={`${settings.title} home`}>
            <img
              src={imageUrl(settings, "logo", "logoPath")}
              width="210"
              height="90"
              alt={settings.title}
            />
          </a>
          <button
            id="menu-toggle"
            className="menu-toggle icon-button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="main-nav"
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
              >
                {n.label}
              </a>
            ))}
            <a className="nav-cta" href="/contact/">
              Let’s connect
              <Icon name="upRight" size={16} />
            </a>
          </nav>
        </header>
      </div>
      <main id="main" tabIndex="-1" key={path}>
        {children}
      </main>
      <footer className="footer">
        <div className="footer-top">
          <div>
            <span className="eyebrow">LET’S CONNECT THE SCALES</span>
            <h2>
              Have a research
              <br />
              question in mind?
            </h2>
            <a className="button orange" href="/contact/">
              Connect with the lab
              <Icon name="upRight" />
            </a>
          </div>
          <div className="footer-marks">
            <img
              className="footer-lab-logo"
              src={imageUrl(settings, "logo", "logoPath")}
              alt={settings.title}
            />
            <div className="university-lockup">
              <img
                src={settings.nedLogoPath || "/brand/ned-logo.png"}
                alt="NED University emblem"
                width="64"
                height="64"
              />
              <div>
                NED University of
                <br />
                Engineering & Technology<small>Karachi, Pakistan</small>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-grid">
          <div>
            <h3>Visit the lab</h3>
            <p>
              {settings.department}
              <br />
              NED University of Engineering & Technology
              <br />
              University Road, Karachi, Pakistan
            </p>
          </div>
          <div>
            <h3>Explore</h3>
            <a href="/about/">About the lab</a>
            <a href="/projects/">Research projects</a>
            <a href="/papers/">Publications</a>
          </div>
          <div>
            <h3>Discover</h3>
            <a href="/achievements/">Achievements</a>
            <a href="/clients/">Clients & partners</a>
            <a href="/resources/">Research resources</a>
          </div>
          <div>
            <h3>Get in touch</h3>
            {settings.email ? (
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
            ) : (
              <p>Official email to be confirmed</p>
            )}
            <a href="/contact/">
              Contact information <Icon name="upRight" size={14} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Multiscale Modelling & Simulation Lab
          </span>
          <span>
            <a href="/privacy/">Privacy</a>
            <a href="#main">Back to top ↑</a>
          </span>
        </div>
      </footer>
    </>
  );
}

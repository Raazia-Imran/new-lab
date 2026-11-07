import React from "react";
import Projects from "../components/Projects.jsx";
import Publications from "../components/Publications.jsx";
import Resources from "../components/Resources.jsx";
import Achievements from "../components/Achievements.jsx";
import Partners from "../components/Partners.jsx";
import ScaleExplorer from "../components/ScaleExplorer.jsx";
import Contact from "./Contact.jsx";
import Icon from "../components/Icon.jsx";
const meta = {
  "/about/": [
    "INSIDE THE LAB",
    "A different scale.\nA deeper understanding.",
    "Connecting engineering questions with multiscale computational methods.",
  ],
  "/projects/": [
    "RESEARCH EXPLORER",
    "Questions worth\nlooking closer at.",
    "Explore our work in fluid dynamics, material behaviour and microstructure evolution.",
  ],
  "/papers/": [
    "RESEARCH LIBRARY",
    "Our work,\nin the literature.",
    "Explore publications, authors and the ideas behind our research.",
  ],
  "/achievements/": [
    "LAB MILESTONES",
    "Research takes shape.\nProgress follows.",
    "Explore the achievement information supplied for the lab.",
  ],
  "/clients/": [
    "CLIENTS & PARTNERS",
    "Better questions.\nShared perspectives.",
    "Connections between research, academia and industry.",
  ],
  "/resources/": [
    "THE RESEARCH TOOLKIT",
    "Start exploring.\nKeep discovering.",
    "Guides, learning materials, equipment information and open-source tools.",
  ],
  "/contact/": [
    "LET’S CONNECT",
    "A conversation can\nopen a new direction.",
    "Research questions, ideas for collaboration and enquiries are welcome.",
  ],
  "/privacy/": [
    "PRIVACY NOTICE",
    "Your information.\nHandled with care.",
    "How this website handles contact enquiries and essential services.",
  ],
};
export default function InnerPage({ path, data }) {
  const page = data.pageSettings?.pages?.find((p) => p.path === path);
  const [label, title, description] = page
    ? [page.kicker, page.title, page.description]
    : meta[path] || [];
  return (
    <>
      <section className="page-hero">
        <div className="breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <span>{label}</span>
        </div>
        <div>
          <span className="eyebrow">
            <i />
            {label}
          </span>
          <h1>
            {title?.split("\n").map((x, i) => (
              <React.Fragment key={i}>
                {i > 0 && <br />}
                {i === 1 ? <em>{x}</em> : x}
              </React.Fragment>
            ))}
          </h1>
          <p>{description}</p>
        </div>
        <div className="page-orb" aria-hidden="true">
          <Icon name="atom" size={230} />
        </div>
      </section>
      {path === "/about/" ? (
        <>
          <section className="section about-body">
            <span className="eyebrow">
              MULTISCALE MODELLING & SIMULATION LAB
            </span>
            <h2>
              Research across
              <br />
              the boundaries of scale.
            </h2>
            <div>
              {data.home.aboutParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
          <ScaleExplorer />
        </>
      ) : (
        <section className="section inner-content">
          {path === "/projects/" && <Projects data={data.projects} />}
          {path === "/papers/" && <Publications data={data.publications} />}
          {path === "/achievements/" && (
            <>
              <p className="content-note">
                These supplied milestones are awaiting confirmation and
                supporting details from the lab.
              </p>
              <Achievements data={data.achievements} />
            </>
          )}
          {path === "/clients/" && (
            <>
              <p className="content-note">{data.home.partnersSubtitle}</p>
              <Partners data={data.partners} />
            </>
          )}
          {path === "/resources/" && <Resources data={data.resources} />}
          {path === "/contact/" && <Contact settings={data.settings} />}
          {path === "/privacy/" && (
            <div className="prose">
              <h2>Contact enquiries</h2>
              <p>
                When the contact form is enabled, it asks for your name, email
                address and message so the lab can respond. Please do not
                include sensitive personal information.
              </p>
              <p>
                Submitted form data is sent through Web3Forms to the lab’s
                configured contact address. Its processing is subject to{" "}
                <a
                  href="https://web3forms.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Web3Forms’ privacy policy
                </a>
                . If the form is unavailable, no enquiry is submitted.
              </p>
              <h2>Website services</h2>
              <p>
                The website uses Vercel for hosting and Sanity for public
                content delivery. These providers may process technical request
                information such as IP addresses and browser details to operate
                and protect their services.
              </p>
              <h2>Cookies and analytics</h2>
              <p>
                This website does not add advertising cookies or optional
                analytics. Browser preferences and security features provided by
                the hosting service may apply.
              </p>
              <h2>Contact and retention</h2>
              <p>
                The lab’s official contact address and enquiry retention
                arrangements will be published after confirmation. This notice
                should be reviewed by the lab before the contact form is
                activated.
              </p>
            </div>
          )}
        </section>
      )}
    </>
  );
}

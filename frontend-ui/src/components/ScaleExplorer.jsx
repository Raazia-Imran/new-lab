import React, { useEffect, useRef, useState } from "react";
import Icon from "./Icon.jsx";
const scales = [
  {
    name: "Atomic",
    symbol: "10⁻⁹",
    unit: "nanometres",
    title: "Start with the smallest building blocks.",
    text: "Explore how atoms interact and how their collective behaviour influences the properties of a material.",
    icon: "atom",
  },
  {
    name: "Microscopic",
    symbol: "10⁻⁶",
    unit: "micrometres",
    title: "See the patterns taking shape.",
    text: "Move through grains, fibres and microstructures to understand how local changes influence material behaviour.",
    icon: "grid",
  },
  {
    name: "Macroscopic",
    symbol: "10⁰",
    unit: "metres",
    title: "Connect the detail to the whole.",
    text: "Bring insights across scales into the study of fluid flow, structural mechanics and engineering systems.",
    icon: "layers",
  },
];
function Lattice({ scale = 0 }) {
  const nodes = Array.from({ length: 64 }, (_, i) => ({
    x: 65 + (i % 8) * 39 + Math.sin(i * 0.8 + scale) * 11,
    y: 40 + Math.floor(i / 8) * 32 + Math.cos(i * 0.9 + scale) * 10,
  }));
  return (
    <svg
      className={`lattice lattice-${scale}`}
      viewBox="0 0 430 340"
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth=".7">
        {nodes.map((p, i) => (
          <g key={i}>
            {i % 8 < 7 && (
              <path
                className="draw-line"
                d={`M${p.x} ${p.y}L${nodes[i + 1].x} ${nodes[i + 1].y}`}
              />
            )}
            {i < 56 && (
              <path d={`M${p.x} ${p.y}L${nodes[i + 8].x} ${nodes[i + 8].y}`} />
            )}
            {i < 55 && i % 8 < 7 && (
              <path d={`M${p.x} ${p.y}L${nodes[i + 9].x} ${nodes[i + 9].y}`} />
            )}
          </g>
        ))}
      </g>
      {nodes.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={i % 9 === 0 ? 4 : 2}
          fill={i % 9 === 0 ? "#ff8c00" : "currentColor"}
        />
      ))}
    </svg>
  );
}
export { Lattice };
export default function ScaleExplorer() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const sections = ref.current.querySelectorAll("[data-scale]");
    const observer = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.scale));
        }),
      { rootMargin: "-25% 0px -40% 0px" },
    );
    sections.forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);
  return (
    <section className="scale-section section" ref={ref}>
      <div className="scale-sticky">
        <span className="eyebrow">
          <i /> ONE QUESTION. DIFFERENT SCALES.
        </span>
        <h2>
          Zoom in.
          <br />
          Think <em>beyond.</em>
        </h2>
        <div className="scale-display">
          <span className="scale-power">
            {scales[active].symbol}
            <small>{scales[active].unit}</small>
          </span>
          <Lattice scale={active} />
          <span className="model-caption">Conceptual scale illustration</span>
        </div>
        <div className="scale-tabs" aria-label="Explore scales">
          {scales.map((s, i) => (
            <button
              key={s.name}
              aria-pressed={i === active}
              onClick={() => {
                setActive(i);
                document.getElementById(`scale-${i}`).scrollIntoView({
                  behavior: matchMedia("(prefers-reduced-motion:reduce)")
                    .matches
                    ? "instant"
                    : "smooth",
                  block: "center",
                });
              }}
            >
              {s.name}
              <span>0{i + 1}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="scale-chapters">
        {scales.map((s, i) => (
          <article
            key={s.name}
            id={`scale-${i}`}
            data-scale={i}
            className={active === i ? "scale-chapter active" : "scale-chapter"}
          >
            <div className="chapter-icon">
              <Icon name={s.icon} size={33} />
            </div>
            <span className="eyebrow">
              0{i + 1} / {s.name} scale
            </span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <span className="chapter-rule" />
          </article>
        ))}
      </div>
    </section>
  );
}

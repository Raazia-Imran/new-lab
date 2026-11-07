import React from "react";
import Icon from "./Icon.jsx";
export default function SectionHeading({
  label,
  title,
  description,
  href,
  linkLabel = "Explore more",
}) {
  return (
    <div className="section-heading" data-reveal>
      <div>
        <span className="eyebrow">
          <i />
          {label}
        </span>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {href && (
        <a className="text-link" href={href}>
          {linkLabel}
          <Icon name="upRight" />
        </a>
      )}
    </div>
  );
}

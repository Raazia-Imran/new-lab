import React from "react";
import Icon from "./Icon.jsx";
export default function Achievements({ data }) {
  return (
    <div className="milestones">
      {data.map((a, i) => (
        <details className="milestone" key={a._id} data-reveal open={i === 0}>
          <summary>
            <span className="milestone-visual">
              <Icon
                name={["atom", "book", "layers", "grid"][i % 4]}
                size={32}
              />
            </span>
            <span className="milestone-copy">
              <small>RESEARCH MILESTONE / 0{i + 1}</small>
              <strong>{a.title}</strong>
            </span>
            <span className="milestone-toggle">
              <Icon name="plus" />
            </span>
          </summary>
          <div className="milestone-detail">
            <p>
              {a.description ||
                "This milestone is part of the achievement information supplied for the lab website. Supporting details will be added following the lab’s review."}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}

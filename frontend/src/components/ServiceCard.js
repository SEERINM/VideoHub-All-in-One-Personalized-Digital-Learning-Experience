import React from "react";

export default function ServiceCard({title, desc, hoverText, onClick}) {
  return (
    <div className="card" onClick={onClick}>
      <h3>{title}</h3>
      <p>{desc}</p>
      <div className="tooltip">{hoverText}</div>
    </div>
  );
}


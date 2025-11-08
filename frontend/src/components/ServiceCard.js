/*import React from "react";

export default function ServiceCard({title, desc, features, colorFrom, colorTo, Icon, onClick}) {
  return (
    <div
      className="service-scroll-card"
      onClick={onClick}
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto 32px auto",
        borderRadius: 28,
        boxShadow: "0 8px 32px #0001",
        overflow: "hidden",
        background: "#fff",
        transition: "box-shadow 0.23s cubic-bezier(.25,.8,.25,1)",
      }}
    >
      <div
        style={{
          background: `linear-gradient(90deg, ${colorFrom} 0%, ${colorTo} 100%)`,
          padding: "36px 28px",
          display: "flex",
          alignItems: "center",
          gap: 32
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255,255,255,0.18)",
            width: 74,
            height: 74,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {Icon && <Icon style={{ width: 42, height: 42, color: "#fff" }} />}
        </div>
        <h3 style={{
          fontWeight: 800,
          fontSize: "2.4rem",
          color: "#fff",
          margin: 0,
        }}>{title}</h3>
      </div>
   
      <div style={{padding: "34px 28px"}}>
        <p style={{fontSize: "1.18rem", color: "#606f7b", marginBottom: 18}}>
          {desc}
        </p>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {features.map((f, idx) => (
            <li key={idx} style={{
              display: "flex",
              alignItems: "center",
              fontSize: "1.11rem",
              marginBottom: 7,
              color: colorFrom,
              fontWeight: 600
            }}>
              <span style={{ fontSize: "1.1rem", marginRight: 10 }}>✓</span>
              <span style={{ color: "#374151", fontWeight: 500 }}>{f}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
*/

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

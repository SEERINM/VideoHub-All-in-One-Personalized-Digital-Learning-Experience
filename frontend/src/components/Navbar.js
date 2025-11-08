import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";

// SVG Play logo (reuse as in Home.js)
function LogoIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="12" fill="url(#gradient)" />
      <polygon points="10,8 16,12 10,16" fill="#fff" />
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="24" y2="24">
          <stop offset="0%" stopColor="#764ba2"/>
          <stop offset="100%" stopColor="#667eea"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Navbar() {
  const nav = useNavigate();
  return (
    <nav style={{
      position: "fixed", 
      top: 0, 
      left: 0, 
      width: "100%", 
      background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(249,250,255,0.98) 100%)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 4px 30px rgba(118, 75, 162, 0.08), 0 2px 10px rgba(102, 126, 234, 0.05)",
      borderBottom: "1px solid rgba(118, 75, 162, 0.1)",
      zIndex: 99, 
      display: "flex", 
      alignItems: "center",
      justifyContent: "space-between", 
      padding: "0 3vw", 
      height: "72px",
      transition: "all 0.3s ease"
    }}>
      {/* Logo and text */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "14px",
        cursor: "pointer",
        transition: "transform 0.3s ease"
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      onClick={() => nav("/home")}
      >
        <div style={{
          padding: "6px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, rgba(118, 75, 162, 0.1) 0%, rgba(102, 126, 234, 0.1) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 15px rgba(118, 75, 162, 0.2)"
        }}>
          <LogoIcon />
        </div>
        <span style={{
          fontWeight: 800, 
          fontSize: "1.85rem",
          background: "linear-gradient(135deg, #764ba2 0%, #667eea 50%, #764ba2 100%)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text", 
          color: "transparent",
          letterSpacing: "-0.5px"
        }}>VideoHub</span>
      </div>

      {/* Links */}
      <div style={{ display: "flex", gap: "0.5vw", alignItems: "center" }}>
        <NavLink to="/home" text="Home" nav={nav} />
        <NavLink to="/services" text="Our Services" nav={nav} />
        <NavLink 
          text="About Us" 
          onClick={() => {
            const el = document.querySelector("#about-section") || document.getElementById("about-section");
            if(el) el.scrollIntoView({behavior:"smooth",block:"center"});
            else nav("/home#about");
          }}
        />
        <NavLink 
          text="Contact Us" 
          onClick={() => {
            const el = document.querySelector("#contact-section") || document.getElementById("contact-section");
            if(el) el.scrollIntoView({behavior:"smooth",block:"center"});
            else nav("/home#contact");
          }}
        />
      </div>

      <div style={{
        display: "flex",
        alignItems: "center"
      }}>
        <ProfileMenu />
      </div>
    </nav>
  );
}

// Reusable NavLink component with hover effects
function NavLink({ to, text, onClick, nav }) {
  const [isHovered, setIsHovered] = React.useState(false);

  const linkStyle = {
    fontWeight: 600,
    fontSize: "1.05rem",
    color: isHovered ? "#667eea" : "#764ba2",
    padding: "10px 18px",
    textDecoration: "none",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    position: "relative",
    borderRadius: "10px",
    background: isHovered 
      ? "linear-gradient(135deg, rgba(118, 75, 162, 0.08) 0%, rgba(102, 126, 234, 0.08) 100%)" 
      : "transparent",
    transform: isHovered ? "translateY(-2px)" : "translateY(0)",
    boxShadow: isHovered 
      ? "0 4px 12px rgba(118, 75, 162, 0.15)" 
      : "none"
  };

  const underlineStyle = {
    position: "absolute",
    bottom: "6px",
    left: "50%",
    transform: isHovered ? "translateX(-50%) scaleX(1)" : "translateX(-50%) scaleX(0)",
    width: "70%",
    height: "2px",
    background: "linear-gradient(90deg, #764ba2, #667eea)",
    borderRadius: "2px",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
  };

  if (to) {
    return (
      <Link 
        to={to} 
        style={linkStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {text}
        <div style={underlineStyle}></div>
      </Link>
    );
  }

  return (
    <span
      style={linkStyle}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
      <div style={underlineStyle}></div>
    </span>
  );
}

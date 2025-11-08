import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("mvs_user");
    if (raw) setUser(JSON.parse(raw));
  }, []);

  function logout() {
    const token = localStorage.getItem("mvs_token");
    if (token) {
      fetch("http://localhost:5000/api/logout", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      }).catch(() => { });
    }
    localStorage.removeItem("mvs_token");
    localStorage.removeItem("mvs_user");
    nav("/login");
  }

  return (
    <div style={{ position: "relative", marginLeft: 16 }}>
      <button
        className="profile-btn"
        style={{
          background: "linear-gradient(135deg, #667eea10 0%, #f093fb10 100%)",
          border: "none",
          borderRadius: "50%",
          width: 40,
          height: 40,
          cursor: "pointer",
          boxShadow: open
            ? "0 0 0 4px #667eea22"
            : "0 2px 8px #764ba233"
        }}
        onClick={() => setOpen(s => !s)}
        aria-label="Profile"
      >
        <span
          style={{
            width: 32, height: 32, borderRadius: "50%",
            background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#fff",
            fontWeight: 700,
            fontSize: "1.43rem"
          }}
        >
          {user?.username?.charAt(0)?.toUpperCase() || "👤"}
        </span>
      </button>

      {open && (
        <div
          className="profile-menu"
          style={{
            position: "absolute",
            right: 0,
            top: 48,
            background: "#fff",
            boxShadow: "0 4px 24px #764ba244",
            borderRadius: 13,
            padding: "22px 18px 16px 18px",
            minWidth: 195,
            zIndex: 111,
            animation: "fadeInProfile 0.2s"
          }}
          onMouseLeave={() => setOpen(false)}
        >
          {user ? (
            <>
              <div style={{ fontWeight: 700, color: "#764ba2", fontSize: "1.08em" }}>{user.username}</div>
              <div style={{ fontSize: "0.97em", color: "#555" }}>{user.email}</div>
              <div style={{ height: 14 }} />
              <button
                onClick={logout}
                style={{
                  padding: "8px 18px",
                  borderRadius: 7,
                  border: "none",
                  fontWeight: 600,
                  color: "#fff",
                  background: "linear-gradient(90deg,#764ba2,#667eea)",
                  cursor: "pointer",
                  boxShadow: "0 1.5px 9px #764ba233"
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <div style={{ fontWeight: 700, color: "#667eea", fontSize: "1.08em" }}>Guest</div>
              <div style={{ fontSize: "0.97em", color: "#555" }}>Not logged in</div>
              <div style={{ height: 14 }} />
              <button
                onClick={() => nav("/login")}
                style={{
                  padding: "8px 18px",
                  borderRadius: 7,
                  border: "none",
                  fontWeight: 600,
                  color: "#fff",
                  background: "linear-gradient(90deg,#764ba2,#667eea)",
                  cursor: "pointer",
                  boxShadow: "0 1.5px 9px #764ba233"
                }}
              >
                Login
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}


//this is claude's design 2
import React, { useRef } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  // For optional manual scrolling (not strictly required if links are anchor tags)
  const aboutRef = useRef();
  const teamRef = useRef();
  const contactRef = useRef();

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div style={{
        width: "100vw", 
        minHeight: "60vh", 
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
        color: "#fff",
        textAlign: "center", 
        paddingTop: "100px", 
        paddingBottom: "60px",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Decorative background elements */}
        <div style={{
          position: "absolute",
          top: "-50%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
          borderRadius: "50%"
        }}></div>
        <div style={{
          position: "absolute",
          bottom: "-30%",
          left: "-5%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
          borderRadius: "50%"
        }}></div>
        
        <h1 style={{ 
          fontSize: "3.5rem", 
          fontWeight: 800, 
          marginBottom: "1.2rem",
          letterSpacing: "-0.02em",
          textShadow: "0 4px 20px rgba(0,0,0,0.15)",
          position: "relative",
          zIndex: 1
        }}>
          Transform Your Videos with AI
        </h1>
        <p style={{ 
          fontSize: "1.4rem", 
          opacity: 0.95, 
          maxWidth: "700px", 
          margin: 0,
          lineHeight: "1.6",
          fontWeight: 400,
          textShadow: "0 2px 10px rgba(0,0,0,0.1)",
          position: "relative",
          zIndex: 1
        }}>
          Analyze, Edit, and Manage Your Video Content with Cutting-Edge Intelligence
        </p>
      </div>

      {/* Main Page Content */}
      <div style={{
        paddingTop: "60px",
        paddingBottom: "60px",
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        gap: "48px", 
        background: "linear-gradient(to bottom, #f8f7fb 0%, #fafbfc 100%)",
        minHeight: "70vh"
      }}>
        {/* About Us Section */}
        <section
          ref={aboutRef}
          id="about-section"
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            boxShadow: "0 10px 40px rgba(118, 75, 162, 0.12), 0 2px 8px rgba(0,0,0,0.06)",
            padding: "48px 40px",
            width: "85vw",
            maxWidth: "720px",
            border: "1px solid rgba(118, 75, 162, 0.08)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 16px 56px rgba(118, 75, 162, 0.18), 0 4px 12px rgba(0,0,0,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 40px rgba(118, 75, 162, 0.12), 0 2px 8px rgba(0,0,0,0.06)";
          }}
        >
          <h2 style={{
            fontSize: "2.4rem", 
            fontWeight: 800, 
            marginBottom: "24px", 
            color: "#1b1c22",
            background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            About Us
          </h2>
          <p style={{
            fontSize: "1.15rem", 
            color: "#3a3a52", 
            lineHeight: "1.8",
            fontWeight: 400, 
            marginBottom: 0
          }}>
            VideoHub is your comprehensive video solution platform powered by advanced AI technology.
            <br /><br />
            We provide cutting-edge tools for downloading, editing, analyzing, and managing your video content.
            <br /><br />
            Our mission is to make video processing accessible and efficient for everyone, from content creators to businesses.
          </p>
        </section>

        {/* Meet Our Team Section */}
        <section
          ref={teamRef}
          id="team-section"
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            boxShadow: "0 10px 40px rgba(118, 75, 162, 0.12), 0 2px 8px rgba(0,0,0,0.06)",
            padding: "48px 40px",
            width: "85vw",
            maxWidth: "720px",
            border: "1px solid rgba(118, 75, 162, 0.08)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 16px 56px rgba(118, 75, 162, 0.18), 0 4px 12px rgba(0,0,0,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 40px rgba(118, 75, 162, 0.12), 0 2px 8px rgba(0,0,0,0.06)";
          }}
        >
          <h2 style={{
            fontSize: "2.4rem", 
            fontWeight: 800, 
            marginBottom: "32px", 
            color: "#1b1c22",
            background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Meet Our Team
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <div style={{
              borderLeft: "4px solid #a142d3", 
              paddingLeft: "24px",
              background: "linear-gradient(to right, rgba(161, 66, 211, 0.04), transparent)",
              padding: "20px 24px",
              borderRadius: "0 12px 12px 0",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(to right, rgba(161, 66, 211, 0.08), transparent)";
              e.currentTarget.style.borderLeftWidth = "5px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(to right, rgba(161, 66, 211, 0.04), transparent)";
              e.currentTarget.style.borderLeftWidth = "4px";
            }}
            >
              <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#1b1c22", marginBottom: "4px" }}>Seerin M</div>
              <div style={{ color: "#a142d3", fontWeight: 600, marginBottom: "8px", fontSize: "1.05rem" }}>Founder</div>
              <div style={{ color: "#555", fontSize: "1rem", marginBottom: "4px" }}>seerin2005cse@gmail.com</div>
              <div style={{ color: "#777", fontSize: "0.95rem" }}>India</div>
            </div>
            <div style={{
              borderLeft: "4px solid #3eaef5", 
              paddingLeft: "24px",
              background: "linear-gradient(to right, rgba(62, 174, 245, 0.04), transparent)",
              padding: "20px 24px",
              borderRadius: "0 12px 12px 0",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(to right, rgba(62, 174, 245, 0.08), transparent)";
              e.currentTarget.style.borderLeftWidth = "5px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(to right, rgba(62, 174, 245, 0.04), transparent)";
              e.currentTarget.style.borderLeftWidth = "4px";
            }}
            >
              <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#1b1c22", marginBottom: "4px" }}>Rosy K</div>
              <div style={{ color: "#3eaef5", fontWeight: 600, marginBottom: "8px", fontSize: "1.05rem" }}>Co-Founder</div>
              <div style={{ color: "#555", fontSize: "1rem", marginBottom: "4px" }}>k.rosykumar@gmail.com</div>
              <div style={{ color: "#777", fontSize: "0.95rem" }}>India</div>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section
          ref={contactRef}
          id="contact-section"
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            boxShadow: "0 10px 40px rgba(102, 126, 234, 0.12), 0 2px 8px rgba(0,0,0,0.06)",
            padding: "48px 40px",
            width: "85vw",
            maxWidth: "720px",
            border: "1px solid rgba(102, 126, 234, 0.08)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 16px 56px rgba(102, 126, 234, 0.18), 0 4px 12px rgba(0,0,0,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 40px rgba(102, 126, 234, 0.12), 0 2px 8px rgba(0,0,0,0.06)";
          }}
        >
          <h2 style={{
            fontSize: "2.4rem", 
            fontWeight: 800, 
            marginBottom: "36px", 
            color: "#1b1c22",
            background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Contact Us
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {/* Phone */}
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "20px",
              padding: "16px",
              borderRadius: "16px",
              transition: "background 0.3s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#f8f7fb"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <span style={{
                background: "#e9d5ff", 
                padding: "16px", 
                borderRadius: "16px",
                fontSize: "1.5em",
                color: "#9333ea",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "56px",
                minHeight: "56px",
                boxShadow: "0 4px 12px rgba(147, 51, 234, 0.2)"
              }}>📞</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: "1.15em", color: "#1b1c22", marginBottom: "4px" }}>Phone</div>
                <div style={{ fontSize: "1.05em", color: "#555" }}>+1234567890</div>
              </div>
            </div>
            
            {/* Email */}
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "20px",
              padding: "16px",
              borderRadius: "16px",
              transition: "background 0.3s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#f8f7fb"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <span style={{
                background: "#dbeafe", 
                padding: "16px", 
                borderRadius: "16px",
                fontSize: "1.5em",
                color: "#2563eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "56px",
                minHeight: "56px",
                boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)"
              }}>📧</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: "1.15em", color: "#1b1c22", marginBottom: "4px" }}>Email</div>
                <div style={{ fontSize: "1.05em", color: "#555" }}>videohub@gmail.com</div>
              </div>
            </div>
            
            {/* Address */}
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "20px",
              padding: "16px",
              borderRadius: "16px",
              transition: "background 0.3s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#f8f7fb"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <span style={{
                background: "#d1fae5", 
                padding: "16px", 
                borderRadius: "16px",
                fontSize: "1.5em",
                color: "#059669",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "56px",
                minHeight: "56px",
                boxShadow: "0 4px 12px rgba(5, 150, 105, 0.2)"
              }}>📍</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: "1.15em", color: "#1b1c22", marginBottom: "4px" }}>Address</div>
                <div style={{ fontSize: "1.05em", color: "#555" }}>New York, United States</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Copyright Footer */}
      <footer style={{
        width: "100vw", 
        textAlign: "center", 
        padding: "32px 0",
        background: "linear-gradient(to top, #f8f7fb 0%, #fafbfc 100%)",
        borderTop: "1px solid rgba(118, 75, 162, 0.08)"
      }}>
        <div style={{
          background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontWeight: 700,
          fontSize: "1.1rem"
        }}>
          &copy; {new Date().getFullYear()} VideoHub. All rights reserved.
        </div>
      </footer>
    </>
  );
}

/*
//this is claude's design1
import React, { useRef } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  // For optional manual scrolling (not strictly required if links are anchor tags)
  const aboutRef = useRef();
  const teamRef = useRef();
  const contactRef = useRef();

  return (
    <>
      <Navbar />

     
      <div style={{
        width: "100vw", 
        minHeight: "60vh", 
        display: "flex", 
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", 
        color: "#fff",
        textAlign: "center", 
        paddingTop: "100px", 
        paddingBottom: "60px",
        position: "relative",
        overflow: "hidden"
      }}>
       
        <div style={{
          position: "absolute",
          top: "-50%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
          borderRadius: "50%"
        }}></div>
        <div style={{
          position: "absolute",
          bottom: "-30%",
          left: "-5%",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
          borderRadius: "50%"
        }}></div>
        
        <h1 style={{ 
          fontSize: "3.5rem", 
          fontWeight: 800, 
          marginBottom: "1.2rem",
          letterSpacing: "-0.02em",
          textShadow: "0 4px 20px rgba(0,0,0,0.15)",
          position: "relative",
          zIndex: 1
        }}>
          Transform Your Videos with AI
        </h1>
        <p style={{ 
          fontSize: "1.4rem", 
          opacity: 0.95, 
          maxWidth: "700px", 
          margin: 0,
          lineHeight: "1.6",
          fontWeight: 400,
          textShadow: "0 2px 10px rgba(0,0,0,0.1)",
          position: "relative",
          zIndex: 1
        }}>
          Analyze, Edit, and Manage Your Video Content with Cutting-Edge Intelligence
        </p>
      </div>

      <div style={{
        paddingTop: "60px",
        paddingBottom: "60px",
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center",
        gap: "48px", 
        background: "linear-gradient(to bottom, #f8f7fb 0%, #fafbfc 100%)",
        minHeight: "70vh"
      }}>
        
        <section
          ref={aboutRef}
          id="about-section"
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            boxShadow: "0 10px 40px rgba(118, 75, 162, 0.12), 0 2px 8px rgba(0,0,0,0.06)",
            padding: "48px 40px",
            width: "85vw",
            maxWidth: "720px",
            border: "1px solid rgba(118, 75, 162, 0.08)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 16px 56px rgba(118, 75, 162, 0.18), 0 4px 12px rgba(0,0,0,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 40px rgba(118, 75, 162, 0.12), 0 2px 8px rgba(0,0,0,0.06)";
          }}
        >
          <h2 style={{
            fontSize: "2.4rem", 
            fontWeight: 800, 
            marginBottom: "24px", 
            color: "#1b1c22",
            background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            About Us
          </h2>
          <p style={{
            fontSize: "1.15rem", 
            color: "#3a3a52", 
            lineHeight: "1.8",
            fontWeight: 400, 
            marginBottom: 0
          }}>
            VideoHub is your comprehensive video solution platform powered by advanced AI technology.
            <br /><br />
            We provide cutting-edge tools for downloading, editing, analyzing, and managing your video content.
            <br /><br />
            Our mission is to make video processing accessible and efficient for everyone, from content creators to businesses.
          </p>
        </section>

        
        <section
          ref={teamRef}
          id="team-section"
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            boxShadow: "0 10px 40px rgba(118, 75, 162, 0.12), 0 2px 8px rgba(0,0,0,0.06)",
            padding: "48px 40px",
            width: "85vw",
            maxWidth: "720px",
            border: "1px solid rgba(118, 75, 162, 0.08)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 16px 56px rgba(118, 75, 162, 0.18), 0 4px 12px rgba(0,0,0,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 40px rgba(118, 75, 162, 0.12), 0 2px 8px rgba(0,0,0,0.06)";
          }}
        >
          <h2 style={{
            fontSize: "2.4rem", 
            fontWeight: 800, 
            marginBottom: "32px", 
            color: "#1b1c22",
            background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Meet Our Team
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
            <div style={{
              borderLeft: "4px solid #a142d3", 
              paddingLeft: "24px",
              background: "linear-gradient(to right, rgba(161, 66, 211, 0.04), transparent)",
              padding: "20px 24px",
              borderRadius: "0 12px 12px 0",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(to right, rgba(161, 66, 211, 0.08), transparent)";
              e.currentTarget.style.borderLeftWidth = "5px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(to right, rgba(161, 66, 211, 0.04), transparent)";
              e.currentTarget.style.borderLeftWidth = "4px";
            }}
            >
              <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#1b1c22", marginBottom: "4px" }}>Seerin M</div>
              <div style={{ color: "#a142d3", fontWeight: 600, marginBottom: "8px", fontSize: "1.05rem" }}>Founder</div>
              <div style={{ color: "#555", fontSize: "1rem", marginBottom: "4px" }}>seerin2005cse@gmail.com</div>
              <div style={{ color: "#777", fontSize: "0.95rem" }}>India</div>
            </div>
            <div style={{
              borderLeft: "4px solid #3eaef5", 
              paddingLeft: "24px",
              background: "linear-gradient(to right, rgba(62, 174, 245, 0.04), transparent)",
              padding: "20px 24px",
              borderRadius: "0 12px 12px 0",
              transition: "all 0.3s ease"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(to right, rgba(62, 174, 245, 0.08), transparent)";
              e.currentTarget.style.borderLeftWidth = "5px";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(to right, rgba(62, 174, 245, 0.04), transparent)";
              e.currentTarget.style.borderLeftWidth = "4px";
            }}
            >
              <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#1b1c22", marginBottom: "4px" }}>Rosy K</div>
              <div style={{ color: "#3eaef5", fontWeight: 600, marginBottom: "8px", fontSize: "1.05rem" }}>Co-Founder</div>
              <div style={{ color: "#555", fontSize: "1rem", marginBottom: "4px" }}>k.rosykumar@gmail.com</div>
              <div style={{ color: "#777", fontSize: "0.95rem" }}>India</div>
            </div>
          </div>
        </section>

        <section
          ref={contactRef}
          id="contact-section"
          style={{
            background: "#ffffff",
            borderRadius: "24px",
            boxShadow: "0 10px 40px rgba(102, 126, 234, 0.12), 0 2px 8px rgba(0,0,0,0.06)",
            padding: "48px 40px",
            width: "85vw",
            maxWidth: "720px",
            border: "1px solid rgba(102, 126, 234, 0.08)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-4px)";
            e.currentTarget.style.boxShadow = "0 16px 56px rgba(102, 126, 234, 0.18), 0 4px 12px rgba(0,0,0,0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 40px rgba(102, 126, 234, 0.12), 0 2px 8px rgba(0,0,0,0.06)";
          }}
        >
          <h2 style={{
            fontSize: "2.4rem", 
            fontWeight: 800, 
            marginBottom: "36px", 
            color: "#1b1c22",
            background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}>
            Contact Us
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "20px",
              padding: "16px",
              borderRadius: "16px",
              transition: "background 0.3s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#f8f7fb"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <span style={{
                background: "linear-gradient(135deg, #ede1ff 0%, #e8d9ff 100%)", 
                padding: "16px", 
                borderRadius: "16px",
                fontSize: "1.5em", 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "56px",
                minHeight: "56px",
                boxShadow: "0 4px 12px rgba(118, 75, 162, 0.15)"
              }}>☎</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: "1.15em", color: "#1b1c22", marginBottom: "4px" }}>Phone</div>
                <div style={{ fontSize: "1.05em", color: "#555" }}>+1234567890</div>
              </div>
            </div>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "20px",
              padding: "16px",
              borderRadius: "16px",
              transition: "background 0.3s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#f8f7fb"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <span style={{
                background: "linear-gradient(135deg, #e3efff 0%, #d9e7ff 100%)", 
                padding: "16px", 
                borderRadius: "16px",
                fontSize: "1.5em", 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "56px",
                minHeight: "56px",
                boxShadow: "0 4px 12px rgba(102, 126, 234, 0.15)"
              }}>✉️</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: "1.15em", color: "#1b1c22", marginBottom: "4px" }}>Email</div>
                <div style={{ fontSize: "1.05em", color: "#555" }}>videohub@gmail.com</div>
              </div>
            </div>
            <div style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "20px",
              padding: "16px",
              borderRadius: "16px",
              transition: "background 0.3s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#f8f7fb"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            >
              <span style={{
                background: "linear-gradient(135deg, #ddffe3 0%, #d1f7db 100%)", 
                padding: "16px", 
                borderRadius: "16px",
                fontSize: "1.5em", 
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "56px",
                minHeight: "56px",
                boxShadow: "0 4px 12px rgba(66, 211, 122, 0.15)"
              }}>📍</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: "1.15em", color: "#1b1c22", marginBottom: "4px" }}>Address</div>
                <div style={{ fontSize: "1.05em", color: "#555" }}>New York, United States</div>
              </div>
            </div>
          </div>
        </section>
      </div>

    
      <footer style={{
        width: "100vw", 
        textAlign: "center", 
        padding: "32px 0",
        background: "linear-gradient(to top, #f8f7fb 0%, #fafbfc 100%)",
        borderTop: "1px solid rgba(118, 75, 162, 0.08)"
      }}>
        <div style={{
          background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontWeight: 700,
          fontSize: "1.1rem"
        }}>
          &copy; {new Date().getFullYear()} VideoHub. All rights reserved.
        </div>
      </footer>
    </>
  );
}*/

//below is actual working only. 
/*import React, { useRef } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  // For optional manual scrolling (not strictly required if links are anchor tags)
  const aboutRef = useRef();
  const teamRef = useRef();
  const contactRef = useRef();

  return (
    <>
      <Navbar />

     
      <div style={{
        width: "100vw", minHeight: "56vh", display: "flex", flexDirection: "column",
        justifyContent: "center", alignItems: "center",
        background: "linear-gradient(120deg,#764ba2 0%,#667eea 100%)", color: "#fff",
        textAlign: "center", paddingTop: "88px", paddingBottom: "46px"
      }}>
        <h1 style={{ fontSize: "3rem", fontWeight: 800, marginBottom: "0.7rem" }}>
          Transform Your Videos with AI
        </h1>
        <p style={{ fontSize: "1.33rem", opacity: 0.98, maxWidth: "650px", margin: 0 }}>
          Analyze, Edit, and Manage Your Video Content with Cutting-Edge Intelligence
        </p>
      </div>

    
      <div style={{
        paddingTop: "24px", display: "flex", flexDirection: "column", alignItems: "center",
        gap: "36px", background: "#fafafa", minHeight: "70vh"
      }}>
       
        <section
          ref={aboutRef}
          id="about-section"
          style={{
            background: "#fff",
            borderRadius: "18px",
            boxShadow: "0 6px 32px #764ba23e",
            padding: "32px 28px",
            width: "82vw",
            maxWidth: "640px"
          }}
        >
          <h2 style={{
            fontSize: "2rem", fontWeight: 800, marginBottom: "16px", color: "#1b1c22"
          }}>
            About Us
          </h2>
          <p style={{
            fontSize: "1.18rem", color: "#22223b", opacity: 0.96, fontWeight: 500, marginBottom: 0
          }}>
            VideoHub is your comprehensive video solution platform powered by advanced AI technology.<br />
            We provide cutting-edge tools for downloading, editing, analyzing, and managing your video content.<br />
            Our mission is to make video processing accessible and efficient for everyone, from content creators to businesses.
          </p>
        </section>

       
        <section
          ref={teamRef}
          id="team-section"
          style={{
            background: "#fff",
            borderRadius: "18px",
            boxShadow: "0 6px 32px #764ba23e",
            padding: "32px 28px",
            width: "82vw",
            maxWidth: "640px"
          }}
        >
          <h2 style={{
            fontSize: "2rem", fontWeight: 800, marginBottom: "18px", color: "#1b1c22"
          }}>
            Meet Our Team
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div style={{
              borderLeft: "5px solid #a142d3", paddingLeft: "18px"
            }}>
              <div style={{ fontSize: "1.27rem", fontWeight: "bold" }}>Seerin M</div>
              <div style={{ color: "#a142d3", fontWeight: 600, marginBottom: "2px" }}>Founder</div>
              <div style={{ color: "#444", fontSize: "0.97em" }}>seerin2005cse@gmail.com</div>
              <div style={{ color: "#666", fontSize: "0.97em" }}>India</div>
            </div>
            <div style={{
              borderLeft: "5px solid #3eaef5", paddingLeft: "18px"
            }}>
              <div style={{ fontSize: "1.27rem", fontWeight: "bold" }}>Rosy K</div>
              <div style={{ color: "#3eaef5", fontWeight: 600, marginBottom: "2px" }}>Co-Founder</div>
              <div style={{ color: "#444", fontSize: "0.97em" }}>k.rosykumar@gmail.com</div>
              <div style={{ color: "#666", fontSize: "0.97em" }}>India</div>
            </div>
          </div>
        </section>

        
        <section
          ref={contactRef}
          id="contact-section"
          style={{
            background: "#fff",
            borderRadius: "18px",
            boxShadow: "0 6px 32px #667eea33",
            padding: "32px 28px",
            width: "82vw",
            maxWidth: "640px"
          }}
        >
          <h2 style={{
            fontSize: "2rem", fontWeight: 800, marginBottom: "20px", color: "#1b1c22"
          }}>
            Contact Us
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{
                background: "#ede1ff", padding: "10px", borderRadius: "15px",
                fontSize: "1.3em", color: "#846adc"
              }}>☎</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: "1.14em", color: "#27274f" }}>Phone</div>
                <div style={{ fontSize: "1em", color: "#333" }}>+1234567890</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{
                background: "#e3efff", padding: "10px", borderRadius: "15px",
                fontSize: "1.3em", color: "#546eea"
              }}>✉️</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: "1.14em", color: "#27274f" }}>Email</div>
                <div style={{ fontSize: "1em", color: "#333" }}>videohub@gmail.com</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <span style={{
                background: "#ddffe3", padding: "10px", borderRadius: "15px",
                fontSize: "1.3em", color: "#42d37a"
              }}>📍</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: "1.14em", color: "#27274f" }}>Address</div>
                <div style={{ fontSize: "1em", color: "#333" }}>New York, United States</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      
      <footer style={{
        width: "100vw", textAlign: "center", padding: "24px 0 18px 0",
        background: "#f8fafc", color: "#667eea", fontWeight: 600, fontSize: "1.09em"
      }}>
        &copy; {new Date().getFullYear()} VideoHub. All rights reserved.
      </footer>
    </>
  );
}*/



        


/*import React from "react";
import Navbar from "../components/Navbar";

export default function Home(){
  return (
    <>
      <Navbar />
      <div className="hero">
        <h1>Your tagline goes here — AI video tools, unified.</h1>
      </div>

      <div className="container">
        <section id="about">
          <h2>About Us</h2>
          <p>We combine small AI video tools into a single suite. Integrate BestChoice and AnswerBot easily.</p>
        </section>

        <section id="contact" style={{marginTop:24}}>
          <h2>Contact Us</h2>
          <p>Email: support@myvideosuite.example</p>
        </section>
      </div>
    </>
  );
}
*/
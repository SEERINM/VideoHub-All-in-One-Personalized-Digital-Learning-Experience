/*import React from "react";
import Navbar from "../components/Navbar";
import ServiceCard from "../components/ServiceCard";
import { useNavigate } from "react-router-dom";
import { BsYoutube, BsPuzzleFill, BsStarFill, BsChatDotsFill, BsFileTextFill } from "react-icons/bs";

export default function Services() {
  const nav = useNavigate();

  // Services data
  const services = [
    {
      title: "YouTube Video Downloader",
      desc: "Download your favorite YouTube videos in high quality. Support for multiple formats and resolutions.",
      features: ["Multiple quality options", "Fast download speeds", "Batch downloads"],
      to: "/services/downloader",
      colorFrom: "#ef4444",
      colorTo: "#b91c1c",
      Icon: BsYoutube
    },
    {
      title: "AI Topic Merger",
      desc: "Intelligently merge multiple videos based on topics using advanced AI analysis.",
      features: ["Smart topic detection", "Seamless transitions", "Auto scene matching"],
      to: "/services/auto-clip",
      colorFrom: "#7c3aed",
      colorTo: "#4338ca",
      Icon: BsPuzzleFill
    },
    {
      title: "Best Video Selector",
      desc: "AI analyzes and ranks your videos to help you choose the best content for your needs.",
      features: ["Quality assessment", "Engagement prediction", "Content scoring"],
      to: "/services/best-choice",
      colorFrom: "#10b981",
      colorTo: "#047857",
      Icon: BsStarFill
    },
    {
      title: "Video Q&A Chatbot",
      desc: "Ask questions about your videos and get instant AI-powered answers from the content.",
      features: ["Natural language queries", "Context-aware responses", "Timestamp references"],
      to: "/services/answer-bot",
      colorFrom: "#3b82f6",
      colorTo: "#06b6d4",
      Icon: BsChatDotsFill
    },
    {
      title: "Summarizer & Notes Generator",
      desc: "Automatically generate comprehensive summaries and detailed notes from your video content.",
      features: ["Key points extraction", "Structured notes", "Multiple export formats"],
      to: "/services/summarizer",
      colorFrom: "#f59e42",
      colorTo: "#f472b6",
      Icon: BsFileTextFill
    },
  ];

  return (
    <>
      <Navbar />
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #ede9fe, #fee2f3 60%)",
        padding: "56px 0 56px 0"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <h1 style={{
            fontSize: "3rem",
            fontWeight: 800,
            color: "#16161d",
            textAlign: "center",
            margin: "0 0 16px 0"
          }}>Our Services</h1>
          <p style={{
            fontSize: 22,
            textAlign: "center",
            color: "#374151",
            marginBottom: 36
          }}>
            Powerful AI-driven tools to elevate your video content workflow
          </p>
          <div>
            {services.map(service => (
              <ServiceCard
                key={service.title}
                title={service.title}
                desc={service.desc}
                features={service.features}
                colorFrom={service.colorFrom}
                colorTo={service.colorTo}
                Icon={service.Icon}
                onClick={() => nav(service.to)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
*/

/*
//current good functioning
import React from "react";
import Navbar from "../components/Navbar";
import ServiceCard from "../components/ServiceCard";
import { useNavigate } from "react-router-dom";

export default function Services(){
  const nav = useNavigate();

  const services = [
    { title: "Video Downloader", desc: "YouTube links downloader", hover: "Download video from YouTube", to: "/services/downloader" },
    { title: "Auto Clip", desc: "AI topic based video merging", hover: "Auto clip/merge videos by topic", to: "/services/auto-clip" },
    { title: "Best Choice", desc: "Choose the best video", hover: "Pick best video among inputs", to: "/services/best-choice" },
    { title: "Answer Bot", desc: "Get answers from videos", hover: "Chat with your videos", to: "/services/answer-bot" },
    { title: "Summarizer & Notes Genearator", desc: "Smart Video summarizer and Notes Takes", hover: "Get short summaries of videos", to: "/services/summarizer" }
  ];

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Our Services</h2>
        <div className="service-grid">
          {services.map(s => (
            <ServiceCard
              key={s.title}
              title={s.title}
              desc={s.desc}
              hoverText={s.hover}
              onClick={()=>{
                // navigate to service route
                if(s.to === "/services/best-choice") nav("/services/best-choice")
                else if (s.to === "/services/answer-bot") nav("/services/answer-bot")
                else if (s.to === "/services/summarizer") nav("/services/summarizer"); 
                else if (s.to === "/services/auto-clip") nav("/services/auto-clip") 
                else alert("This service is not implemented yet.")
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}*/

//claude's design
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Services() {
  const nav = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const services = [
    {
      title: "YouTube Video Downloader",
      desc: "Download your favorite YouTube videos in high quality. Support for multiple formats and resolutions.",
      features: ["Multiple quality options", "Fast download speeds", "Batch downloads"],
      icon: "📺",
      gradient: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)",
      to: "/services/downloader"
    },
    {
      title: "AI Topic Merger",
      desc: "Intelligently merge multiple videos based on topics using advanced AI analysis.",
      features: ["Smart topic detection", "Seamless transitions", "Auto scene matching"],
      icon: "🧩",
      gradient: "linear-gradient(135deg, #a855f7 0%, #8b5cf6 100%)",
      to: "/services/auto-clip"
    },
    {
      title: "Best Video Selector",
      desc: "AI analyzes and ranks your videos to help you choose the best content for your needs.",
      features: ["Quality assessment", "Engagement prediction", "Content scoring"],
      icon: "🏆",
      gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      to: "/services/best-choice"
    },
    {
      title: "Video Q&A Chatbot",
      desc: "Ask questions about your videos and get instant AI-powered answers from the content.",
      features: ["Natural language queries", "Context-aware responses", "Timestamp references"],
      icon: "💬",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      to: "/services/answer-bot"
    },
    {
      title: "Summarizer & Notes Generator",
      desc: "Automatically generate comprehensive summaries and detailed notes from your video content.",
      features: ["Key points extraction", "Structured notes", "Multiple export formats"],
      icon: "📝",
      gradient: "linear-gradient(135deg, #f59e0b 0%, #ec4899 100%)",
      to: "/services/summarizer"
    }
  ];

  const handleCardClick = (service) => {
   if (service.to === "/services/best-choice") nav("/services/best-choice");
    else if (service.to === "/services/answer-bot") nav("/services/answer-bot");
    else if (service.to === "/services/summarizer") nav("/services/summarizer");
    else if (service.to === "/services/auto-clip") nav("/services/auto-clip");
    else alert("This service is not implemented yet.");
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      paddingTop: "72px"
    }}>
      <Navbar />
      
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "60px 20px"
      }}>
        {/* Header Section */}
        <div style={{
          textAlign: "center",
          marginBottom: "60px"
        }}>
          <h1 style={{
            fontSize: "3.5rem",
            fontWeight: "900",
            color: "#fff",
            marginBottom: "20px",
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.2)"
          }}>
            Our Services
          </h1>
          <p style={{
            fontSize: "1.4rem",
            color: "rgba(255, 255, 255, 0.9)",
            maxWidth: "800px",
            margin: "0 auto",
            lineHeight: "1.8"
          }}>
            Powerful AI-driven tools to elevate your video content workflow
          </p>
        </div>

        {/* Services Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
          gap: "30px",
          marginBottom: "40px"
        }}>
          {services.map((service, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(service)}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                background: "rgba(255, 255, 255, 0.98)",
                borderRadius: "24px",
                overflow: "hidden",
                boxShadow: hoveredCard === index 
                  ? "0 25px 60px rgba(0, 0, 0, 0.25)" 
                  : "0 10px 40px rgba(0, 0, 0, 0.15)",
                cursor: "pointer",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                transform: hoveredCard === index ? "translateY(-12px) scale(1.02)" : "translateY(0) scale(1)"
              }}
            >
              {/* Gradient Header */}
              <div style={{
                background: service.gradient,
                padding: "40px 30px",
                position: "relative",
                overflow: "hidden"
              }}>
                {/* Icon */}
                <div style={{
                  width: "80px",
                  height: "80px",
                  background: "rgba(255, 255, 255, 0.2)",
                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "48px",
                  marginBottom: "20px",
                  backdropFilter: "blur(10px)",
                  border: "2px solid rgba(255, 255, 255, 0.3)"
                }}>
                  {service.icon}
                </div>

                {/* Title */}
                <h2 style={{
                  fontSize: "1.8rem",
                  fontWeight: "800",
                  color: "#fff",
                  margin: 0,
                  textShadow: "0 2px 10px rgba(0, 0, 0, 0.15)"
                }}>
                  {service.title}
                </h2>
              </div>

              {/* Content */}
              <div style={{
                padding: "30px"
              }}>
                {/* Description */}
                <p style={{
                  fontSize: "1.1rem",
                  color: "#555",
                  lineHeight: "1.7",
                  marginBottom: "24px"
                }}>
                  {service.desc}
                </p>

                {/* Features List */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  marginBottom: "24px"
                }}>
                  {service.features.map((feature, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        fontSize: "1rem",
                        color: "#666"
                      }}
                    >
                      <span style={{
                        fontSize: "20px",
                        color: "#10b981"
                      }}>✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Button */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: "20px",
                  borderTop: "2px solid #f0f0f0"
                }}>
                  <span style={{
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    background: service.gradient,
                    WebkitBackgroundClip: "text",
                    color: "transparent"
                  }}>
                    Get Started
                  </span>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: service.gradient,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    color: "#fff",
                    transform: hoveredCard === index ? "translateX(8px)" : "translateX(0)",
                    transition: "transform 0.3s ease"
                  }}>
                    →
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

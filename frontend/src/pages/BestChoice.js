//claude's design
import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function BestChoice() {
  const [numVideos, setNumVideos] = useState(0);
  const [videos, setVideos] = useState([]);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [bestVideo, setBestVideo] = useState(null);
  const [step, setStep] = useState(1); // 1: topic, 2: videos, 3: result

  const handleFileChange = (index, file) => {
    const newVideos = [...videos];
    newVideos[index] = file;
    setVideos(newVideos);
  };

  const handleTopicSubmit = () => {
    if (!topic.trim()) {
      alert("Please enter a topic!");
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic || videos.length !== numVideos) {
      alert("Please provide all required inputs!");
      return;
    }

    const formData = new FormData();
    formData.append("topic", topic);
    videos.forEach((file) => formData.append("videos", file));

    setLoading(true);
    setBestVideo(null);

    try {
      const res = await axios.post("http://127.0.0.1:5000/api/best-choice/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setBestVideo(res.data.best_video);
      setStep(3);
    } catch (err) {
      console.error(err);
      alert("Error analyzing videos.");
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = () => {
    setNumVideos(0);
    setVideos([]);
    setTopic("");
    setBestVideo(null);
    setStep(1);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #43cea2 0%, #185a9d 100%)",
      paddingTop: "72px"
    }}>
      <Navbar />
      
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px 20px"
      }}>
        {/* Header Section */}
        <div style={{
          background: "rgba(255, 255, 255, 0.98)",
          borderRadius: "24px",
          padding: "40px",
          marginBottom: "30px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
          textAlign: "center"
        }}>
          <div style={{
            fontSize: "72px",
            marginBottom: "16px"
          }}>🎯</div>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            background: "linear-gradient(135deg, #43cea2, #185a9d)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            marginBottom: "12px"
          }}>
            Best Choice Video Analyzer
          </h1>
          <p style={{
            fontSize: "1.1rem",
            color: "#666",
            maxWidth: "700px",
            margin: "0 auto"
          }}>
            Upload multiple videos on a topic and let AI determine which one is the best match
          </p>
        </div>

        {/* Step 1: Topic Input */}
        {step === 1 && (
          <div style={{
            background: "rgba(255, 255, 255, 0.98)",
            borderRadius: "24px",
            padding: "50px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              marginBottom: "30px"
            }}>
              <div style={{ fontSize: "64px" }}>📝</div>
              <h2 style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#333",
                margin: 0
              }}>
                What's Your Topic?
              </h2>
            </div>

            <div style={{
              background: "linear-gradient(135deg, rgba(67, 206, 162, 0.08), rgba(24, 90, 157, 0.08))",
              borderRadius: "20px",
              padding: "40px",
              border: "2px solid rgba(67, 206, 162, 0.2)",
              marginBottom: "30px"
            }}>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Artificial Intelligence, Machine Learning, Web Development..."
                style={{
                  width: "100%",
                  padding: "24px 28px",
                  fontSize: "1.3rem",
                  borderRadius: "16px",
                  border: "2px solid #e0e0e0",
                  background: "#fff",
                  color: "#333",
                  outline: "none",
                  transition: "all 0.3s ease",
                  boxSizing: "border-box"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#43cea2";
                  e.target.style.boxShadow = "0 0 0 4px rgba(67, 206, 162, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e0e0e0";
                  e.target.style.boxShadow = "none";
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') handleTopicSubmit();
                }}
              />
            </div>

            <button
              onClick={handleTopicSubmit}
              style={{
                width: "100%",
                padding: "24px",
                fontSize: "1.5rem",
                fontWeight: "700",
                border: "none",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #43cea2, #185a9d)",
                color: "#fff",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 10px 30px rgba(67, 206, 162, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(67, 206, 162, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(67, 206, 162, 0.3)";
              }}
            >
              <span style={{ fontSize: "32px" }}>➡️</span>
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Video Upload */}
        {step === 2 && !bestVideo && (
          <div style={{
            background: "rgba(255, 255, 255, 0.98)",
            borderRadius: "24px",
            padding: "50px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)"
          }}>
            {/* Topic Display */}
            <div style={{
              background: "linear-gradient(135deg, rgba(67, 206, 162, 0.08), rgba(24, 90, 157, 0.08))",
              borderRadius: "16px",
              padding: "20px 30px",
              marginBottom: "40px",
              border: "2px solid rgba(67, 206, 162, 0.2)",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "1rem", color: "#666", marginBottom: "4px" }}>
                Topic:
              </div>
              <div style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#185a9d"
              }}>
                {topic}
              </div>
              <button
                onClick={() => setStep(1)}
                disabled={loading}
                style={{
                  marginTop: "12px",
                  padding: "8px 20px",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  border: "2px solid #43cea2",
                  borderRadius: "8px",
                  background: "#fff",
                  color: "#43cea2",
                  cursor: loading ? "not-allowed" : "pointer"
                }}
              >
                Change Topic
              </button>
            </div>

            {/* Number Selection */}
            {numVideos === 0 ? (
              <>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px",
                  marginBottom: "30px"
                }}>
                  <div style={{ fontSize: "64px" }}>🎬</div>
                  <h2 style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "#333",
                    margin: 0
                  }}>
                    How Many Videos?
                  </h2>
                </div>
                
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "24px"
                }}>
                  {[2, 3, 4].map((n) => (
                    <button
                      key={n}
                      onClick={() => setNumVideos(n)}
                      style={{
                        padding: "40px",
                        fontSize: "3.5rem",
                        fontWeight: "700",
                        border: "3px solid #e0e0e0",
                        borderRadius: "20px",
                        background: "#fff",
                        color: "#333",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.05)";
                        e.currentTarget.style.borderColor = "#43cea2";
                        e.currentTarget.style.boxShadow = "0 10px 30px rgba(67, 206, 162, 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                        e.currentTarget.style.borderColor = "#e0e0e0";
                        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                {/* Upload Section */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px",
                  marginBottom: "30px"
                }}>
                  <div style={{ fontSize: "64px" }}>📤</div>
                  <h2 style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                    color: "#333",
                    margin: 0
                  }}>
                    Upload {numVideos} Videos
                  </h2>
                </div>

                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "24px",
                  marginBottom: "30px"
                }}>
                  {Array.from({ length: numVideos }).map((_, i) => (
                    <label
                      key={i}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "40px 20px",
                        border: videos[i] ? "3px solid #43cea2" : "3px dashed #ccc",
                        borderRadius: "20px",
                        background: videos[i] 
                          ? "linear-gradient(135deg, rgba(67, 206, 162, 0.1), rgba(24, 90, 157, 0.1))" 
                          : "#fafafa",
                        cursor: loading ? "not-allowed" : "pointer",
                        transition: "all 0.3s ease",
                        minHeight: "220px"
                      }}
                      onMouseEnter={(e) => {
                        if (!loading) {
                          e.currentTarget.style.transform = "translateY(-5px)";
                          e.currentTarget.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.15)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleFileChange(i, e.target.files[0])}
                        disabled={loading}
                        style={{ display: "none" }}
                      />
                      <div style={{ fontSize: "72px", marginBottom: "16px" }}>
                        {videos[i] ? "✅" : "🎥"}
                      </div>
                      <div style={{
                        fontSize: "1.3rem",
                        fontWeight: "700",
                        color: videos[i] ? "#43cea2" : "#666",
                        marginBottom: "8px",
                        textAlign: "center"
                      }}>
                        Video {i + 1}
                      </div>
                      <div style={{
                        fontSize: "0.95rem",
                        color: "#888",
                        textAlign: "center",
                        padding: "0 10px",
                        wordBreak: "break-word"
                      }}>
                        {videos[i] ? videos[i].name : "Click to upload"}
                      </div>
                    </label>
                  ))}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading || videos.length !== numVideos}
                  style={{
                    width: "100%",
                    padding: "24px",
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    border: "none",
                    borderRadius: "16px",
                    background: loading || videos.length !== numVideos
                      ? "#ccc"
                      : "linear-gradient(135deg, #43cea2, #185a9d)",
                    color: "#fff",
                    cursor: loading || videos.length !== numVideos ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 10px 30px rgba(67, 206, 162, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px"
                  }}
                  onMouseEnter={(e) => {
                    if (!loading && videos.length === numVideos) {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = "0 15px 40px rgba(67, 206, 162, 0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(67, 206, 162, 0.3)";
                  }}
                >
                  {loading ? (
                    <>
                      <span style={{ fontSize: "32px", animation: "spin 2s linear infinite" }}>🔄</span>
                      Analyzing Videos...
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: "32px" }}>🚀</span>
                      Analyze & Find Best Video
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        )}

        {/* Step 3: Result */}
        {step === 3 && bestVideo && (
          <div style={{
            background: "rgba(255, 255, 255, 0.98)",
            borderRadius: "24px",
            padding: "50px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              marginBottom: "30px"
            }}>
              <div style={{ fontSize: "80px" }}>🏆</div>
              <h2 style={{
                fontSize: "2.2rem",
                fontWeight: "800",
                background: "linear-gradient(135deg, #43cea2, #185a9d)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                margin: 0
              }}>
                Best Video Found!
              </h2>
            </div>

            <div style={{
              background: "linear-gradient(135deg, rgba(67, 206, 162, 0.15), rgba(24, 90, 157, 0.15))",
              borderRadius: "20px",
              padding: "40px",
              border: "3px solid #43cea2",
              marginBottom: "30px"
            }}>
              <div style={{
                fontSize: "1rem",
                color: "#666",
                marginBottom: "12px",
                textAlign: "center"
              }}>
                For topic: <strong>{topic}</strong>
              </div>
              <div style={{
                background: "#fff",
                padding: "30px",
                borderRadius: "16px",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
              }}>
                <p style={{
                  fontSize: "1.6rem",
                  fontWeight: "700",
                  color: "#185a9d",
                  margin: 0,
                  lineHeight: "1.6"
                }}>
                  {bestVideo}
                </p>
              </div>
            </div>

            <button
              onClick={handleRestart}
              style={{
                width: "100%",
                padding: "20px",
                fontSize: "1.3rem",
                fontWeight: "600",
                border: "2px solid #43cea2",
                borderRadius: "12px",
                background: "#fff",
                color: "#43cea2",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, #43cea2, #185a9d)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(67, 206, 162, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = "#43cea2";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span style={{ fontSize: "24px" }}>🔁</span>
              Start New Analysis
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default BestChoice;

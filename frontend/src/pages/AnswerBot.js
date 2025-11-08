//claude's design
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function AnswerBot() {
  const [numVideos, setNumVideos] = useState(0);
  const [videos, setVideos] = useState([]);
  const [chat, setChat] = useState([]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [ended, setEnded] = useState(false);
  const messagesEndRef = useRef(null);

  const API_BASE = "http://localhost:5000/api/answerbot";

  const authHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const handleFileChange = (e, index) => {
    const newVideos = [...videos];
    newVideos[index] = e.target.files[0];
    setVideos(newVideos);
  };

  const handleUpload = async () => {
    if (videos.length !== numVideos || numVideos === 0) {
      alert("Please select all videos before uploading.");
      return;
    }

    const formData = new FormData();
    videos.forEach((v) => formData.append("videos", v));

    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...authHeaders(),
        },
      });

      setChat([
        {
          sender: "Bot",
          text: `✅ ${res.data.message} You can now ask questions about the uploaded videos!`,
        },
      ]);
      setReady(true);
    } catch (err) {
      console.error("Upload error:", err);
      if (err.response?.status === 401) {
        alert("⚠️ Please log in again. Session expired.");
      } else {
        alert("❌ Error during upload. Check backend logs.");
      }
    }
    setLoading(false);
  };

  const handleAsk = async () => {
    if (!question.trim()) return;

    const newChat = [...chat, { sender: "You", text: question }];
    setChat(newChat);
    setQuestion("");
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_BASE}/ask`,
        { question },
        { headers: { ...authHeaders() } }
      );
      const botMsg = { sender: "Bot", text: res.data.answer };
      setChat([...newChat, botMsg]);
    } catch (err) {
      console.error("Ask error:", err);
      let msg = "❌ Error getting response.";
      if (err.response?.data?.error)
        msg = `⚠️ ${err.response.data.error}`;
      setChat([...newChat, { sender: "Bot", text: msg }]);
    }

    setLoading(false);
  };

  const handleEndChat = () => {
    setEnded(true);
    setReady(false);
    setChat([{ sender: "Bot", text: "👋 Chat ended. You can restart anytime!" }]);
  };

  const handleRestart = () => {
    setNumVideos(0);
    setVideos([]);
    setChat([]);
    setReady(false);
    setEnded(false);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
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
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
          textAlign: "center"
        }}>
          <div style={{
            fontSize: "72px",
            marginBottom: "16px"
          }}>🎥</div>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            background: "linear-gradient(135deg, #764ba2, #667eea)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            marginBottom: "12px"
          }}>
            AnswerBot
          </h1>
          <p style={{
            fontSize: "1.1rem",
            color: "#666",
            maxWidth: "700px",
            margin: "0 auto"
          }}>
            Upload your videos and ask questions - get instant AI-powered answers
          </p>
        </div>

        {/* Setup Phase - Upload Videos */}
        {!ready && !ended && (
          <div style={{
            background: "rgba(255, 255, 255, 0.98)",
            borderRadius: "24px",
            padding: "50px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)"
          }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              marginBottom: "30px"
            }}>
              <div style={{ fontSize: "64px" }}>📹</div>
              <h2 style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#333",
                margin: 0
              }}>
                Upload Videos to Begin
              </h2>
            </div>

            <p style={{
              fontSize: "1.2rem",
              color: "#666",
              textAlign: "center",
              marginBottom: "30px"
            }}>
              Select how many videos you want to analyze:
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "20px",
              marginBottom: "40px"
            }}>
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  onClick={() => setNumVideos(n)}
                  style={{
                    padding: "30px",
                    fontSize: "3rem",
                    fontWeight: "700",
                    border: numVideos === n ? "3px solid #667eea" : "3px solid #e0e0e0",
                    borderRadius: "20px",
                    background: numVideos === n 
                      ? "linear-gradient(135deg, #667eea, #764ba2)" 
                      : "#fff",
                    color: numVideos === n ? "#fff" : "#333",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: numVideos === n 
                      ? "0 10px 30px rgba(102, 126, 234, 0.4)" 
                      : "0 4px 12px rgba(0, 0, 0, 0.1)",
                    transform: numVideos === n ? "scale(1.05)" : "scale(1)"
                  }}
                  onMouseEnter={(e) => {
                    if (numVideos !== n) {
                      e.currentTarget.style.transform = "scale(1.05)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.15)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (numVideos !== n) {
                      e.currentTarget.style.transform = "scale(1)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
                    }
                  }}
                >
                  {n}
                </button>
              ))}
            </div>

            {numVideos > 0 && (
              <div style={{ marginTop: "40px" }}>
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
                        border: videos[i] ? "3px solid #667eea" : "3px dashed #ccc",
                        borderRadius: "20px",
                        background: videos[i] 
                          ? "linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))" 
                          : "#fafafa",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        minHeight: "200px"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-5px)";
                        e.currentTarget.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.15)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      <input
                        type="file"
                        accept="video/mp4"
                        onChange={(e) => handleFileChange(e, i)}
                        hidden
                      />
                      <div style={{ fontSize: "64px", marginBottom: "16px" }}>
                        {videos[i] ? "✅" : "🎬"}
                      </div>
                      <span style={{
                        fontSize: "1.2rem",
                        fontWeight: "600",
                        color: videos[i] ? "#667eea" : "#666",
                        textAlign: "center"
                      }}>
                        {videos[i] ? videos[i].name : `Upload Video ${i + 1}`}
                      </span>
                    </label>
                  ))}
                </div>

                <button
                  onClick={handleUpload}
                  disabled={loading || videos.length !== numVideos}
                  style={{
                    width: "100%",
                    padding: "24px",
                    fontSize: "1.4rem",
                    fontWeight: "700",
                    border: "none",
                    borderRadius: "16px",
                    background: loading || videos.length !== numVideos
                      ? "#ccc"
                      : "linear-gradient(135deg, #667eea, #764ba2)",
                    color: "#fff",
                    cursor: loading || videos.length !== numVideos ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px"
                  }}
                  onMouseEnter={(e) => {
                    if (!loading && videos.length === numVideos) {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 15px 40px rgba(102, 126, 234, 0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(102, 126, 234, 0.3)";
                  }}
                >
                  {loading ? (
                    <>
                      <span style={{ fontSize: "28px" }}>⏳</span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: "28px" }}>🚀</span>
                      Upload & Transcribe
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Chat Phase */}
        {ready && !ended && (
          <div style={{
            background: "rgba(255, 255, 255, 0.98)",
            borderRadius: "24px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            height: "600px"
          }}>
            {/* Chat Header */}
            <div style={{
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              padding: "24px 30px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px"
              }}>
                <div style={{ fontSize: "40px" }}>💬</div>
                <h2 style={{
                  fontSize: "1.6rem",
                  fontWeight: "700",
                  color: "#fff",
                  margin: 0
                }}>
                  Ask Your Questions
                </h2>
              </div>
              <button
                onClick={handleEndChat}
                style={{
                  padding: "12px 24px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  border: "2px solid #fff",
                  borderRadius: "10px",
                  background: "transparent",
                  color: "#fff",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.color = "#667eea";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#fff";
                }}
              >
                <span style={{ fontSize: "20px" }}>🛑</span>
                End Chat
              </button>
            </div>

            {/* Messages Area */}
            <div style={{
              flex: 1,
              overflowY: "auto",
              padding: "30px",
              background: "#f8f9fa"
            }}>
              {chat.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: msg.sender === "You" ? "flex-end" : "flex-start",
                    marginBottom: "16px"
                  }}
                >
                  <div style={{
                    maxWidth: "70%",
                    padding: "16px 20px",
                    borderRadius: msg.sender === "You" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
                    background: msg.sender === "You" 
                      ? "linear-gradient(135deg, #667eea, #764ba2)" 
                      : "#fff",
                    color: msg.sender === "You" ? "#fff" : "#333",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    fontSize: "1.05rem",
                    lineHeight: "1.6"
                  }}>
                    <div style={{
                      fontSize: "0.85rem",
                      fontWeight: "700",
                      marginBottom: "6px",
                      opacity: 0.9
                    }}>
                      {msg.sender === "You" ? "You" : "🤖 AnswerBot"}
                    </div>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{
              padding: "24px 30px",
              background: "#fff",
              borderTop: "2px solid #e0e0e0",
              display: "flex",
              gap: "12px"
            }}>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask something about your uploaded videos..."
                disabled={loading}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !loading) handleAsk();
                }}
                style={{
                  flex: 1,
                  padding: "16px 20px",
                  fontSize: "1.1rem",
                  borderRadius: "12px",
                  border: "2px solid #e0e0e0",
                  outline: "none",
                  transition: "all 0.3s ease"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#667eea";
                  e.target.style.boxShadow = "0 0 0 4px rgba(102, 126, 234, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e0e0e0";
                  e.target.style.boxShadow = "none";
                }}
              />
              <button
                onClick={handleAsk}
                disabled={loading || !question.trim()}
                style={{
                  padding: "16px 32px",
                  fontSize: "1.1rem",
                  fontWeight: "700",
                  border: "none",
                  borderRadius: "12px",
                  background: loading || !question.trim()
                    ? "#ccc"
                    : "linear-gradient(135deg, #667eea, #764ba2)",
                  color: "#fff",
                  cursor: loading || !question.trim() ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  minWidth: "120px",
                  justifyContent: "center"
                }}
                onMouseEnter={(e) => {
                  if (!loading && question.trim()) {
                    e.currentTarget.style.transform = "translateY(-2px)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(102, 126, 234, 0.3)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {loading ? (
                  <>
                    <span style={{ fontSize: "20px" }}>⏳</span>
                    ...
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: "20px" }}>📤</span>
                    Send
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* End Phase */}
        {ended && (
          <div style={{
            background: "rgba(255, 255, 255, 0.98)",
            borderRadius: "24px",
            padding: "60px 50px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "80px", marginBottom: "24px" }}>👋</div>
            <h2 style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#333",
              marginBottom: "16px"
            }}>
              Chat Session Ended
            </h2>
            <p style={{
              fontSize: "1.2rem",
              color: "#666",
              marginBottom: "40px"
            }}>
              Want to analyze more videos?
            </p>
            <button
              onClick={handleRestart}
              style={{
                padding: "20px 40px",
                fontSize: "1.3rem",
                fontWeight: "700",
                border: "none",
                borderRadius: "16px",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                color: "#fff",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
                display: "inline-flex",
                alignItems: "center",
                gap: "12px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(102, 126, 234, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(102, 126, 234, 0.3)";
              }}
            >
              <span style={{ fontSize: "28px" }}>🔁</span>
              Start New Session
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

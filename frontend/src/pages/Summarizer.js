import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Summarizer() {
  const [numVideos, setNumVideos] = useState(0);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("both");
  const [result, setResult] = useState("");
  const [ready, setReady] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  
  const handleFileChange = (e, index) => {
    const newVids = [...videos];
    newVids[index] = e.target.files[0];
    setVideos(newVids);
  };

  const handleUpload = async () => {
    if (videos.length !== numVideos) return alert("Please upload all videos!");
    const formData = new FormData();
    videos.forEach((v) => formData.append("videos", v));
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/summarizer/upload", formData);
      console.log(res.data);
      setReady(true);
      alert("✅ Videos uploaded and transcribed successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Error during upload. Check backend logs.");
    }
    setLoading(false);
  };
  
  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/summarizer/generate", { mode });
      setResult(res.data.result);
      setDownloadUrl(res.data.download_url);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to generate summary. Try again.");
    }
    setLoading(false);
  };

  const handleRestart = () => {
    setNumVideos(0);
    setVideos([]);
    setReady(false);
    setResult("");
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
            fontSize: "64px",
            marginBottom: "16px"
          }}>🧠</div>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            background: "linear-gradient(135deg, #764ba2, #667eea)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            marginBottom: "12px"
          }}>
            Smart Summarizer & Notes Generator
          </h1>
          <p style={{
            fontSize: "1.1rem",
            color: "#666",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            Upload your videos and get AI-powered summaries and notes instantly
          </p>
        </div>

        {/* Setup Phase */}
        {!ready && (
          <div style={{
            background: "rgba(255, 255, 255, 0.98)",
            borderRadius: "24px",
            padding: "50px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)"
          }}>
            <h2 style={{
              fontSize: "1.8rem",
              fontWeight: "700",
              color: "#333",
              marginBottom: "30px",
              textAlign: "center"
            }}>
              📹 Select Number of Videos
            </h2>
            
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
                        {videos[i] ? "✅" : "📂"}
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

        {/* Generation Phase */}
        {ready && (
          <div style={{
            background: "rgba(255, 255, 255, 0.98)",
            borderRadius: "24px",
            padding: "50px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)"
          }}>
            <h2 style={{
              fontSize: "1.8rem",
              fontWeight: "700",
              color: "#333",
              marginBottom: "30px",
              textAlign: "center"
            }}>
              ⚙️ Select Output Type
            </h2>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              marginBottom: "30px"
            }}>
              {[
                { value: "summary", icon: "📝", label: "Short Summary" },
                { value: "notes", icon: "📋", label: "Bullet Notes" },
                { value: "both", icon: "📚", label: "Both" }
              ].map((option) => (
                <label
                  key={option.value}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "30px 20px",
                    border: mode === option.value ? "3px solid #667eea" : "3px solid #e0e0e0",
                    borderRadius: "20px",
                    background: mode === option.value 
                      ? "linear-gradient(135deg, #667eea, #764ba2)" 
                      : "#fff",
                    color: mode === option.value ? "#fff" : "#333",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: mode === option.value 
                      ? "0 10px 30px rgba(102, 126, 234, 0.4)" 
                      : "0 4px 12px rgba(0, 0, 0, 0.1)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <input
                    type="radio"
                    name="mode"
                    value={option.value}
                    checked={mode === option.value}
                    onChange={() => setMode(option.value)}
                    style={{ display: "none" }}
                  />
                  <div style={{ fontSize: "48px", marginBottom: "12px" }}>
                    {option.icon}
                  </div>
                  <span style={{
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    textAlign: "center"
                  }}>
                    {option.label}
                  </span>
                </label>
              ))}
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              style={{
                width: "100%",
                padding: "24px",
                fontSize: "1.4rem",
                fontWeight: "700",
                border: "none",
                borderRadius: "16px",
                background: loading
                  ? "#ccc"
                  : "linear-gradient(135deg, #667eea, #764ba2)",
                color: "#fff",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px",
                marginBottom: "30px"
              }}
              onMouseEnter={(e) => {
                if (!loading) {
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
                  Generating...
                </>
              ) : (
                <>
                  <span style={{ fontSize: "28px" }}>✨</span>
                  Generate Summary/Notes
                </>
              )}
            </button>

            {result && (
              <div style={{
                background: "linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))",
                borderRadius: "20px",
                padding: "30px",
                marginBottom: "20px",
                border: "2px solid rgba(102, 126, 234, 0.2)"
              }}>
                <h3 style={{
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  color: "#333",
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px"
                }}>
                  <span style={{ fontSize: "32px" }}>📜</span>
                  Generated Output
                </h3>
                <pre style={{
                  background: "#fff",
                  padding: "24px",
                  borderRadius: "12px",
                  fontSize: "1rem",
                  lineHeight: "1.8",
                  color: "#333",
                  whiteSpace: "pre-wrap",
                  wordWrap: "break-word",
                  maxHeight: "500px",
                  overflowY: "auto",
                  border: "1px solid #e0e0e0"
                }}>
                  {result}
                </pre>

                {downloadUrl && (
                  <a
                    href={`http://localhost:5000${downloadUrl}`}
                    download
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "12px",
                      marginTop: "20px",
                      padding: "18px",
                      fontSize: "1.2rem",
                      fontWeight: "600",
                      background: "linear-gradient(135deg, #10b981, #059669)",
                      color: "#fff",
                      borderRadius: "12px",
                      textDecoration: "none",
                      transition: "all 0.3s ease",
                      boxShadow: "0 6px 20px rgba(16, 185, 129, 0.3)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 10px 30px rgba(16, 185, 129, 0.4)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 6px 20px rgba(16, 185, 129, 0.3)";
                    }}
                  >
                    <span style={{ fontSize: "24px" }}>⬇️</span>
                    Download Notes
                  </a>
                )}
              </div>
            )}

            <button
              onClick={handleRestart}
              style={{
                width: "100%",
                padding: "18px",
                fontSize: "1.2rem",
                fontWeight: "600",
                border: "2px solid #667eea",
                borderRadius: "12px",
                background: "#fff",
                color: "#667eea",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, #667eea, #764ba2)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(102, 126, 234, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = "#667eea";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span style={{ fontSize: "24px" }}>🔁</span>
              Restart Process
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/*import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Summarizer() {
  const [numVideos, setNumVideos] = useState(0);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("both");
  const [result, setResult] = useState("");
  const [ready, setReady] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const handleFileChange = (e, index) => {
    const newVids = [...videos];
    newVids[index] = e.target.files[0];
    setVideos(newVids);
  };

  const handleUpload = async () => {
    if (videos.length !== numVideos) return alert("Please upload all videos!");
    const formData = new FormData();
    videos.forEach((v) => formData.append("videos", v));
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/summarizer/upload", formData);
      console.log(res.data);
      setReady(true);
      alert("✅ Videos uploaded and transcribed successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Error during upload. Check backend logs.");
    }
    setLoading(false);
  };
  
  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/summarizer/generate", { mode });
      setResult(res.data.result);
      setDownloadUrl(res.data.download_url); // ✅ store download URL
    } catch (err) {
      console.error(err);
      alert("❌ Failed to generate summary. Try again.");
    }
    setLoading(false);
  };

  const handleRestart = () => {
    setNumVideos(0);
    setVideos([]);
    setReady(false);
    setResult("");
  };

  return (
    <>
      <Navbar />
      <div className="chat-container">
        <div className="chat-header">🧠 Smart Summarizer & Notes Generator</div>

        {!ready && (
          <div className="setup">
            <h3>Select number of videos:</h3>
            <div className="num-select">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  className={`num-btn ${numVideos === n ? "active" : ""}`}
                  onClick={() => setNumVideos(n)}
                >
                  {n}
                </button>
              ))}
            </div>

            {numVideos > 0 && (
              <div className="upload-section">
                {Array.from({ length: numVideos }).map((_, i) => (
                  <label key={i} className="upload-box">
                    <input
                      type="file"
                      accept="video/mp4"
                      onChange={(e) => handleFileChange(e, i)}
                      hidden
                    />
                    <span>📂 Upload Video {i + 1}</span>
                  </label>
                ))}
                <button
                  className="upload-btn"
                  onClick={handleUpload}
                  disabled={loading || videos.length !== numVideos}
                >
                  {loading ? "Processing..." : "Upload & Transcribe"}
                </button>
              </div>
            )}
          </div>
        )}

        {ready && (
          <div className="summarizer-box">
            <h3>Select Output Type:</h3>
            <div className="mode-select">
              <label>
                <input
                  type="radio"
                  name="mode"
                  value="summary"
                  checked={mode === "summary"}
                  onChange={() => setMode("summary")}
                />{" "}
                Short Summary
              </label>
              <label>
                <input
                  type="radio"
                  name="mode"
                  value="notes"
                  checked={mode === "notes"}
                  onChange={() => setMode("notes")}
                />{" "}
                Bullet Notes
              </label>
              <label>
                <input
                  type="radio"
                  name="mode"
                  value="both"
                  checked={mode === "both"}
                  onChange={() => setMode("both")}
                />{" "}
                Both
              </label>
            </div>

            <button onClick={handleGenerate} disabled={loading} className="upload-btn">
              {loading ? "Generating..." : "Generate Summary/Notes"}
            </button>
{result && (
  <div className="output-box">
    <h4>📜 Generated Output:</h4>
    <pre>{result}</pre>

    {downloadUrl && (
      <a
        href={`http://localhost:5000${downloadUrl}`}
        download
        className="download-btn"
      >
        ⬇️ Download Notes
      </a>
    )}
  </div>
)}


            <button onClick={handleRestart} className="restart-btn">
              🔁 Restart
            </button>
          </div>
        )}
      </div>
    </>
  );
}*/

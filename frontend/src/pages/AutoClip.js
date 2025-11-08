//claude's design
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

function AutoClip() {
  const [topic, setTopic] = useState("");
  const [numVideos, setNumVideos] = useState(0);
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [outputUrl, setOutputUrl] = useState("");
  const [processMessage, setProcessMessage] = useState("");
  const [step, setStep] = useState(1); // 1: topic, 2: videos, 3: result

  useEffect(() => {
    let timer;
    if (processing) {
      setProcessMessage("Please wait, processing videos...");
      timer = setTimeout(() => {
        setProcessMessage("Almost done...");
      }, 5000);
    } else {
      setProcessMessage("");
    }
    return () => clearTimeout(timer);
  }, [processing]);

  const handleFileChange = (index, e) => {
    const updatedFiles = [...files];
    updatedFiles[index] = e.target.files[0];
    setFiles(updatedFiles);
    setError("");
    setOutputUrl("");
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
    if (!topic.trim() || files.filter(Boolean).length === 0) {
      setError("Please enter topic & upload videos.");
      return;
    }

    setProcessing(true);
    setError("");
    setOutputUrl("");

    try {
      const formData = new FormData();
      formData.append("topic", topic);
      files.forEach((f) => {
        if (f) formData.append("videos", f);
      });

      const res = await fetch("http://localhost:5000/api/autoclip/extract-and-merge", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success && data.output_url) {
        setOutputUrl(data.output_url);
        setStep(3);
      } else {
        setError(data.message || "No clips found for this topic!");
      }
    } catch (err) {
      setError("Error processing request.");
    } finally {
      setProcessing(false);
    }
  };

  const handleRestart = () => {
    setTopic("");
    setNumVideos(0);
    setFiles([]);
    setError("");
    setOutputUrl("");
    setStep(1);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
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
          }}>🎬</div>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            background: "linear-gradient(135deg, #f093fb, #f5576c)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            marginBottom: "12px"
          }}>
            AutoClip Video Summarizer
          </h1>
          <p style={{
            fontSize: "1.1rem",
            color: "#666",
            maxWidth: "700px",
            margin: "0 auto"
          }}>
            Extract and merge relevant clips from your videos based on any topic
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
              <div style={{ fontSize: "64px" }}>🎯</div>
              <h2 style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#333",
                margin: 0
              }}>
                What Topic to Extract?
              </h2>
            </div>

            <div style={{
              background: "linear-gradient(135deg, rgba(240, 147, 251, 0.08), rgba(245, 87, 108, 0.08))",
              borderRadius: "20px",
              padding: "40px",
              border: "2px solid rgba(240, 147, 251, 0.3)",
              marginBottom: "30px"
            }}>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Photosynthesis, Machine Learning, Web Development..."
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
                  e.target.style.borderColor = "#f093fb";
                  e.target.style.boxShadow = "0 0 0 4px rgba(240, 147, 251, 0.1)";
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
                background: "linear-gradient(135deg, #f093fb, #f5576c)",
                color: "#fff",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 10px 30px rgba(240, 147, 251, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "16px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 15px 40px rgba(240, 147, 251, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(240, 147, 251, 0.4)";
              }}
            >
              <span style={{ fontSize: "32px" }}>➡️</span>
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Video Upload */}
        {step === 2 && !outputUrl && (
          <div style={{
            background: "rgba(255, 255, 255, 0.98)",
            borderRadius: "24px",
            padding: "50px",
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)"
          }}>
            {/* Topic Display */}
            <div style={{
              background: "linear-gradient(135deg, rgba(240, 147, 251, 0.08), rgba(245, 87, 108, 0.08))",
              borderRadius: "16px",
              padding: "20px 30px",
              marginBottom: "40px",
              border: "2px solid rgba(240, 147, 251, 0.3)",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "1rem", color: "#666", marginBottom: "4px" }}>
                Topic:
              </div>
              <div style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                color: "#f5576c"
              }}>
                {topic}
              </div>
              <button
                onClick={() => setStep(1)}
                disabled={processing}
                style={{
                  marginTop: "12px",
                  padding: "8px 20px",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  border: "2px solid #f093fb",
                  borderRadius: "8px",
                  background: "#fff",
                  color: "#f093fb",
                  cursor: processing ? "not-allowed" : "pointer"
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
                  <div style={{ fontSize: "64px" }}>📹</div>
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
                  {[1, 2, 3, 4].map((n) => (
                    <button
                      key={n}
                      onClick={() => {
                        setNumVideos(n);
                        setFiles(new Array(n).fill(null));
                      }}
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
                        e.currentTarget.style.borderColor = "#f093fb";
                        e.currentTarget.style.boxShadow = "0 10px 30px rgba(240, 147, 251, 0.4)";
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
                    Upload {numVideos} Video{numVideos > 1 ? 's' : ''}
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
                        border: files[i] ? "3px solid #f093fb" : "3px dashed #ccc",
                        borderRadius: "20px",
                        background: files[i] 
                          ? "linear-gradient(135deg, rgba(240, 147, 251, 0.1), rgba(245, 87, 108, 0.1))" 
                          : "#fafafa",
                        cursor: processing ? "not-allowed" : "pointer",
                        transition: "all 0.3s ease",
                        minHeight: "220px"
                      }}
                      onMouseEnter={(e) => {
                        if (!processing) {
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
                        accept=".mp4"
                        onChange={(e) => handleFileChange(i, e)}
                        disabled={processing}
                        style={{ display: "none" }}
                      />
                      <div style={{ fontSize: "72px", marginBottom: "16px" }}>
                        {files[i] ? "✅" : "🎥"}
                      </div>
                      <div style={{
                        fontSize: "1.3rem",
                        fontWeight: "700",
                        color: files[i] ? "#f093fb" : "#666",
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
                        {files[i] ? files[i].name : "Click to upload MP4"}
                      </div>
                    </label>
                  ))}
                </div>

                {error && (
                  <div style={{
                    background: "#fee",
                    border: "2px solid #fcc",
                    borderRadius: "12px",
                    padding: "16px",
                    marginBottom: "20px",
                    color: "#c33",
                    fontSize: "1.1rem",
                    textAlign: "center",
                    fontWeight: "600"
                  }}>
                    ⚠️ {error}
                  </div>
                )}

                {processing && (
                  <div style={{
                    background: "linear-gradient(135deg, rgba(240, 147, 251, 0.1), rgba(245, 87, 108, 0.1))",
                    border: "2px solid rgba(240, 147, 251, 0.3)",
                    borderRadius: "16px",
                    padding: "30px",
                    marginBottom: "20px",
                    textAlign: "center"
                  }}>
                    <div style={{ fontSize: "64px", marginBottom: "16px" }}>⏳</div>
                    <p style={{
                      fontSize: "1.3rem",
                      fontWeight: "600",
                      color: "#f5576c",
                      margin: 0
                    }}>
                      {processMessage}
                    </p>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={processing || files.filter(Boolean).length === 0}
                  style={{
                    width: "100%",
                    padding: "24px",
                    fontSize: "1.5rem",
                    fontWeight: "700",
                    border: "none",
                    borderRadius: "16px",
                    background: processing || files.filter(Boolean).length === 0
                      ? "#ccc"
                      : "linear-gradient(135deg, #f093fb, #f5576c)",
                    color: "#fff",
                    cursor: processing || files.filter(Boolean).length === 0 ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 10px 30px rgba(240, 147, 251, 0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "16px"
                  }}
                  onMouseEnter={(e) => {
                    if (!processing && files.filter(Boolean).length > 0) {
                      e.currentTarget.style.transform = "translateY(-3px)";
                      e.currentTarget.style.boxShadow = "0 15px 40px rgba(240, 147, 251, 0.5)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 10px 30px rgba(240, 147, 251, 0.4)";
                  }}
                >
                  {processing ? (
                    <>
                      <span style={{ fontSize: "32px", animation: "spin 2s linear infinite" }}>🔄</span>
                      Processing...
                    </>
                  ) : (
                    <>
                      <span style={{ fontSize: "32px" }}>✂️</span>
                      Extract & Merge Clips
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        )}

        {/* Step 3: Result */}
        {step === 3 && outputUrl && (
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
              <div style={{ fontSize: "80px" }}>🎉</div>
              <h2 style={{
                fontSize: "2.2rem",
                fontWeight: "800",
                background: "linear-gradient(135deg, #f093fb, #f5576c)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                margin: 0
              }}>
                Video Ready!
              </h2>
            </div>

            <div style={{
              background: "linear-gradient(135deg, rgba(240, 147, 251, 0.15), rgba(245, 87, 108, 0.15))",
              borderRadius: "20px",
              padding: "40px",
              border: "3px solid #f093fb",
              marginBottom: "30px",
              textAlign: "center"
            }}>
              <div style={{
                fontSize: "1rem",
                color: "#666",
                marginBottom: "20px"
              }}>
                Successfully extracted and merged clips about: <strong>{topic}</strong>
              </div>
              <div style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                marginBottom: "30px"
              }}>
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>📹</div>
                <p style={{
                  fontSize: "1.2rem",
                  fontWeight: "600",
                  color: "#666",
                  margin: 0
                }}>
                  Your merged video is ready for download!
                </p>
              </div>

              <a
                href={`http://localhost:5000${outputUrl}`}
                download="final_video.mp4"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px",
                  padding: "20px 40px",
                  fontSize: "1.4rem",
                  fontWeight: "700",
                  background: "linear-gradient(135deg, #10b981, #059669)",
                  color: "#fff",
                  borderRadius: "16px",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  boxShadow: "0 8px 24px rgba(16, 185, 129, 0.3)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 12px 32px rgba(16, 185, 129, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 24px rgba(16, 185, 129, 0.3)";
                }}
              >
                <span style={{ fontSize: "28px" }}>⬇️</span>
                Download Video
              </a>
            </div>

            <button
              onClick={handleRestart}
              style={{
                width: "100%",
                padding: "20px",
                fontSize: "1.3rem",
                fontWeight: "600",
                border: "2px solid #f093fb",
                borderRadius: "12px",
                background: "#fff",
                color: "#f093fb",
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "12px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, #f093fb, #f5576c)";
                e.currentTarget.style.color = "#fff";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 8px 24px rgba(240, 147, 251, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = "#f093fb";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span style={{ fontSize: "24px" }}>🔁</span>
              Create Another Video
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

export default AutoClip;


//working perfectly
/*import React, { useState, useEffect } from "react";
import Navbar  from "../components/Navbar";
function AutoClip() {
  const [topic, setTopic] = useState("");
  const [numVideos, setNumVideos] = useState(1);
  const [files, setFiles] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [outputUrl, setOutputUrl] = useState("");
  const [processMessage, setProcessMessage] = useState("");

  useEffect(() => {
    let timer;
    if (processing) {
      setProcessMessage("Please wait, processing videos...");
      timer = setTimeout(() => {
        setProcessMessage("Almost done...");
      }, 5000);
    } else {
      setProcessMessage("");
    }
    return () => clearTimeout(timer);
  }, [processing]);

  const handleFileChange = (index, e) => {
    const updatedFiles = [...files];
    updatedFiles[index] = e.target.files[0];
    setFiles(updatedFiles);
    setError("");
    setOutputUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!topic.trim() || files.filter(Boolean).length === 0) {
      setError("Please enter topic & upload videos.");
      return;
    }

    setProcessing(true);
    setError("");
    setOutputUrl("");

    try {
      const formData = new FormData();
      formData.append("topic", topic);
      files.forEach((f) => {
        if (f) formData.append("videos", f);
      });

      const res = await fetch("http://localhost:5000/api/autoclip/extract-and-merge", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (data.success && data.output_url) {
        setOutputUrl(data.output_url);
      } else {
        setError(data.message || "No clips found for this topic!");
      }
    } catch (err) {
      setError("Error processing request.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
    <Navbar/>
    <div style={styles.container}>
      <h2 style={styles.title}>🎬 AutoClip Video Summarizer</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
      
        <label style={styles.label}>
          Enter Topic:
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Photosynthesis"
            style={styles.input}
            disabled={processing}
          />
        </label>

      
        <label style={styles.label}>
          Number of Videos:
          <select
            value={numVideos}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setNumVideos(val);
              setFiles(new Array(val).fill(null));
            }}
            style={styles.input}
            disabled={processing}
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>

     
        {Array.from({ length: numVideos }).map((_, index) => (
          <label key={index} style={styles.label}>
            Upload Video {index + 1}:
            <input
              type="file"
              accept=".mp4"
              onChange={(e) => handleFileChange(index, e)}
              style={styles.input}
              disabled={processing}
            />
          </label>
        ))}

        <button type="submit" disabled={processing} style={styles.button}>
          {processing ? "Processing..." : "Extract & Merge"}
        </button>
      </form>

      {processMessage && <div>{processMessage}</div>}
      {error && <div style={styles.error}>{error}</div>}
      {outputUrl && (
        <div style={styles.outputContainer}>
          <p>✅ Output Ready:</p>
          <a href={`http://localhost:5000${outputUrl}`} download="final_video.mp4">
            <button style={styles.downloadButton}>Download Video</button>
          </a>
        </div>
      )}
    </div>
    </>
  );
}

const styles = {
  container: {
    maxWidth: 520,
    margin: "40px auto",
    padding: 32,
    background: "linear-gradient(135deg, #3d235dff, #c3cfe2)",
    borderRadius: 16,
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: { textAlign: "center", marginBottom: 28 },
  form: { display: "flex", flexDirection: "column" },
  label: { fontWeight: 600, marginBottom: 10 },
  input: {
    width: "100%",
    padding: 10,
    marginTop: 6,
    borderRadius: 8,
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#2c5aed",
    color: "white",
    padding: 12,
    borderRadius: 10,
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },
  error: { color: "red", textAlign: "center", marginTop: 20 },
  outputContainer: { textAlign: "center", marginTop: 20 },
  downloadButton: {
    backgroundColor: "#19be6b",
    color: "white",
    padding: "12px 32px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
  },
};

export default AutoClip;
*/
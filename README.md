# 📘 VideoHub: All-in-One Personalized Digital Learning Experience

VideoHub is a full-stack AI-powered platform engineered to transform digital learning by offering intelligent video analysis, summarization, and content extraction tools.
Designed for students, educators, and content creators, VideoHub automates video understanding and provides personalized learning experiences from raw multimedia content.

---

# 🌟 Key Features

The platform integrates **four powerful AI services**, all accessible through a unified React-based interface.

---

## 1️⃣ Video Q&A Chatbot (AnswerBot)

* Upload one or multiple videos and ask natural language questions.
* Powered by a **RAG (Retrieval-Augmented Generation)** architecture.
* Automatically:

  * Transcribes uploaded videos.
  * Embeds video text into **Qdrant** vector DB.
  * Retrieves context and generates answers via **Groq LLM**.

---

## 2️⃣ Smart Summarizer & Notes Generator

* Input multiple videos and generate:

  * **Concise Summary** (3–5 lines)
  * **Detailed Notes** (bullet points)
  * **Both**, in a single request.
* Uses **Groq Llama-3.1-8B-Instant** model for high-speed text generation.

---

## 3️⃣ Best Choice Video Analyzer

* Compares videos on a user-specified topic.
* Automatically ranks them using a weighted scoring system:

  * 🎤 Delivery
  * 🎬 Visual Quality
  * 🧠 Content Relevance (semantic similarity)
  * 🎧 Audio Quality
* Only videos **≥ 30 seconds** are considered valid.

---

## 4️⃣ AI Topic Merger (AutoClip)

* Upload multiple videos and specify any topic.
* System automatically:

  * Transcribes all videos using **Faster-Whisper**
  * Detects relevant segments where the topic appears
  * Cuts & merges them into a seamless final clip using **MoviePy**
* Ideal for generating *topic-specific study compilations*.

---

# 📁 Directory Structure

```
VideoHub-All-in-One-Personalized-Digital-Learning-Experience/
├── README.md
├── backend/
│   ├── app.py                      # Main Flask API server
│   ├── users.json                  # Temporary JSON user store
│   ├── Requirements.txt            # Backend dependencies
│   ├── answerbot/
│   │   └── rag_engine.py
│   ├── autoclip/
│   │   ├── handler.py
│   │   └── utils.py
│   ├── bestchoice/
│   │   ├── handler.py
│   │   └── video_analysis.py
│   └── smart_summarizer/
│       └── summarizer.py
└── frontend/
    ├── public/
    │   └── index.html
    └── src/
        ├── components/
        │   ├── Navbar.js
        │   └── ProfileMenu.js
        └── pages/
            ├── AnswerBot.js
            ├── AutoClip.js
            ├── BestChoice.js
            ├── Home.js
            ├── Login.js
            ├── Services.js
            └── Summarizer.js
```

---

# 🛠 Technology Stack

## 🔹 Backend (Flask + Python)

| Category             | Technology              | Purpose                           |
| -------------------- | ----------------------- | --------------------------------- |
| **Framework**        | Flask                   | REST APIs & routing               |
| **Transcription**    | Faster-Whisper, Whisper | Fast multilingual ASR             |
| **LLM**              | Groq                    | RAG responses & summarization     |
| **Vector DB**        | Qdrant                  | Semantic search for AnswerBot     |
| **Video Processing** | MoviePy, OpenCV         | Cutting, merging, quality scoring |
| **Embeddings**       | Sentence-Transformers   | Semantic similarity computation   |

---

# ⚙️ Installation & Setup

## 1. Prerequisites

* Python 3.x
* Node.js + npm/yarn
* **FFmpeg** installed on system (required for MoviePy)

---

## 2. Backend Setup

```bash
cd backend
pip install -r Requirements.txt
python app.py
```

Runs on: **[http://0.0.0.0:5000](http://0.0.0.0:5000)**

---

## 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

Runs on: **[http://localhost:3000](http://localhost:3000)**

---

# 🔐 Authentication

The system uses **token-based authentication**.

* Register
* Login 
---

# 🔑 Required Environment Variables

| Variable         | Service  | Description                         |
| ---------------- | -------- | ----------------------------------- |
| `GROQ_API_KEY`   | Groq LLM | Required for AnswerBot & Summarizer |
| `QDRANT_URL`     | Qdrant   | Vector DB endpoint                  |
| `QDRANT_API_KEY` | Qdrant   | For secure access                   |

---




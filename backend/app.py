from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os, json, secrets, threading
from functools import wraps
from groq import Groq
import uuid
from autoclip.handler import autoclip_bp


# =========================================================
#                   BASIC AUTH SETUP
# =========================================================
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
USERS_FILE = os.path.join(BASE_DIR, "users.json")

app = Flask(__name__, static_folder=None)
CORS(app, supports_credentials=True)
# Register AutoClip blueprint
app.register_blueprint(autoclip_bp, url_prefix="/api/autoclip")
# Create users.json if missing
if not os.path.exists(USERS_FILE):
    with open(USERS_FILE, "w") as f:
        json.dump({"users": [], "sessions": {}}, f)

# =========================================================
#            FAST JSON DATABASE (CACHED IN MEMORY)
# =========================================================
_db_cache = None
_db_path = USERS_FILE

def read_db():
    global _db_cache
    if _db_cache is None:
        with open(_db_path, "r") as f:
            _db_cache = json.load(f)
    return _db_cache

def write_db(data):
    global _db_cache
    _db_cache = data
    def _write_async():
        with open(_db_path, "w") as f:
            json.dump(data, f, indent=2)
    threading.Thread(target=_write_async, daemon=True).start()

# =========================================================
#               AUTHENTICATION HELPERS
# =========================================================
def auth_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        auth = request.headers.get("Authorization", None)
        if not auth or not auth.startswith("Bearer "):
            return jsonify({"error": "Unauthorized"}), 401
        token = auth.split(" ", 1)[1]
        db = read_db()
        sessions = db.get("sessions", {})
        user_email = sessions.get(token)
        if not user_email:
            return jsonify({"error": "Invalid or expired token"}), 401
        user = next((u for u in db["users"] if u["email"] == user_email), None)
        if not user:
            return jsonify({"error": "User not found"}), 401
        request.user = user
        return fn(*args, **kwargs)
    return wrapper

# =========================================================
#                   AUTH ROUTES
# =========================================================
@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json() or {}
    username = data.get("username", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    if not username or not email or not password:
        return jsonify({"error": "username, email and password required"}), 400
    db = read_db()
    if any(u["email"] == email for u in db["users"]):
        return jsonify({"error": "Email already registered"}), 400
    user = {"username": username, "email": email, "password": password}
    db["users"].append(user)
    write_db(db)
    return jsonify({"message": "User registered"}), 201


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json() or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    db = read_db()
    user = next((u for u in db["users"] if u["email"] == email and u["password"] == password), None)
    if not user:
        return jsonify({"error": "Invalid credentials"}), 401
    token = secrets.token_hex(32)
    db["sessions"][token] = user["email"]
    write_db(db)
    return jsonify({"token": token, "user": {"username": user["username"], "email": user["email"]}}), 200


@app.route("/api/profile", methods=["GET"])
@auth_required
def profile():
    return jsonify({"username": request.user["username"], "email": request.user["email"]})


@app.route("/api/logout", methods=["POST"])
@auth_required
def logout():
    auth = request.headers.get("Authorization")
    token = auth.split(" ", 1)[1]
    db = read_db()
    db["sessions"].pop(token, None)
    write_db(db)
    return jsonify({"message": "Logged out"}), 200


# =========================================================
#                ANSWERBOT INTEGRATION
# =========================================================
from answerbot.rag_engine import clear_collection, store_text_files_in_qdrant, search_context, ask_groq

DATA_DIR = os.path.join(BASE_DIR, "answerbot/data/docs")
VIDEO_DIR = os.path.join(BASE_DIR, "answerbot/input_videos")
os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(VIDEO_DIR, exist_ok=True)

system_ready = False
whisper_model = None

def get_whisper():
    global whisper_model
    if whisper_model is None:
        print("🎧 Loading Whisper model on first use...")
        from faster_whisper import WhisperModel
        whisper_model = WhisperModel("base", device="cpu")
    return whisper_model

def transcribe_audio(video_path, output_folder=DATA_DIR):
    model = get_whisper()
    segments, _ = model.transcribe(video_path)
    text = " ".join([seg.text for seg in segments])
    name = os.path.basename(video_path).rsplit(".", 1)[0] + ".txt"
    os.makedirs(output_folder, exist_ok=True)
    out_path = os.path.join(output_folder, name)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(text.strip())
    return out_path


@app.route("/api/answerbot/upload", methods=["POST"])
def answerbot_upload():
    global system_ready
    files = request.files.getlist("videos")
    if not files:
        return jsonify({"error": "No videos uploaded"}), 400
     # ✅ Clean previous data
    for folder in [DATA_DIR, VIDEO_DIR]:
        for f in os.listdir(folder):
            path = os.path.join(folder, f)
            if os.path.isfile(path):
                try:
                    os.remove(path)
                except Exception:
                    pass
    saved = []
    for file in files:
        path = os.path.join(VIDEO_DIR, file.filename)
        file.save(path)
        print(f"✅ Saved video: {file.filename}")
        transcribe_audio(path)
        saved.append(file.filename)

    print("📦 Rebuilding Qdrant collection...")
    clear_collection()
    store_text_files_in_qdrant(DATA_DIR)
    system_ready = True
    return jsonify({"message": "Upload, transcription & indexing done.", "files": saved})


@app.route("/api/answerbot/ask", methods=["POST"])
def answerbot_ask():
    global system_ready
    if not system_ready:
        return jsonify({"error": "System not ready. Upload videos first."}), 400

    data = request.get_json() or {}
    question = data.get("question", "")
    if not question:
        return jsonify({"error": "Question missing"}), 400

    print(f"🔎 User asked: {question}")
    context = search_context(question)
    answer = ask_groq(question, context)
    return jsonify({"answer": answer})


# =========================================================
#                BESTCHOICE (Project1) INTEGRATION
# =========================================================
from bestchoice.video_analysis import (
    analyze_visual,
    analyze_audio_delivery,
    analyze_content,
    get_duration,
)

BEST_INPUT = os.path.join(BASE_DIR, "bestchoice/input_videos")
BEST_OUTPUT = os.path.join(BASE_DIR, "bestchoice/output")
os.makedirs(BEST_INPUT, exist_ok=True)
os.makedirs(BEST_OUTPUT, exist_ok=True)

TIE_THRESHOLD = 0.05
MIN_DURATION = 30
AVG_COVERAGE_WORDS = 250

def compute_quality_score(delivery, visual, content, audio):
    return 0.25*delivery + 0.20*visual + 0.25*content + 0.15*audio

@app.route("/api/best-choice/upload", methods=["POST"])
def bestchoice_upload():
    topic = request.form.get("topic", "").strip()
    files = request.files.getlist("videos")

    if not topic or not files:
        return jsonify({"error": "Topic and videos are required"}), 400
    
     # ✅ Clean previous data
    for folder in [BEST_INPUT, BEST_OUTPUT]:
        for f in os.listdir(folder):
            path = os.path.join(folder, f)
            if os.path.isfile(path):
                try:
                    os.remove(path)
                except Exception:
                    pass
    saved_paths = []
    for f in files:
        path = os.path.join(BEST_INPUT, f.filename)
        f.save(path)
        saved_paths.append(path)

    results = []
    for v in saved_paths:
        print(f"🎥 Analyzing {v}...")
        visual_score = analyze_visual(v)
        audio_score, delivery_score = analyze_audio_delivery(v)
        transcript = analyze_content(v, topic, return_transcript=True)
        content_score = transcript['score']
        transcript_text = transcript['text']
        duration = get_duration(v)

        word_count = len(transcript_text.split())
        coverage_factor = min(1.0, word_count / AVG_COVERAGE_WORDS)
        adjusted_content_score = content_score * coverage_factor

        quality_score = compute_quality_score(delivery_score, visual_score, adjusted_content_score, audio_score)

        if duration < MIN_DURATION:
            continue

        results.append({
            'video': os.path.basename(v),
            'quality_score': quality_score,
            'duration': duration,
        })

    if not results:
        return jsonify({"error": "No valid videos found"}), 400

    results.sort(key=lambda x: x['quality_score'], reverse=True)
    top_score = results[0]['quality_score']
    top_videos = [v for v in results if (top_score - v['quality_score']) <= TIE_THRESHOLD]

    if len(top_videos) > 1:
        best_video = min(top_videos, key=lambda x: x['duration'])['video']
    else:
        best_video = top_videos[0]['video']

    return jsonify({
        "best_video": best_video,
        "results": results
    })
# =========================================================
#               SMART SUMMARIZER INTEGRATION
# =========================================================
from smart_summarizer.summarizer import generate_summary

SMART_SUMM_DATA = os.path.join(BASE_DIR, "smart_summarizer/data/docs")
SMART_SUMM_VIDEO = os.path.join(BASE_DIR, "smart_summarizer/input_videos")
os.makedirs(SMART_SUMM_DATA, exist_ok=True)
os.makedirs(SMART_SUMM_VIDEO, exist_ok=True)

@app.route("/api/summarizer/upload", methods=["POST"])
def summarizer_upload():
    files = request.files.getlist("videos")
    if not files:
        return jsonify({"error": "No videos uploaded"}), 400
    # ✅ Clean previous data
    for folder in [SMART_SUMM_DATA, SMART_SUMM_VIDEO, os.path.join(BASE_DIR, "smart_summarizer/output")]:
        for f in os.listdir(folder):
            path = os.path.join(folder, f)
            if os.path.isfile(path):
                try:
                    os.remove(path)
                except Exception:
                    pass
    saved = []
    for file in files:
        path = os.path.join(SMART_SUMM_VIDEO, file.filename)
        file.save(path)
        print(f"✅ Saved video: {file.filename}")
        transcribe_audio(path, SMART_SUMM_DATA)
        saved.append(file.filename)

    return jsonify({"message": "Videos uploaded and transcribed.", "files": saved}), 200


@app.route("/api/summarizer/generate", methods=["POST"])
def summarizer_generate():
    data = request.get_json() or {}
    mode = data.get("mode", "both")  # summary | notes | both

    txt_files = [f for f in os.listdir(SMART_SUMM_DATA) if f.endswith(".txt")]
    if not txt_files:
        return jsonify({"error": "No transcribed text found. Upload videos first."}), 400

    combined_text = os.path.join(SMART_SUMM_DATA, "combined.txt")
    with open(combined_text, "w", encoding="utf-8") as combined:
        for f in txt_files:
            with open(os.path.join(SMART_SUMM_DATA, f), "r", encoding="utf-8") as infile:
                combined.write(infile.read() + "\n\n")

    print(f"🧾 Generating summary/notes in mode: {mode}")
    result, out_file = generate_summary(combined_text, mode)
    # ✅ Return both text and download URL
    filename = os.path.basename(out_file)
    return jsonify({
        "message": "Summary generated successfully.",
        "result": result,
        "download_url": f"/api/summarizer/download/{filename}"
    }), 200
    # ✅ NEW ROUTE: allow downloading generated notes
@app.route("/api/summarizer/download/<filename>", methods=["GET"])
def summarizer_download(filename):
    from flask import send_from_directory
    try:
        return send_from_directory(
            os.path.join(BASE_DIR, "smart_summarizer/output"),
            filename,
            as_attachment=True
        )
    except FileNotFoundError:
        return jsonify({"error": "File not found."}), 404
    
    

# =========================================================
#              SERVICE PLACEHOLDERS (HTML)
# =========================================================
SERVICES_DIR = os.path.join(BASE_DIR, "services")
os.makedirs(SERVICES_DIR, exist_ok=True)

def make_service_html(name, desc):
    return f"""
    <!doctype html>
    <html>
    <head><meta charset='utf-8'><title>{name}</title></head>
    <body style='font-family:Arial,Helvetica,sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;'>
      <div style='text-align:center;'>
        <h1>{name}</h1>
        <p>{desc}</p>
      </div>
    </body>
    </html>
    """

@app.route("/services/best-choice")
def svc_best_choice():
    folder = os.path.join(SERVICES_DIR, "best_choice_build")
    index_path = os.path.join(folder, "index.html")
    if os.path.exists(index_path):
        return send_from_directory(folder, "index.html")
    return make_service_html("BestChoice", "AI-powered video evaluator for choosing the best video.")

@app.route("/services/answer-bot")
def svc_answer_bot():
    folder = os.path.join(SERVICES_DIR, "answer_bot_build")
    index_path = os.path.join(folder, "index.html")
    if os.path.exists(index_path):
        return send_from_directory(folder, "index.html")
    return make_service_html("AnswerBot", "Ask questions from your videos — automatically answered.")


# =========================================================
#                   HEALTH CHECK
# =========================================================
@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})


# =========================================================
#                   ENTRY POINT
# =========================================================
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=False, threaded=True)


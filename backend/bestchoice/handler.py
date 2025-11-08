from flask import Blueprint, request, jsonify
import os
from .video_analysis import analyze_visual, analyze_audio_delivery, analyze_content, get_duration

bp = Blueprint("bestchoice", __name__)

INPUT_DIR = os.path.join(os.path.dirname(__file__), "input_videos")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")

TIE_THRESHOLD = 0.05
MIN_DURATION = 30
AVG_COVERAGE_WORDS = 250


def compute_quality_score(delivery, visual, content, audio):
    return 0.25 * delivery + 0.20 * visual + 0.25 * content + 0.15 * audio


@bp.route("/api/best-choice/upload", methods=["POST"])
def upload_videos():
    topic = request.form.get("topic", "").strip()
    files = request.files.getlist("videos")

    if not topic or not files:
        return jsonify({"error": "Topic and videos are required"}), 400

    os.makedirs(INPUT_DIR, exist_ok=True)
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    saved_paths = []
    for f in files:
        path = os.path.join(INPUT_DIR, f.filename)
        f.save(path)
        saved_paths.append(path)

    results = []
    for v in saved_paths:
        print(f"\nAnalyzing {v}...")

        visual_score = analyze_visual(v)
        audio_score, delivery_score = analyze_audio_delivery(v)
        transcript = analyze_content(v, topic, return_transcript=True)
        content_score = transcript["score"]
        transcript_text = transcript["text"]
        duration = get_duration(v)

        word_count = len(transcript_text.split())
        coverage_factor = min(1.0, word_count / AVG_COVERAGE_WORDS)
        adjusted_content_score = content_score * coverage_factor

        quality_score = compute_quality_score(
            delivery_score, visual_score, adjusted_content_score, audio_score
        )

        if duration < MIN_DURATION:
            continue

        results.append(
            {
                "video": os.path.basename(v),
                "quality_score": quality_score,
                "duration": duration,
            }
        )

    if not results:
        return jsonify({"error": "No valid videos found"}), 400

    results.sort(key=lambda x: x["quality_score"], reverse=True)
    top_score = results[0]["quality_score"]
    top_videos = [v for v in results if (top_score - v["quality_score"]) <= TIE_THRESHOLD]

    if len(top_videos) > 1:
        best_video = min(top_videos, key=lambda x: x["duration"])["video"]
    else:
        best_video = top_videos[0]["video"]

    return jsonify({"best_video": best_video, "results": results})

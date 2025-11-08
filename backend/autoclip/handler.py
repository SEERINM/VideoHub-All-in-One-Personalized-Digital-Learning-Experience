from flask import Blueprint, request, jsonify, send_from_directory
import os
from autoclip.utils import transcribe_audio, extract_topic_segments, merge_clips

autoclip_bp = Blueprint("autoclip_bp", __name__)

BASE_DIR = os.path.join(os.path.dirname(__file__))  # safer path

for folder in ["input_videos", "extracted_clips", "final_output", "transcripts"]:
    os.makedirs(os.path.join(BASE_DIR, folder), exist_ok=True)


# ✅ NOTE: endpoints are now relative to /api/autoclip
@autoclip_bp.route("/extract-and-merge", methods=["POST"])
def extract_and_merge():
    topic = request.form.get("topic", "").strip()
    video_files = request.files.getlist("videos")

    if not topic or len(video_files) == 0:
        return jsonify({"success": False, "message": "Missing topic or videos"}), 400

    # Clean previous data
    for folder in ["input_videos", "extracted_clips", "final_output", "transcripts"]:
        folder_path = os.path.join(BASE_DIR, folder)
        for f in os.listdir(folder_path):
            path = os.path.join(folder_path, f)
            if os.path.isfile(path):
                try:
                    os.remove(path)
                except Exception:
                    pass

    for vid in video_files:
        filename = vid.filename
        vid.save(os.path.join(BASE_DIR, "input_videos", filename))

    all_clips = []
    video_files = [f for f in os.listdir(os.path.join(BASE_DIR, "input_videos")) if f.endswith(".mp4")]

    for video in video_files:
        transcript = transcribe_audio(os.path.join(BASE_DIR, "input_videos", video))
        clips = extract_topic_segments(transcript, topic, os.path.join(BASE_DIR, "input_videos", video))
        all_clips.extend(clips)

    if not all_clips:
        return jsonify({"success": False, "message": "No clips found for this topic!"}), 200

    output_file = "final_video.mp4"
    output_path = os.path.join(BASE_DIR, "final_output", output_file)
    merge_clips(all_clips, output_path)

    return jsonify({
        "success": True,
        "output_url": f"/api/autoclip/download/{output_file}"
    }), 200


@autoclip_bp.route("/download/<path:filename>", methods=["GET"])
def download_merged(filename):
    return send_from_directory(os.path.join(BASE_DIR, "final_output"), filename, as_attachment=True)

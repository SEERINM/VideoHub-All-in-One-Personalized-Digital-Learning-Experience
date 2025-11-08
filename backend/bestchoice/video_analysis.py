import cv2
import numpy as np
import moviepy.editor as mp
import os
from pydub import AudioSegment
import whisper
from sentence_transformers import SentenceTransformer, util
import torch

# Initialize models once
whisper_model = whisper.load_model("small")  # Change to "base" if preferred
embedder = SentenceTransformer("all-MiniLM-L6-v2")

# Utility functions
def normalize(value, min_val, max_val):
    return (value - min_val) / (max_val - min_val + 1e-9)
def compute_final_score(delivery, visual, content, duration, audio):
    weighted = (
        0.25 * delivery +
        0.2 * visual +
        0.25 * content +
        0.15 * audio
    )
    # duration weighting (shorter is better)
    time_factor = 1 / (1 + (duration / 600))
    return round(weighted * time_factor, 3)

def analyze_visual(video_path):
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        return 0.5  # fallback if unreadable

    frame_count = 0
    motion_score = []
    text_frames = 0

    prev_gray = None
    while True:
        ret, frame = cap.read()
        if not ret:
            break

        frame_count += 1
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # motion detection via frame diff
        if prev_gray is not None:
            diff = cv2.absdiff(gray, prev_gray)
            motion_score.append(np.mean(diff))
        prev_gray = gray

        # text/slide detection (edges and contours)
        edges = cv2.Canny(gray, 100, 200)
        contours, _ = cv2.findContours(edges, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        if len(contours) > 200:
            text_frames += 1

    cap.release()

    motion_avg = np.mean(motion_score) if motion_score else 0
    motion_norm = min(motion_avg / 20, 1.0)
    slide_ratio = text_frames / max(frame_count, 1)

    # combine both
    visual_quality = 0.6 * slide_ratio + 0.4 * motion_norm
    return round(visual_quality, 3)

def analyze_audio_delivery(video_path):
    temp_audio = "temp_audio.wav"
    try:
        clip = mp.VideoFileClip(video_path)
        clip.audio.write_audiofile(temp_audio, logger=None)
    except Exception:
        return 0.5, 0.5

    audio = AudioSegment.from_file(temp_audio)
    os.remove(temp_audio)

    samples = np.array(audio.get_array_of_samples()).astype(np.float32)
    samples = samples / (np.max(np.abs(samples)) + 1e-9)

    # audio clarity = inverse of noise level
    rms = np.sqrt(np.mean(samples ** 2))
    clarity_score = min(max(rms * 2, 0), 1)

    # delivery (variation in amplitude = expressiveness)
    window = 1000
    energy = [np.mean(np.abs(samples[i:i+window])) for i in range(0, len(samples), window)]
    variance = np.var(energy)
    delivery_score = min(variance * 10, 1)

    return round(clarity_score, 3), round(delivery_score, 3)

def analyze_content(video_path, topic, return_transcript=False):
    """
    Analyze the content of a video:
    - Compute semantic similarity between video transcript and topic
    - Optionally return the transcript for coverage calculation
    """
    try:
        result = whisper_model.transcribe(video_path, fp16=False)
        transcript = result['text']
    except Exception as e:
        print(f"⚠️  Warning: Failed to transcribe {video_path}, using fallback. Error: {e}")
        transcript = ""
    
    # Compute semantic similarity
    try:
        topic_emb = embedder.encode(topic, convert_to_tensor=True)
        text_emb = embedder.encode(transcript, convert_to_tensor=True)
        sim = util.cos_sim(topic_emb, text_emb).item()
        sim = round(sim, 3)
    except Exception as e:
        print(f"⚠️  Warning: Failed to compute embedding similarity for {video_path}, using fallback. Error: {e}")
        sim = 0.5  # fallback similarity

    if return_transcript:
        return {'score': sim, 'text': transcript}
    
    return sim

def get_duration(video_path):
    try:
        clip = mp.VideoFileClip(video_path)
        return clip.duration
    except Exception:
        return 0

# Example usage (uncomment to use)
# video_file = "example.mp4"
# print(analyze_visual(video_file))
# print(analyze_audio_delivery(video_file))
# print(analyze_content(video_file, "machine learning", True))
# print(get_duration(video_file))

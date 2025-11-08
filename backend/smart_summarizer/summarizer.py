# =========================================================
# SMART SUMMARIZER & NOTES GENERATOR (Service 5)
# =========================================================
import os
from groq import Groq
import uuid

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data", "docs")
OUTPUT_DIR = os.path.join(BASE_DIR, "output")
os.makedirs(DATA_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

client = Groq(api_key=os.getenv("GROQ_API_KEY", ""))  # set your key in environment variable

def generate_summary(file_path, mode="both"):
    """
    mode = "summary" | "notes" | "both"
    """
    with open(file_path, "r", encoding="utf-8") as f:
        file_content = f.read()

    system_prompt = "You are an expert summarizer and note generator."

    if mode == "summary":
        user_prompt = f"Generate a short summary (3-5 lines) of the following content:\n\n{file_content}"
    elif mode == "notes":
        user_prompt = f"Generate clear, bullet-point study notes for the following content:\n\n{file_content}"
    else:
        user_prompt = (
            f"Generate a short summary (3-5 lines) AND bullet-point study notes for the following content:\n\n{file_content}"
        )

    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.3,
        max_completion_tokens=1024,
        top_p=1,
        stream=False,
    )

    result = completion.choices[0].message.content
    file_id = uuid.uuid4().hex[:8]
    out_file = os.path.join(OUTPUT_DIR, f"notes_{file_id}.txt")
    with open(out_file, "w", encoding="utf-8") as f:
        f.write(result)

    print(f"✅ Saved summary to {out_file}")
    return result, out_file

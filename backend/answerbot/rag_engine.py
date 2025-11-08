import os
import uuid
from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient, models
from groq import Groq

# ===================== CONFIG =====================



QDRANT_URL = ''           # your Qdrant cloud URL
QDRANT_API_KEY = ""       # your Qdrant API key
GROQ_API_KEY = ""         # your Groq API key
COLLECTION_NAME = ""

# ==================================================

embed_model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

qdrant_client = QdrantClient(
    url=QDRANT_URL,
    api_key=QDRANT_API_KEY,
    timeout=120,
    prefer_grpc=False
)

groq_client = Groq(api_key=GROQ_API_KEY)

# --------------------------------------------------
# QDRANT HELPERS
# --------------------------------------------------

def create_collection(collection_name=COLLECTION_NAME, vector_size=384):
    """Create Qdrant collection if not exists."""
    try:
        qdrant_client.create_collection(
            collection_name=collection_name,
            vectors_config=models.VectorParams(size=vector_size, distance=models.Distance.COSINE),
            on_disk_payload=True
        )
        print(f"✅ Created collection: {collection_name}")
    except Exception as e:
        print(f"ℹ️ Collection might already exist or error: {e}")


def clear_collection():
    """Delete and recreate collection."""
    try:
        qdrant_client.delete_collection(collection_name=COLLECTION_NAME)
        print("🧹 Cleared existing collection.")
    except Exception:
        pass
    create_collection(COLLECTION_NAME)


def store_text_files_in_qdrant(folder_path="data/docs"):
    """Embed and store all .txt transcripts in Qdrant."""
    points = []
    for fname in os.listdir(folder_path):
        if not fname.endswith(".txt"):
            continue
        with open(os.path.join(folder_path, fname), "r", encoding="utf-8") as f:
            text = f.read().strip()
        if len(text) < 20:
            continue
        embedding = embed_model.encode(text)
        points.append(models.PointStruct(
            id=str(uuid.uuid4()),
            vector=embedding,
            payload={"text": text, "source": fname}
        ))
    if points:
        qdrant_client.upsert(collection_name=COLLECTION_NAME, points=points)
        print(f"✅ Stored {len(points)} transcripts in Qdrant.")
    else:
        print("⚠️ No valid text files found to store.")


# --------------------------------------------------
# QUERY FUNCTIONS
# --------------------------------------------------

def search_context(query: str, limit: int = 3):
    """Retrieve top-k similar docs from Qdrant."""
    query_vec = embed_model.encode(query)
    results = qdrant_client.query_points(
        collection_name=COLLECTION_NAME,
        query=query_vec,
        limit=limit,
        score_threshold=0.1
    )
    if not results.points:
        return "No relevant context found."
    return "\n".join([p.payload["text"] for p in results.points])


def ask_groq(query: str, context: str):
    """Generate an answer using Groq."""
    completion = groq_client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are a helpful assistant. Use only the provided context."},
            {"role": "user", "content": f"Question: {query}\n\nContext:\n{context}"}
        ],
        model="llama-3.3-70b-versatile"
    )
    return completion.choices[0].message.content.strip()

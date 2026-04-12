from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")


def generate_embeddings(chunks):
    embeddings = model.encode(chunks)
    return embeddings


def embed_query(query: str):
    return model.encode([query])[0]

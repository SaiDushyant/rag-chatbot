from google import genai
import os

# Initialize client
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


def generate_embeddings(chunks):
    response = client.models.embed_content(
        model="models/gemini-embedding-001", contents=chunks
    )

    return [e.values for e in response.embeddings]


def embed_query(query: str):
    response = client.models.embed_content(
        model="models/gemini-embedding-001", contents=query
    )

    return response.embeddings[0].values

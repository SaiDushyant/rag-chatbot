from dotenv import load_dotenv

load_dotenv()
from fastapi import FastAPI, Query
from contextlib import asynccontextmanager

from app.scraper import scrape_website
from app.chunker import chunk_text
from app.embeddings import generate_embeddings, embed_query
from app.vector_store import VectorStore
from app.llm import generate_answer


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting RAG backend...")

    app.state.vector_store = None

    yield

    print("Shutting down RAG backend...")


app = FastAPI(lifespan=lifespan)


@app.get("/")
def read_root():
    return {"message": "RAG Chatbot Backend Running"}


@app.get("/scrape")
def scrape(url: str = Query(...)):
    content = scrape_website(url)
    return {"url": url, "content_preview": content[:1000]}


@app.post("/process")
def process_url(url: str = Query(...)):
    text = scrape_website(url)
    chunks = chunk_text(text)

    embeddings = generate_embeddings(chunks)

    app.state.vector_store = VectorStore(dim=len(embeddings[0]))
    app.state.vector_store.add(embeddings, chunks)

    return {"message": "URL processed successfully", "chunks": len(chunks)}


@app.get("/retrieve")
def retrieve(query: str):
    vector_store = app.state.vector_store

    if vector_store is None:
        return {"error": "No data processed yet"}

    query_embedding = embed_query(query)
    results = vector_store.search(query_embedding, k=5)

    return {"query": query, "results": results}


@app.get("/ask")
def ask(query: str):
    vector_store = app.state.vector_store

    if vector_store is None:
        return {"error": "No data processed yet"}

    query_embedding = embed_query(query)
    retrieved_chunks = vector_store.search(query_embedding, k=5)

    context = "\n".join(retrieved_chunks)

    prompt = f"""
You are a helpful assistant.

Answer ONLY from the context.
If answer is not in context, say "I don't know".

Context:
{context}

Question:
{query}

Answer:
"""

    answer = generate_answer(prompt)

    return {"question": query, "answer": answer, "sources": retrieved_chunks}

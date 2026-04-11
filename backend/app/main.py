from fastapi import FastAPI, Query
from app.scraper import scrape_website
from app.chunker import chunk_text
from app.embeddings import generate_embeddings
from app.vector_store import VectorStore

app = FastAPI()

vector_store = None


@app.get("/")
def read_root():
    return {"message": "RAG Chatbot Backend Running"}


@app.get("/scrape")
def scrape(url: str = Query(...)):
    content = scrape_website(url)
    return {"url": url, "content_preview": content[:1000]}


@app.post("/process")
def process_url(url: str = Query(...)):
    global vector_store

    text = scrape_website(url)
    chunks = chunk_text(text)

    embeddings = generate_embeddings(chunks)

    vector_store = VectorStore(dim=len(embeddings[0]))
    vector_store.add(embeddings, chunks)

    return {"message": "URL processed successfully", "chunks": len(chunks)}

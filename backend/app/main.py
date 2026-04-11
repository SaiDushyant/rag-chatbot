from fastapi import FastAPI, Query
from app.scraper import scrape_website

app = FastAPI()


@app.get("/")
def read_root():
    return {"message": "RAG Chatbot Backend Running"}


@app.get("/scrape")
def scrape(url: str = Query(...)):
    content = scrape_website(url)
    return {"url": url, "content_preview": content[:1000]}

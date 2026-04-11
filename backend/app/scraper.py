import requests
from bs4 import BeautifulSoup
from app.utils import clean_text


def scrape_website(url: str) -> str:
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
    except Exception as e:
        return f"Error fetching URL: {e}"

    soup = BeautifulSoup(response.text, "html.parser")

    # Remove unwanted tags
    for tag in soup(["script", "style", "noscript"]):
        tag.decompose()

    # Extract text
    text = soup.get_text(separator=" ")
    cleaned_text = clean_text(text)

    return cleaned_text

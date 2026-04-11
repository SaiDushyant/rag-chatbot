import re


def clean_text(text: str) -> str:
    # Remove extra whitespace
    text = re.sub(r"\s+", " ", text)

    # Remove weird characters (optional basic cleanup)
    text = re.sub(r"[^\x00-\x7F]+", " ", text)

    return text.strip()

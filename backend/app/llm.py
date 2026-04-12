from groq import Groq
import os


client = None


def get_client():
    global client
    if client is None:
        api_key = os.getenv("GROQ_API_KEY")

        if not api_key:
            raise ValueError("GROQ_API_KEY is missing in environment variables")

        client = Groq(api_key=api_key)

    return client


def generate_answer(prompt: str):
    try:
        client = get_client()

        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant", messages=[{"role": "user", "content": prompt}]
        )

        return completion.choices[0].message.content

    except Exception as e:
        return f"Error: {str(e)}"

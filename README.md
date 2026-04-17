# 🚀 RAG-Powered Website Chatbot

## 📌 Project Description

This project is a **Retrieval-Augmented Generation (RAG) based chatbot** that allows users to interact with the content of any website.

The system takes a website URL, extracts and processes its content, and enables users to ask questions. It provides answers based strictly on the website’s information using semantic search and a language model.

🔗 **Live Demo:** https://rag-chatbot-mocha-eight.vercel.app/

---

## 📸 Demo

### 🔹 Standalone Chatbot (Manual URL Input)

Users can input any website URL and interact with it.

![Standalone Chatbot](./assets/standalone-chatbot.png)

---

### 🔹 Embedded Chatbot (Automatic Website Context)

The chatbot can be embedded into any website and automatically works on that site.

![Embedded Chatbot](./assets/embedded-chatbot.png)

---

## ⚙️ Setup and Usage Instructions

### 1. Clone the Repository

```bash id="t7dz1v"
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

---

### 2. Backend Setup

```bash id="3jxgqj"
cd backend
python -m venv venv
source venv/bin/activate   # Mac/Linux
venv\Scripts\activate      # Windows

pip install -r requirements.txt
```

Create a `.env` file:

```id="x6clb2"
GROQ_API_KEY=your_key
GEMINI_API_KEY=your_key
```

Run the backend:

```bash id="ehowc0"
uvicorn app.main:app --reload
```

---

### 3. Frontend Setup

```bash id="cdygfi"
cd frontend
npm install
npm run dev
```

---

### 4. Usage

1. Open the frontend
2. Enter a website URL
3. Click **Process Website**
4. Ask questions about the website

---

## 📦 Dependencies and Prerequisites

### Backend

* Python 3.8+
* FastAPI
* BeautifulSoup4
* Requests
* FAISS
* Google Gemini API (Embeddings)
* Groq API (LLM)

### Frontend

* Node.js
* React (Vite)
* Tailwind CSS

---

## 🧠 Solution Approach

The solution follows a **Retrieval-Augmented Generation (RAG)** pipeline:

1. **Data Extraction**

   * Scrapes website content using BeautifulSoup

2. **Preprocessing**

   * Cleans and splits text into chunks

3. **Vectorization**

   * Converts text into embeddings using Gemini API

4. **Storage**

   * Stores embeddings in FAISS for fast similarity search

5. **Query Processing**

   * Converts user query into embedding

6. **Retrieval + Generation**

   * Retrieves relevant chunks and generates answers using Groq

---

## 🏗️ System Architecture

```id="g2kpwr"
Frontend (React)
        ↓
FastAPI Backend
        ↓
Scraper → Cleaner → Chunker → Embeddings (Gemini)
        ↓
FAISS Vector Store
        ↓
Retriever → Prompt Builder → Groq LLM
        ↓
Response to User
```

---

## 🧩 Embeddable Chatbot

You can integrate the chatbot into any website using:

```html id="k9m2qp"
<script src="https://rag-chatbot-mocha-eight.vercel.app/embed.js"></script>
```

### How it works:## 🧩 Embeddable Chatbot

You can integrate the chatbot into any website using:

```html id="ql1lxt"
<script src="https://rag-chatbot-mocha-eight.vercel.app/embed.js"></script>
```

### How it works:

* Injects a floating chatbot UI
* Connects to your backend
* Automatically interacts with the website content


* Injects a floating chatbot UI
* Connects to the backend API
* Automatically detects and processes the host website

### 🔧 Self-hosted / Custom domain

If you have self-deployed the project, you can use your own domain instead of the default one:

```html id="v3n8td"
<script src="https://your-domain.com/embed.js"></script>
```

Just replace `your-domain.com` with your deployed frontend domain where `embed.js` is hosted.

---

## 🚀 Key Features

* Convert any website into a chatbot
* Context-aware question answering
* Fast responses using Groq
* Efficient vector search using FAISS
* Clean chat UI
* Embeddable chatbot widget

---

## 🏁 Conclusion

This project demonstrates how to build a **real-world AI system** using RAG by combining:

* Web scraping
* Semantic search
* Vector databases
* Language models
* Full-stack integration

It showcases a scalable approach to building intelligent assistants grounded in real data.

---

## 📜 License

MIT License

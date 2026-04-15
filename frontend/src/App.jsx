import { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const API = "https://rag-chatbot-a0hq.onrender.com";

  const processUrl = async () => {
    await axios.post(`${API}/process?url=${url}`);
    alert("Website processed!");
  };

  const askQuestion = async () => {
    const res = await axios.get(`${API}/ask?query=${question}`);

    setMessages([
      ...messages,
      { type: "user", text: question },
      { type: "bot", text: res.data.answer },
    ]);

    setQuestion("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">RAG Chatbot</h1>

      {/* URL Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter website URL"
          className="p-2 border w-full"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          onClick={processUrl}
          className="mt-2 px-4 py-2 bg-blue-500 text-white"
        >
          Process Website
        </button>
      </div>

      {/* Chat */}
      <div className="bg-white p-4 h-25 overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className="mb-2">
            <b>{msg.type === "user" ? "You:" : "Bot:"}</b> {msg.text}
          </div>
        ))}
      </div>

      {/* Question */}
      <div>
        <input
          type="text"
          placeholder="Ask a question"
          className="p-2 border w-full"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          onClick={askQuestion}
          className="mt-2 px-4 py-2 bg-green-500 text-white"
        >
          Ask
        </button>
      </div>
    </div>
  );
}

export default App;

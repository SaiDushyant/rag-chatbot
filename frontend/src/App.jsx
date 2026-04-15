import { useState, useRef, useEffect } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const chatEndRef = useRef(null);

  const API = "https://rag-chatbot-a0hq.onrender.com";

  const processUrl = async () => {
    await axios.post(`${API}/process?url=${url}`);
    alert("Website processed!");
  };

  const askQuestion = async () => {
    if (!question.trim()) return;

    const res = await axios.get(`${API}/ask?query=${question}`);

    setMessages([
      ...messages,
      { type: "user", text: question },
      { type: "bot", text: res.data.answer },
    ]);

    setQuestion("");
  };

  // ✅ Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Enter key handler
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      askQuestion();
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 transition ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-gray-100 to-gray-200"
      }`}
    >
      <div
        className={`w-full max-w-2xl shadow-xl rounded-2xl p-6 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">RAG Chatbot</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-1 text-sm rounded-lg border"
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>

        {/* URL Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="https://example.com"
            className={`mt-1 p-3 border rounded-lg w-full focus:outline-none ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "focus:ring-2 focus:ring-blue-400"
            }`}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            onClick={processUrl}
            className="mt-3 w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
          >
            Process Website
          </button>
        </div>

        {/* Chat */}
        <div
          className={`rounded-xl p-4 h-80 overflow-y-auto mb-6 border ${
            darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50"
          }`}
        >
          {messages.length === 0 && (
            <p className="text-gray-400 text-center">
              Ask something about the website...
            </p>
          )}

          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-3 flex ${
                msg.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-xs text-sm ${
                  msg.type === "user"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : darkMode
                      ? "bg-gray-600 text-white rounded-bl-none"
                      : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* ✅ Auto-scroll anchor */}
          <div ref={chatEndRef} />
        </div>

        {/* Question Input */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ask a question..."
            className={`flex-1 p-3 border rounded-lg focus:outline-none ${
              darkMode
                ? "bg-gray-700 border-gray-600"
                : "focus:ring-2 focus:ring-green-400"
            }`}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown} // ✅ Enter works now
          />
          <button
            onClick={askQuestion}
            className="px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

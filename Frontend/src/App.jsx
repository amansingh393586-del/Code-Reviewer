import { useState, useEffect } from "react";
import "prismjs";
import "prismjs/components/";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import Markdown from "react-markdown";
import axios from "axios";
import "./App.css";

function detectLanguage(code) {
  if (/^\s*def\s+\w+\s*\(/.test(code)) return "python";
  if (/^\s*(public|private|protected)?\s*class\s+\w+/.test(code)) return "java";
  if (/^\s*#include\s*<.*>/.test(code)) return "cpp";
  if (/^\s*(function\s+\w+|\(\)\s*=>)/.test(code)) return "javascript";
  return "javascript"; // Default fallback
}

function App() {
  const [code, setCode] = useState(`//This is a Sample code, paste your code here\n def add_numbers(a, b):\n    return a + b`);
  const [review, setReview] = useState("");
  const [showReview, setShowReview] = useState(false); // Only for mobile
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  async function reviewCode() {
    try {
      setLoading(true);
      const result = await axios.post("http://localhost:3000/ai/get-review", { code });
      setReview(result.data);
      setShowReview(true); // Switch to review page (only mobile)
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("⚠️ Error: Unable to fetch review.");
      setShowReview(true);
    }
    finally {
    setLoading(false); // Stop loader
  }
  }
  return (
    <main className={showReview ? "mobile-review-mode" : ""}>
      <div className="left">
        <h2>Code Editor</h2>
        <div className="code">
          <Editor
            value={code}
            onValueChange={(code) => setCode(code)}
            highlight={(code) => {
              const lang = detectLanguage(code);
              return Prism.highlight(code, Prism.languages[lang] || Prism.languages.javascript, lang);
            }}
            padding={12}
            style={{
              fontFamily: '"Fira Code", monospace',
              fontSize: 16,
              minHeight: "300px",
              borderRadius: "8px",
              backgroundColor: "#0c0c0c",
              color: "#fff",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            }}
          />
        </div>
        <button className="review-btn" onClick={reviewCode} disabled={loading}>
          {loading ? (
            <span className="loader"></span>
          ) : (
            "Review Code"
          )}
        </button>
      </div>

      <div className="right">
        <h2>AI Review</h2>
        <div className="review-content">
          <Markdown>{review || "Your AI-generated review will appear here."}</Markdown>
        </div>
        <button className="back-btn" onClick={() => setShowReview(false)}>
          ⬅ Back to Editor
        </button>
      </div>
    </main>
  );
}

export default App;

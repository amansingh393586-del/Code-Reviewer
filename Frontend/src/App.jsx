import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import Markdown from "react-markdown";
import axios from "axios";
import "./App.css";

function detectLanguage(code) {
  // Python: contains 'def ' or 'import ' and doesn't look like JS
  if (/\bdef\s+\w+\s*\(/.test(code) || /\bimport\s+\w+/.test(code) && !/\bconst\s+/.test(code)) return "python";
  
  // Java: contains class definition with typical modifiers
  if (/\b(public|private|protected)?\s*class\s+\w+/.test(code)) return "java";
  
  // C++: contains #include or std::
  if (/#include\s*<.*>/.test(code) || /\bstd::/.test(code)) return "cpp";
  
  // JavaScript: contains function keyword, arrow functions, or common JS keywords
  if (/\b(function\s+\w+|const\s+\w+|let\s+\w+|\(\)\s*=>)/.test(code)) return "javascript";
  
  return "javascript";
}

function calculateHealthScore(review) {
  if (!review) return 0;
  if (review.includes("I am an AI system design exclusively")) return 0;
  
  const isGood = review.toLowerCase().includes("good code");
  const isBad = review.toLowerCase().includes("bad code");
  
  if (isGood) return 85 + Math.floor(Math.random() * 10);
  if (isBad) return 15 + Math.floor(Math.random() * 20);
  return 50;
}

function getStatusLabel(score, review) {
  if (!review) return "Pending";
  if (score >= 80) return "Optimal";
  if (score >= 50) return "Needs Review";
  return "Critical Issues";
}

function getStatusClass(score, review) {
  if (!review) return "";
  if (score >= 80) return "status-good";
  if (score >= 50) return "status-average";
  return "status-bad";
}

const languageMap = {
  python: { ext: "py", icon: "" },
  javascript: { ext: "js", icon: "" },
  java: { ext: "java", icon: "" },
  cpp: { ext: "cpp", icon: "" },
};

const PRIMARY_BACKEND = import.meta.env.VITE_BACKEND_URL;
const LOCAL_BACKEND = "http://localhost:3000";

function App() {
  const [code, setCode] = useState(`// The Architect - Code Reviewer\n// Precision Analysis for Modern Developers\n\ndef add_numbers(a, b):\n    return a + b`);
  const [review, setReview] = useState("");
  const [displayReview, setDisplayReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  
  const reviewRef = useRef("");
  const typingSpeed = 10;

  useEffect(() => {
    if (review && review !== reviewRef.current) {
      reviewRef.current = review;
      setDisplayReview("");
      let i = 0;
      const interval = setInterval(() => {
        if (i < review.length) {
          setDisplayReview((prev) => prev + review[i]);
          i++;
        } else {
          clearInterval(interval);
        }
      }, typingSpeed);
      return () => clearInterval(interval);
    }
  }, [review]);

  async function reviewCode() {
    setLoading(true);
    setReview("");
    
    const targetUrl = PRIMARY_BACKEND || LOCAL_BACKEND;
    
    try {
      console.log(`[Primary] Connecting to: ${targetUrl}`);
      const result = await axios.post(`${targetUrl}/ai/get-review`, { code });
      setReview(result.data);
      setScore(calculateHealthScore(result.data));
    } catch (primaryError) {
      console.warn("Primary backend unreachable, attempting local fallback...");
      
      try {
        if (targetUrl === LOCAL_BACKEND) throw primaryError; 

        console.log(`[Fallback] Connecting to: ${LOCAL_BACKEND}`);
        const result = await axios.post(`${LOCAL_BACKEND}/ai/get-review`, { code });
        setReview(result.data);
        setScore(calculateHealthScore(result.data));
      } catch (fallbackError) {
        console.error("System Error: All backends unreachable.");
        setReview("⚠️ Error: Backend Service Unavailable. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  }

  const currentLang = detectLanguage(code);
  const fileInfo = languageMap[currentLang] || { ext: "txt", icon: "" };

  return (
    <main>
      <nav className="sidebar">
        <div className="logo-container">
          <div className="logo-icon">CR</div>
        </div>
      </nav>

      <section className="workspace">
        <header className="header">
          <div className="tab-container">
            <div className="tab active">
              <span>{fileInfo.icon}</span> main.{fileInfo.ext}
            </div>
          </div>
        </header>

        <div className="content-area">
          <div className="editor-frame">
            <div className="editor-toolbar">
              <span>Untitled Project / main.{fileInfo.ext}</span>
              <span>{currentLang}</span>
            </div>
            
            <div className="code-wrapper">
              <Editor
                height="100%"
                theme="vs-dark"
                language={currentLang}
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  fontSize: 14,
                  minimap: { enabled: false },
                  folding: true,
                  lineNumbers: "on",
                  roundedSelection: true,
                  scrollbar: {
                    vertical: "hidden",
                    horizontal: "hidden",
                  },
                  automaticLayout: true,
                  tabSize: 4,
                  autoClosingBrackets: "always",
                  formatOnPaste: true,
                  smoothScrolling: true,
                  cursorBlinking: "smooth",
                  cursorSmoothCaretAnimation: "on"
                }}
              />
            </div>

            <button className="scan-btn" onClick={reviewCode} disabled={loading}>
              {loading ? "ANALYZING..." : "✦ SCAN CODE"}
            </button>
          </div>

          <aside className="report-frame">
            <div className="report-header">
              <h2>Intelligence Report</h2>
              <div className="health-badge">
                <span className={`health-value ${getStatusClass(score, review).replace('status-', 'score-')}`}>
                  {review ? score : "--"}
                </span>
                <span className={`health-status ${getStatusClass(score, review)}`}>
                  {getStatusLabel(score, review)}
                </span>
              </div>
            </div>

            <div className={`report-content ${review && displayReview.length < review.length ? 'typing' : ''}`}>
              <Markdown>
                {displayReview || "> Waiting for system scan..."}
              </Markdown>
            </div>
          </aside>
        </div>

        <footer className="status-bar">
          <div className="status-left">
            <span>Ready</span>
            <span>UTF-8</span>
          </div>
          <div className="status-right">
            <span>Ln 1, Col 1</span>
            <span>Spaces: 4</span>
            <span style={{ color: loading ? '#fff' : '#4ade80' }}>
              ● System Online
            </span>
          </div>
        </footer>
      </section>
    </main>
  );
}

export default App;




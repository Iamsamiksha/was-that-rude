import React, { useState } from "react";
import axios from "axios";
import "./App.css";

axios.defaults.baseURL = "http://192.168.1.12:5050";


function App() {
  const [comment, setComment] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      // Use absolute URL to avoid CORS ambiguity
      const res = await axios.post("http://127.0.0.1:5000/predict", { comment }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      setResult(res.data);
    } catch (err) {
      console.error("❌ API Error:", err);
      setResult({
        error:
          "Something went wrong while contacting the server. Please make sure the Flask backend is running.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title"> Was That Rude?</h1>
      <textarea
        className="comment-box"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Type to know..."
        rows={5}
      />
      <button className="analyze-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Check"}
      </button>
{result && (
  <div className="result-box">
    <h3 className="result-title">Result:</h3>
    {result.error ? (
      <p className="error-msg">{result.error}</p>
    ) : (
     <div className="result-row">
  {Object.entries(result).map(([label, value]) => (
    <div
      key={label}
      className={`result-pill ${value ? "bad" : "good"}`}
    >
      <span className="pill-label">
        {label.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
      </span>
      <span className="pill-value">{value ? "Yes" : "No"}</span>
    </div>
  ))}
</div>

    )}
  </div>
)}

    </div>
  );
}

export default App;
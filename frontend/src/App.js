import React, { useState } from "react";
import axios from "axios";
import "./App.css";

// Set default base URL (optional but helpful)
axios.defaults.baseURL = "http://127.0.0.1:5000";

function App() {
  const [comment, setComment] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!comment.trim()) return;
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post("/predict", { comment });
      setResult(res.data);
    } catch (err) {
      console.error("❌ API Error:", err);
      setResult({ error: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🧐 Was That Rude?</h1>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Type a comment to analyze..."
        rows={5}
      />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Check"}
      </button>

      {result && (
        <div className="result">
          <h3>Result:</h3>
          {result.error ? (
            <p className="error">{result.error}</p>
          ) : (
            <ul>
              {Object.entries(result).map(([label, value]) => (
                <li key={label}>
                  <strong>{label}:</strong>{" "}
                  <span className={value ? "bad" : "good"}>
                    {value ? "Yes" : "No"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default App;

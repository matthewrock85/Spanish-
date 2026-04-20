"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkSentence = async () => {
    setLoading(true);

    const res = await fetch("/api/check", {
      method: "POST",
      body: JSON.stringify({ sentence: input }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Spanish Trainer</h1>

      <textarea
        placeholder="Write a sentence in Spanish..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "100%", height: 100 }}
      />

      <br /><br />

      <button onClick={checkSentence}>
        {loading ? "Checking..." : "Check sentence"}
      </button>

      {result && (
        <div style={{ marginTop: 30 }}>
          <h3>Correction:</h3>
          <p>{result.correction}</p>

          <h3>Explanation:</h3>
          <p>{result.explanation}</p>
        </div>
      )}
    </div>
  );
}
// deploy trigger
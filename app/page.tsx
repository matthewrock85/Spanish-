// force redeploy
"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);

  const checkSentence = async () => {
    const res = await fetch("/api/check", {
      method: "POST",
      body: JSON.stringify({ sentence: input }),
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Spanish Trainer</h1>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write Spanish..."
        style={{ width: "100%", height: 100 }}
      />

      <br /><br />

      <button onClick={checkSentence}>
        Check sentence
      </button>

      {result && (
        <div>
          <p>{result.correction}</p>
          <p>{result.explanation}</p>
        </div>
      )}
    </div>
  );
}
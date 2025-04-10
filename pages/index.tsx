import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");

  const checkTrust = async () => {
    setResult("Checking...");
    const payload = {
      input_value: url,
      output_type: "text",
      input_type: "chat",
      session_id: "user_1"
    };

    try {
      const response = await fetch("https://midget851-sharkgpt-restart-test.hf.space/api/v1/run/0823c5d1-4c8b-4e4e-95d0-971cb1a8b2e4", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setResult(data.result || "No result returned.");
    } catch (err) {
      console.error(err);
      setResult("Error fetching result.");
    }
  };

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>Check if this website is trustworthy</h1>
      <input
        type="text"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: 300, marginRight: 10 }}
      />
      <button onClick={checkTrust}>Check Trust</button>
      <p>{result}</p>
    </div>
  );
}

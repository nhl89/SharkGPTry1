import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleCheckTrust = async () => {
    setLoading(true);
    setResult("");

    const payload = {
      input_value: url,
      output_type: "text",
      input_type: "chat",
      session_id: "user_1",
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

      if (data && data.result) {
        setResult(data.result);
      } else {
        setResult("No result returned from Langflow.");
      }
    } catch (err) {
      setResult("Error connecting to Langflow API.");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Check if this website is trustworthy</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter website URL"
        style={{ marginRight: "1rem", padding: "0.4rem", width: "300px" }}
      />
      <button onClick={handleCheckTrust} disabled={loading}>
        {loading ? "Checking..." : "Check Trust"}
      </button>
      <div style={{ marginTop: "2rem", whiteSpace: "pre-wrap" }}>
        {result}
      </div>
    </div>
  );
}

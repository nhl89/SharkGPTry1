
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/trustcheck", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      });
      const data = await res.json();
      setResult(data.result || "No result returned.");
    } catch (error) {
      setResult("Error retrieving data.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black p-4">
      <div className="max-w-xl w-full space-y-6">
        <h1 className="text-2xl font-bold">Check if this website is trustworthy</h1>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded"
          placeholder="Enter website URL (e.g., gymfits.eu)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Checking..." : "Check Trust"}
        </button>
        {result && (
          <div className="p-4 border rounded bg-gray-100 whitespace-pre-wrap">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}

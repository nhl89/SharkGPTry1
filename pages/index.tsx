import { useState } from 'react';

export default function Home() {
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setResult('');

    const payload = {
      input_value: urlInput,
      output_type: "text",
      input_type: "chat",
      session_id: "user_1"
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    };

    try {
      const res = await fetch('https://midget851-sharkgpt-restart-test.hf.space/api/v1/run/0823c5d1-4c8b-4e4e-95d0-971cb1a8b2e4', options);
      const data = await res.json();
      setResult(data.outputs?.[0] || 'No result returned');
    } catch (err) {
      console.error(err);
      setResult('Something went wrong.');
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">SharkGPT: Website Trust Checker</h1>

      <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col items-center gap-4">
        <input
          type="text"
          placeholder="Enter website URL..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Checking...' : 'Check Website'}
        </button>
      </form>

      {result && (
        <div className="mt-8 w-full max-w-2xl p-4 bg-white shadow-md rounded">
          <h2 className="text-xl font-semibold mb-2">Result</h2>
          <p className="whitespace-pre-wrap">{result}</p>
        </div>
      )}
    </main>
  );
}

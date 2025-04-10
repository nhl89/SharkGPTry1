const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    input_value: input,       // input is your website URL
    output_type: "text",
    input_type: "chat",
    session_id: "user_1",
  };

  try {
    const response = await fetch(
      "https://midget851-sharkgpt-restart-test.hf.space/api/v1/run/0823c5d1-4c8b-4e4e-95d0-971cb1a8b2e4",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();

    if (data?.result?.length > 0) {
      setResult(data.result[0].text || "No text output returned.");
    } else {
      setResult("No result returned.");
    }
  } catch (err) {
    console.error("API call failed:", err);
    setResult("An error occurred.");
  }
};

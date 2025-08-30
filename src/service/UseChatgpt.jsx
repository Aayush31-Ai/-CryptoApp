import { useState } from "react";

export default function useChatGPT() {
  const [loading, setLoading] = useState(true);
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);

  const sendPrompt = async (prompt) => {
    setLoading(true);
    setOutput("");
    setError(null);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`, // .env me rakho
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b", // ✅ tumhara free model
          messages: [
            { role: "user", content: prompt }
          ],
          stream: true, // streaming ON
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let finalOutput = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter((line) => line.trim() !== "");

        for (const line of lines) {
          if (line.startsWith("data:")) {
            const jsonStr = line.replace("data: ", "");
            if (jsonStr === "[DONE]") continue;

            try {
              const json = JSON.parse(jsonStr);
              const token = json.choices?.[0]?.delta?.content || "";
              finalOutput += token;
              setOutput((prev) => prev + token);
            } catch (e) {
              console.error("Parse error", e, line);
            }
          }
        }
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { sendPrompt, output, loading, error };
}

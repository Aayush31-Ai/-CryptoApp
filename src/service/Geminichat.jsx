import { useState } from "react";
import { GoogleGenAI } from "@google/genai";

export default function useGemini() {
  const [loading, setLoading] = useState(true);
  const [output, setOutput] = useState("");
  const [error, setError] = useState(null);

  const sendPrompt = async (prompt) => {
    setLoading(true);
    setOutput("");
    setError(null);

    try {
      const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_APP_GEMINI_API_KEY, // Store in .env
      });

      const tools = [
        {
          googleSearch: {},
        },
      ];

      const config = {
        thinkingConfig: { thinkingBudget: 0 },
        tools,
      };

      const contents = [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ];

      const response = await ai.models.generateContentStream({
        model: "gemini-2.5-flash-lite",
        config,
        contents,
      });

      let finalOutput = "";
      for await (const chunk of response) {
        finalOutput += chunk.text;
      }
      setOutput(finalOutput);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { sendPrompt, output, loading, error };
}

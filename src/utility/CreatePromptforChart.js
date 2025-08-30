export const createPrompt = (chartPriceData, chartMarketCapData, days) => {
  const prompt = `
You are a professional financial analyst. I will give you cryptocurrency historical data (Price + Market Cap). 
Analyze both datasets together and return insights in JSON format only.

Data:
- Market Cap: ${JSON.stringify(chartMarketCapData)}
- Price: ${JSON.stringify(chartPriceData)}

Instructions:
- Analyze both Price and Market Cap, never ignore one dataset. 
- Always compare Price and Market Cap separately, but also mention correlation if visible.
- Convert timestamps into human-readable dates (format: DD-MM-YY).
- Do not include any text outside JSON.
- Keep explanations short, clear, and beginner-friendly.
- Mention exact dates for important changes, never use generic terms.
- Highlight trends clearly (Uptrend / Downtrend / Sideways).
- Summarize in 2–3 short bullet points.

JSON Output Format (copy exactly):

{
  "price": {
    "current_trend": "Uptrend/Downtrend/Sideways",
    "summary": [
      "- Short point 1",
      "- Short point 2"
    ],
    "patterns": [
      { "date": "DD-MM-YY", "observation": "what changed" }
    ],
    "highest": { "value": <number>, "date": "DD-MM-YY" }
  },
  "market_cap": {
    "current_trend": "Uptrend/Downtrend/Sideways",
    "summary": [
      "- Short point 1",
      "- Short point 2"
    ],
    "patterns": [
      { "date": "DD-MM-YY", "observation": "what changed" }
    ],
    "highest": { "value": <number>, "date": "DD-MM-YY" }
  },
  "comparison": {
    "correlation": "Explain if price and market cap moved together or not in 1 sentence"
  },
  "prediction": {
    "1_month_outlook": "Short prediction text",
    "final_verdict": "Buy / Hold / Avoid"
  }
}

⚠️ RULES:
- Output valid JSON only (no markdown, no text outside JSON).
- Keep all explanations short and simple.
- Do not add extra keys.
- Dates must match the dataset provided.
`;
  return prompt;
};

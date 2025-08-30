export const newsPrompt = (news) => {
  const prompt = `
You are a professional crypto analyst.  
I will provide you with multiple news articles about the same cryptocurrency.  

Here is the data:  
${JSON.stringify(news)}

Your tasks:  
1. Analyze all the news collectively.  
2. Return the result STRICTLY in JSON format.  
3. Do not include any text outside the JSON. 
4. DO NOT ADD "-" in points

FORMAT (copy exactly):

{
  "summary": [
    "- Point 1",
    "- Point 2",
    "- Point 3"
  ],
  "insights": [
    "- Insight 1",
    "- Insight 2",
    "- Insight 3"
  ],
  "sentiment": {
    "overall": "Bullish/Bearish/Neutral",
    "details": [
      "- Reason 1",
      "- Reason 2"
    ],
    "distribution": {
      "bullish": "<percentage>",
      "bearish": "<percentage>",
      "neutral": "<percentage>"
    }
  }
}

⚠️ RULES:  
- Output must be valid JSON.  
- Each point must be short and clear.  
- Never write in one paragraph.  
- Never add extra keys or text.  
`;
  return prompt;
};

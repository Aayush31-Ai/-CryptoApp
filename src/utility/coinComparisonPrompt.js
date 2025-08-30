
export const createPrompt = (coin1Name, data1, coin2Name, data2, days, metric) => {
  const prompt = `
You are a financial analyst AI. 
You will be provided with historical data of TWO cryptocurrencies. 
The data will include either "prices" or "market_caps" for a specified number of days. 
The format will be arrays containing timestamps (milliseconds) and values.
}
data provided -
coin1 name: ${coin1Name}
coin1 data: ${JSON.stringify(data1)}

coin2 name: ${coin2Name}
coin2 data: ${JSON.stringify(data2)}

days: ${days}
metric: ${metric}

Your tasks:
1. Analyze the data for each coin based on the provided metric (either price or market cap).
2.DO NOT ADD backticks at starting and ending just give me JSON
2. Create a JSON output with the following structure:
{
  "coin1": {
    "name": "<coin_name>",
    "metric": "price" or "market_cap",
    "summary": "<summary of performance over given days>",
    "data": [
      { "date": "YYYY-MM-DD", "value": <number> }
    ]
  },
  "coin2": {
    "name": "<coin_name>",
    "metric": "price" or "market_cap",
    "summary": "<summary of performance over given days>",
    "data": [
      { "date": "YYYY-MM-DD", "value": <number> }
    ]
  },
  "comparison": {
    "overall_trend": "<compare both coins performance>",
    "best_performer": "<coin1 or coin2 and why>",
    "investment_advice": {
      "should_invest": string,
      "reason": "<why the user should or should not invest in this coin>"
    }
  }
}

Notes:
- Do not return extra text outside of JSON.
- Keep the summaries simple and clear.
- Ensure all dates are human-readable.
`;

  return prompt;
};

export const createPrompt = (coinInfo, selectedOption) => {
  if (!coinInfo.id) return "";

  const baseIntro = `You are a financial market analyst who explains cryptocurrency information in simple, beginner-friendly language. Always keep answers short (2-3 lines) and relevant to the given data only. Do not use extra knowledge beyond provided data.`;

  let dataBlock = "";
  let task = "";

  switch (selectedOption) {
    case "General Information":
      dataBlock = `
ID: ${coinInfo.id}
Symbol: ${coinInfo.symbol}
Name: ${coinInfo.name}
Hashing Algorithm: ${coinInfo.hashing_algorithm || "N/A"}
Description: ${coinInfo.description?.en || "N/A"}
Genesis Date: ${coinInfo.genesis_date || "Unknown"}
Homepage Links: ${coinInfo.links?.homepage?.filter(Boolean).join(", ") || "N/A"}
Blockchain Links: ${coinInfo.links?.blockchain_site?.filter(Boolean).join(", ") || "N/A"}
Repository Links: ${coinInfo.links?.repos_url?.github?.filter(Boolean).join(", ") || "N/A"}`;
      task = "Summarize the coin's purpose, technology, and history.";
      break;

    case "Live Price":
      dataBlock = `
Current Price (USD): ${coinInfo.market_data?.current_price?.usd ?? "N/A"}
1h Change (%): ${coinInfo.market_data?.price_change_percentage_1h_in_currency?.usd ?? "N/A"}
24h Change (%): ${coinInfo.market_data?.price_change_percentage_24h_in_currency?.usd ?? "N/A"}
7d Change (%): ${coinInfo.market_data?.price_change_percentage_7d_in_currency?.usd ?? "N/A"}`;
      task = "Summarize current market trend and short-term price movement.";
      break;

    case "Historical Data":
      dataBlock = `
14d Change (%): ${coinInfo.market_data?.price_change_percentage_14d_in_currency?.usd ?? "N/A"}
30d Change (%): ${coinInfo.market_data?.price_change_percentage_30d_in_currency?.usd ?? "N/A"}
60d Change (%): ${coinInfo.market_data?.price_change_percentage_60d_in_currency?.usd ?? "N/A"}
200d Change (%): ${coinInfo.market_data?.price_change_percentage_200d_in_currency?.usd ?? "N/A"}
1y Change (%): ${coinInfo.market_data?.price_change_percentage_1y_in_currency?.usd ?? "N/A"}`;
      task = "Identify the overall long-term price trend.";
      break;

    case "Market Stats":
      dataBlock = `
Market Cap (USD): ${coinInfo.market_data?.market_cap?.usd ?? "N/A"}
Total Volume (USD): ${coinInfo.market_data?.total_volume?.usd ?? "N/A"}
Circulating Supply: ${coinInfo.market_data?.circulating_supply ?? "N/A"}
Market Cap Rank: ${coinInfo.market_data?.market_cap_rank ?? "N/A"}`;
      task = "Summarize market strength, liquidity, and ranking.";
      break;

  }

  return `${baseIntro}\n\nDATA:\n${dataBlock}\n\nTASK: ${task}};
  } `;
};

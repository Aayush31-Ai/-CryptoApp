import Fuse from "fuse.js";
import { useCoinList } from "@/Contexts/CoinListContext";
import React, { useEffect, useState } from "react";

const useBestcoin = (userInput) => {
  const coins = useCoinList();
  const [matching, setMatching] = useState([]);

  useEffect(() => {
    if (!userInput || coins.length === 0) {
      setMatching([]); // Reset if no input or no coins yet
      return;
    }

    const fuse = new Fuse(coins, {
      keys: ["name", "symbol", "id"], // fields for matching
      threshold: 0.4, // lower = stricter match
    });

    const searchResult = fuse.search(userInput).map((r) => r.item);
    setMatching(searchResult.slice(0, 5));
  }, [userInput, coins]);

  return matching;
};

export default useBestcoin;

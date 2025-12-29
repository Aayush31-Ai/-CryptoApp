import useChatGPT from "@/service/UseChatgpt";
import useGemini from "@/service/Geminichat";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { createPrompt } from "@/utility/coinComparisonPrompt";
import CompareCoinForm from "@/components/CustomComponents/CompareCoinForm";
import CoinCompAnalysis from "@/components/CustomComponents/CoinCompAnalysis";
import { motion } from "framer-motion";

const CompareCoin = () => {
  const { sendPrompt, output, loading } = useGemini();
  const [coin1, setCoin1] = useState("");
  const [coin2, setCoin2] = useState("");
  const [days, setDays] = useState(7);
  const [chartPriceData1, setChartPriceData1] = useState([]);
  const [chartPriceData2, setChartPriceData2] = useState([]);
  const [chartMarketCapData1, setChartMarketCapData1] = useState([]);
  const [chartMarketCapData2, setChartMarketCapData2] = useState([]);
  const [content, setContent] = useState("price");
  const [aiprice1, setaiprice1] = useState([]);
  const [aiprice2, setaiprice2] = useState([]);
  const [aimarketcap1, setaimarketcap1] = useState([]);
  const [aimarketcap2, setaimarketcap2] = useState([]);
  const [json, setJson] = useState([]);
  const [loader, setLoader] = useState(false);




  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  // clean output
  useEffect(() => {
    if (!loading && output) {
      try {
        const cleanOutput = output.replace(/```json|```/g, "").trim();
        const parsed = JSON.parse(cleanOutput);
        setJson(parsed);
      } catch (err) {
        console.error("JSON parse error", err, output);
      }
    }
  }, [loading, output]);

  const fetchData = async () => {
    try {
      const [res1, res2] = await Promise.all([
        axios.get(
          `https://api.coingecko.com/api/v3/coins/${coin1.toLowerCase()}/market_chart`,
          { params: { vs_currency: "usd", days: days, interval: "daily" } }
        ),
        axios.get(
          `https://api.coingecko.com/api/v3/coins/${coin2.toLowerCase()}/market_chart`,
          { params: { vs_currency: "usd", days: days, interval: "daily" } }
        ),
      ]);

      // Price data
      const data1 = res1.data.prices.map(([timeStamp, price]) => ({
        date: new Date(timeStamp).toISOString().split("T")[0],
        price: price,
      }));
      const data2 = res2.data.prices.map(([timeStamp, price]) => ({
        date: new Date(timeStamp).toISOString().split("T")[0],
        price: price,
      }));

      setChartPriceData1(data1);
      setChartPriceData2(data2);

      // MarketCap data
      const marketdata1 = res1.data.market_caps.map(([timeStamp, price]) => ({
        id: coin1,
        date: new Date(timeStamp).toISOString().split("T")[0],
        marketCap: price,
      }));
      const marketdata2 = res2.data.market_caps.map(([timeStamp, price]) => ({
        id: coin2,
        date: new Date(timeStamp).toISOString().split("T")[0],
        marketCap: price,
      }));

      setChartMarketCapData1(marketdata1);
      setChartMarketCapData2(marketdata2);

      return {
        price1: res1.data.prices,
        price2: res2.data.prices,
        market1: res1.data.market_caps,
        market2: res2.data.market_caps,
      };
    } catch (error) {
      console.log(error);
    }
  };

  const sendToAi = async (fetchedData) => {
    let prompt;

    if (content === "price") {
      prompt = createPrompt(
        coin1,
        fetchedData?.price1 || aiprice1, 
        coin2,
        fetchedData?.price2 || aiprice2,
        days,
        "price"
      );
    } else {
      prompt = createPrompt(
        coin1,
        fetchedData?.market1 || aimarketcap1,
        coin2,
        fetchedData?.market2 || aimarketcap2,
        days,
        "marketcap"
      );
    }
    await sendPrompt(prompt);
    setLoader(false);
  };

  const handleAnalyze = async () => {
    setLoader(true);
    let fetchedData;
    if (!(chartPriceData1.length > 0)) {
      fetchedData = await fetchData();

      setaiprice1(fetchedData.price1);
      setaiprice2(fetchedData.price2);
      setaimarketcap1(fetchedData.market1);
      setaimarketcap2(fetchedData.market2);
    }

    await sendToAi(fetchedData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br pt-20 from-zinc-900 to-zinc-950 text-white px-4 py-8">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <CompareCoinForm
          coin1={coin1}
          coin2={coin2}
          setCoin1={setCoin1}
          setCoin2={setCoin2}
          days={days}
          setDays={setDays}
          content={content}
          setContent={setContent}
        />
        
        {/* Analyze button */}
        <motion.div 
          className="flex justify-center mb-8"
          variants={fadeIn}
        >
          <motion.button
            onClick={handleAnalyze}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(128,0,255,0.5)] transition-all duration-300 font-medium w-full sm:w-auto"
            whileHover={{ 
              scale: 1.05,
              background: "linear-gradient(to right, #9D50BB, #FFD700)"
            }}
            whileTap={{ scale: 0.95 }}
            disabled={ loader}
          >
            {loader  ? (
              <div className="flex items-center justify-center">
                <motion.div 
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                Analyzing...
              </div>
            ) : (
              "Analyze with AI"
            )}
          </motion.button>
        </motion.div>

        {/* ==== LOADING ==== */}
        {!loading && json && (
   <CoinCompAnalysis
          loading={loading}
          days={days}
          content={content}
          coin1={coin1}
          coin2={coin2}
          chartPriceData1={chartPriceData1}
          chartPriceData2={chartPriceData2}
          chartMarketCapData1={chartMarketCapData1}
          chartMarketCapData2={chartMarketCapData2}
          json={json}
        />
        )}

        {/* ==== SHOW CHARTS + ANALYSIS only when json ready ==== */}
     
      </motion.div>
    </div>
  );
};

export default CompareCoin;
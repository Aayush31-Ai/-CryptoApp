"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createPrompt } from "@/utility/CreatePromptforChart";
import { timeAgo } from "@/utility/timeAgo";
import { Heart, ExternalLink, ArrowLeft, BarChart3, TrendingUp, Globe, Newspaper } from "lucide-react";
import useChatGPT from "@/service/UseChatgpt";
import useWatchList from "@/utility/useWatchList";
import PriceChart from "@/components/CustomComponents/PriceChart";
import MarketChart from "@/components/CustomComponents/MarketChart";
import DetailChartAnalyse from "@/components/CustomComponents/DetailChartAnalyse";
import { motion } from "framer-motion";
import ChartDays from "@/components/CustomComponents/ChartDays";
const CoinDetail = () => {
  const [chartPriceData, setChartPriceData] = useState([]);
  const [days, setDays] = useState(7);
  const [chartMarketCapData, setChartMarketCapData] = useState([]);
  const { sendPrompt, output, loading, error } = useChatGPT();
  const [detailData, setDetailData] = useState({});
  const [news, setNews] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { toggleList, isInWatchlist } = useWatchList();
  const [loader, setLoader] = useState(false);
  const [json, setJson] = useState({});




  useEffect(() => {
    const fetchChartData = async (days = 7) => {
      try {
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
          {
            params: { vs_currency: "usd", days: `${days}` },
          }
        );

        // setting chartpricedata
        const data = res.data.prices.map(([timeStamp, price]) => {
          return {
            date: new Date(timeStamp).toISOString().split("T")[0],
            price: Math.floor(price),
          };
        });

        setChartPriceData(data);

        // setting chartmarketcapdata
        const marketdata = res.data.market_caps.map(([timeStamp, price]) => {
          return {
            date: new Date(timeStamp).toISOString().split("T")[0],
            marketCap: Math.floor(price),
          };
        });
        setChartMarketCapData(marketdata);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchChartData(days);
  }, [days, id]);

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

  useEffect(() => {
    const fetchCoin = async () => {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}?&localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`
      );

      const data = {
        name: res.data.name,
        desc: res.data.description.en,
        image: res.data.image.large,
        link: res.data.links.homepage[0],
        rank: res.data.market_data.market_cap_rank,
        price: res.data.market_data.current_price.usd,
        marketCap: res.data.market_data.market_cap.usd,
        symbol: res.data.symbol,
        id: id,
      };
      setDetailData(data);
    };
    fetchCoin();
  }, [id]);

  useEffect(() => {
    const fetchNews = async () => {
      const CRYPTOCOMPARE_API_KEY = import.meta.env.VITE_CRYPTOCOMPARE_API_KEY;

      const res = await axios.get(
        `https://min-api.cryptocompare.com/data/v2/news/?lang=EN&categories=${detailData.symbol}&limit=20`,
        {
          headers: {
            authorization: `Apikey ${CRYPTOCOMPARE_API_KEY}`,
          },
        }
      );

      const allNews = res.data.Data;
      const sorted = allNews.sort((a, b) => b.published_on - a.published_on);

      const top20 = sorted.slice(0, 20);
      setNews(top20);
    };
    if (detailData.symbol) {
      fetchNews();
    }
  }, [detailData.symbol]);

  const submitToAi = async () => {
    setLoader(true);
    const prompt = createPrompt(chartPriceData, chartMarketCapData, days);
    await sendPrompt(prompt);
    setLoader(false);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br pt-20 from-gray-900 to-black text-white p-4 md:p-8">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-purple-300 hover:text-purple-100 transition-colors"
      >
        <ArrowLeft size={20} />
        Back
      </motion.button>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerChildren}
        className="max-w-6xl mx-auto"
      >
        {/* Coin Header */}
        <motion.div variants={fadeIn} className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          <div className="flex items-center gap-4">
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              src={detailData.image}
              alt={detailData.name}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-purple-500/30 shadow-lg shadow-purple-500/20"
            />
            <div>
              <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {detailData.name}
              </h1>
              <p className="text-gray-400 uppercase">{detailData.symbol}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 ml-auto">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={detailData.link}
              target="_blank"
              className="flex items-center gap-2 bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded-lg transition-colors"
            >
              <Globe size={16} />
              Website
            </motion.a>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleList(detailData)}
              className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <Heart
                className={`${isInWatchlist(detailData.id) ? "fill-red-500 text-red-500" : "text-gray-400"}`}
                size={24}
              />
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-md p-4 rounded-xl border border-purple-500/20">
            <p className="text-gray-400">Rank</p>
            <p className="text-2xl font-bold text-purple-400">#{detailData.rank}</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-md p-4 rounded-xl border border-purple-500/20">
            <p className="text-gray-400">Current Price</p>
            <p className="text-2xl font-bold text-green-400">${detailData.price?.toLocaleString()}</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-md p-4 rounded-xl border border-purple-500/20">
            <p className="text-gray-400">Market Cap</p>
            <p className="text-2xl font-bold text-blue-400">${detailData.marketCap?.toLocaleString()}</p>
          </div>
        </motion.div>

        {/* Charts Section */}
        <motion.div variants={fadeIn} className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <BarChart3 className="text-purple-400" size={24} />
            <h2 className="text-xl font-bold">Price Charts</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800/30 backdrop-blur-md p-4 rounded-xl border border-purple-500/20">
              <PriceChart
                id={id}
                chartPriceData={chartPriceData}
              />
            </div>
            
            <div className="bg-gray-800/30 backdrop-blur-md p-4 rounded-xl border border-purple-500/20">
              <MarketChart
                days={days}
                id={id}
                chartMarketCapData={chartMarketCapData}
              />
            </div>
          </div>
        </motion.div>

        <ChartDays
          days={days}
          setDays={setDays}
        />

        {/* AI Analysis Button */}
        <motion.div variants={fadeIn} className="flex justify-center mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={submitToAi}
            disabled={loader}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-3 rounded-full font-medium shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all"
          >
            {loader ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <TrendingUp size={20} />
                Analyze with AI
              </>
            )}
          </motion.button>
        </motion.div>

        {/* AI Analysis Results */}
        {!loading && json && Object.keys(json).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <DetailChartAnalyse data={json} />
          </motion.div>
        )}

        {/* Description */}
        {detailData.desc && (
          <motion.div variants={fadeIn} className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Globe size={24} className="text-purple-400" />
              About {detailData.name}
            </h2>
            <div className="bg-gray-800/30 backdrop-blur-md p-6 rounded-xl border border-purple-500/20">
              <p className="text-gray-300 leading-relaxed line-clamp-6">
                {detailData.desc.length > 500 
                  ? `${detailData.desc.substring(0, 500)}...` 
                  : detailData.desc
                }
              </p>
            </div>
          </motion.div>
        )}

        {/* Latest News */}
        {news.length > 0 && (
          <motion.div variants={fadeIn} className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Newspaper size={24} className="text-purple-400" />
                Latest News
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/newshub", { state: news })}
                className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm"
              >
                View all <ExternalLink size={16} />
              </motion.button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {news.slice(0, 2).map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800/30 backdrop-blur-md rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-colors"
                >
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <div className="flex flex-col h-full">
                      <img
                        className="w-full h-40 object-cover"
                        src={item.imageurl}
                        alt={item.title}
                      />
                      <div className="p-4 flex flex-col flex-grow">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-purple-400">{item.source}</span>
                          <span className="text-xs text-gray-500">{timeAgo(item.published_on)}</span>
                        </div>
                        <h3 className="font-semibold mb-2 line-clamp-2">{item.title}</h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">{item.body}</p>
                        <div className="flex flex-wrap gap-2">
                          {item.categories
                            ?.split(/\s*\|\s*/)
                            .slice(0, 3)
                            .map((cat, i) => (
                              <span key={i} className="text-xs bg-purple-900/50 text-purple-300 px-2 py-1 rounded">
                                {cat}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default CoinDetail;
import useGemini from "@/service/Geminichat";
import React, { useState } from "react";
import { selectOption } from "./Option";
import axios from "axios";
import { createPrompt } from "./createPrompt";
import useBestcoin from "@/utility/useBestcoin";
import { motion, AnimatePresence } from "framer-motion";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12
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

const scaleUp = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4 }
  }
};

const OptionGrid = ({ options, selected, onselect, onSubmitToAi }) => {
  return (
    <motion.div
      className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {options.map((option, index) => (
        <motion.div
          key={index}
          onClick={() => {
            onselect(option.title);
            onSubmitToAi(option.title);
          }}
          className={`p-6 cursor-pointer rounded-xl border-2 bg-zinc-800/50 backdrop-blur-sm shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(128,0,255,0.3)]
            ${selected === option.title 
              ? "border-purple-500 bg-purple-500/20" 
              : "border-zinc-700/30 hover:border-purple-400/50"
            }`}
          variants={itemVariants}
          whileHover={{ 
            y: -5,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="text-4xl mb-3">{option.image}</div>
          <h3 className={`text-lg font-semibold mb-2 ${
            selected === option.title 
              ? "text-purple-300" 
              : "text-white"
          }`}>
            {option.title}
          </h3>
          <p className="text-zinc-400 text-sm">{option.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};

const ChatBot = () => {
  const { sendPrompt, output, loading, error } = useGemini();
  const [coin, setCoin] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [step, setStep] = useState("enterCoin");
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [coinInfo, setCoinInfo] = useState("");
  const [showCoinList, setShowCoinList] = useState(false);

  const matchedCoin = useBestcoin(coin);

  const handleCoinSubmit = async () => {
    if (!coin) return;
    
    setDisableSubmit(true);
    setStep("loadingOptions");
    await delay(800);
    setStep("chooseOptions");
    try {
      const coindetail = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin.toLowerCase()}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      );
      setCoinInfo(coindetail.data);
      console.log("Successfully fetched coin data");
    } catch (error) {
      console.log(error);
      setStep("enterCoin");
      setDisableSubmit(false);
    }
  };

  const fetchCoinNews = async () => {
    if (!coinInfo.symbol) return;
    
    const API_TOKEN = import.meta.env.VITE_CRYPTOPANIC_API_KEY;
    try {
      const res = await axios.get(
        "https://cryptopanic.com/api/developer/v2/posts/",
        {
          params: {
            auth_token: API_TOKEN,
            currencies: coinInfo.symbol,
            kind: "news",
            public: true,
          },
        }
      );

      const news = res.data.results.map(
        ({ title, url, domain, published_at }) => ({
          title,
          url,
          source: domain,
          date: published_at,
        })
      );
      return news;
    } catch (error) {
      console.error("Error fetching coin news:", error);
    }
  };

  const submitToAi = async (optionvalue) => {
    const selected = optionvalue || selectedOption;
    setStep("outputLoader");

    const prompt = createPrompt(coinInfo, selected);
    await sendPrompt(prompt);

    setStep("output");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  from-zinc-900 to-zinc-950 py-20 px-4">
      <motion.div 
        className="max-w-4xl mx-auto bg-zinc-800/30 backdrop-blur-md rounded-2xl border border-zinc-700/30 shadow-xl "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
          <motion.h1 
            className="text-2xl md:text-3xl font-bold flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-3xl">🤖</span>
            Crypto AI Assistant
          </motion.h1>
          <motion.p 
            className="text-purple-200 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Ask me anything about cryptocurrencies
          </motion.p>
        </div>

        {/* Content */}
        <div className="p-6 h-full">
          <AnimatePresence mode="wait">
            {/* Enter Coin Step */}
            {step === "enterCoin" && (
              <motion.div
                key="enterCoin"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <motion.div 
                  className="text-white text-lg"
                  variants={fadeIn}
                >
                  Hello! I'm your AI crypto assistant. Which coin would you like to explore?
                </motion.div>

                <div className="relative">
                  <div className="flex gap-2">
                    <input
                      value={coin}
                      onChange={(e) => {
                        setCoin(e.target.value);
                        setShowCoinList(e.target.value.length > 0);
                      }}
                      onFocus={() => setShowCoinList(coin.length > 0)}
                      type="text"
                      placeholder="Enter coin name (e.g. bitcoin)"
                      className="flex-1 bg-zinc-700/50 border border-zinc-600 rounded-xl p-3 text-white placeholder-zinc-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <motion.button
                      onClick={handleCoinSubmit}
                      disabled={disableSubmit || !coin}
                      className="px-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {disableSubmit ? (
                        <motion.div 
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mx-auto"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        "→"
                      )}
                    </motion.button>
                  </div>

                  {/* Coin suggestions - FIXED POSITIONING */}
                  <AnimatePresence>
                    {showCoinList && matchedCoin.length > 0 && (
                      <motion.ul 
                        className="absolute z-50 w-full mt-2 bg-zinc-800/95 backdrop-blur-sm border border-purple-500/50 rounded-xl shadow-lg overflow-hidden max-h-60 overflow-y-auto"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        style={{ top: "100%" }}
                      >
                        {matchedCoin.map((coinItem) => (
                          <motion.li
                            key={coinItem.id}
                            className="list-none cursor-pointer py-3 px-4 hover:bg-zinc-700/70 text-white border-b border-zinc-700/50 last:border-b-0"
                            onClick={() => {
                              setCoin(coinItem.name);
                              setShowCoinList(false);
                            }}
                            whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.3)" }}
                          >
                            {coinItem.name}
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Loading Options Step */}
            {step === "loadingOptions" && (
              <motion.div
                key="loadingOptions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <motion.div
                  className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p className="text-white">Loading options for {coin}...</p>
              </motion.div>
            )}

            {/* Choose Options Step */}
            {step === "chooseOptions" && (
              <motion.div
                key="chooseOptions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div 
                  className="text-white text-lg mb-6"
                  variants={fadeIn}
                >
                  What would you like to know about <span className="text-purple-400 font-semibold">{coin}</span>?
                </motion.div>
                <OptionGrid
                  options={selectOption}
                  selected={selectedOption}
                  onselect={setSelectedOption}
                  onSubmitToAi={submitToAi}
                />
              </motion.div>
            )}

            {/* Output Loader Step */}
            {step === "outputLoader" && (
              <motion.div
                key="outputLoader"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <motion.div
                  className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <p className="text-white">Analyzing with AI...</p>
              </motion.div>
            )}

            {/* Output Step */}
            {step === "output" && (
              <motion.div
                key="output"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700/30"
              >
                <h3 className="text-white text-lg font-semibold mb-4">AI Analysis for {coin}</h3>
                <div className="text-zinc-200 whitespace-pre-wrap">
                  {error || output}
                </div>
                
                <motion.button
                  onClick={() => {
                    setStep("enterCoin");
                    setCoin("");
                    setSelectedOption("");
                    setDisableSubmit(false);
                  }}
                  className="mt-6 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ask Another Question
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatBot;
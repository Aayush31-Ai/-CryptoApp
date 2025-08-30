import React, { useState } from "react";
import useBestcoin from "../../utility/useBestcoin";
import { motion, AnimatePresence } from "framer-motion";

const CompareCoinForm = ({
  coin1,
  setCoin1,
  coin2,
  setCoin2,
  days,
  setDays,
  content,
  setContent,
}) => {
  const [showList1, setShowList1] = useState(false);
  const [showList2, setShowList2] = useState(false);

  const matchedCoin1 = useBestcoin(coin1);
  const matchedCoin2 = useBestcoin(coin2);

  // Animation variants
  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
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
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
    >
      <motion.h1 
        className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
        variants={itemVariants}
      >
        Compare CryptoCurrencies
      </motion.h1>
      
      <motion.p 
        className="mb-6 text-zinc-300"
        variants={itemVariants}
      >
        Enter two crypto currencies to compare <b className="text-purple-400">Price</b> and{" "}
        <b className="text-teal-400">Market Cap</b>.
      </motion.p>

      {/* Form */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
        variants={itemVariants}
      >
        {/* Coin 1 Input */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1 text-zinc-300">
            Cryptocurrency 1
          </label>
          <input
            value={coin1}
            onChange={(e) => { 
              setCoin1(e.target.value);
              setShowList1(e.target.value.length > 0);
            }}
            onFocus={() => setShowList1(coin1.length > 0)}
            type="text"
            placeholder="e.g. bitcoin"
            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-zinc-500"
          />
          
          <AnimatePresence>
            {showList1 && matchedCoin1.length > 0 && (
              <motion.ul 
                className="absolute z-10 w-full mt-1 bg-zinc-800/90 backdrop-blur-sm border border-purple-500/30 rounded-xl shadow-lg overflow-hidden max-h-60 overflow-y-auto"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {matchedCoin1.map((coin, index) => (
                  <motion.li
                    className="list-none cursor-pointer py-2 px-4 hover:bg-zinc-700/50 text-white"
                    onClick={() => {
                      setCoin1(coin.name);
                      setShowList1(false);
                    }}
                    key={index}
                    whileHover={{ backgroundColor: "rgba(63, 63, 70, 0.5)" }}
                  >
                    {coin.name}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Coin 2 Input */}
        <div className="relative">
          <label className="block text-sm font-medium mb-1 text-zinc-300">
            Cryptocurrency 2
          </label>
          <input
            value={coin2}
            onChange={(e) => { 
              setCoin2(e.target.value);
              setShowList2(e.target.value.length > 0);
            }}
            onFocus={() => setShowList2(coin2.length > 0)}
            type="text"
            placeholder="e.g. ethereum"
            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-zinc-500"
          />
          
          <AnimatePresence>
            {showList2 && matchedCoin2.length > 0 && (
              <motion.ul 
                className="absolute z-10 w-full mt-1 bg-zinc-800/90 backdrop-blur-sm border border-purple-500/30 rounded-xl shadow-lg overflow-hidden max-h-60 overflow-y-auto"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {matchedCoin2.map((coin, index) => (
                  <motion.li
                    className="list-none cursor-pointer py-2 px-4 hover:bg-zinc-700/50 text-white"
                    onClick={() => {
                      setCoin2(coin.name);
                      setShowList2(false);
                    }}
                    key={index}
                    whileHover={{ backgroundColor: "rgba(63, 63, 70, 0.5)" }}
                  >
                    {coin.name}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Days select */}
      <motion.div 
        className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={itemVariants}
      >
        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-300">
            Select Duration
          </label>
          <select
            onChange={(e) => setDays(Number(e.target.value))}
            value={days}
            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
          >
            <option value={7}>7 Days</option>
            <option value={30}>30 Days</option>
            <option value={90}>3 Months</option>
          </select>
        </div>

        {/* Comparison type */}
        <div>
          <label className="block text-sm font-medium mb-1 text-zinc-300">
            Compare by
          </label>
          <select
            onChange={(e) => setContent(e.target.value)}
            value={content}
            className="w-full bg-zinc-800/50 border border-zinc-700 rounded-xl p-3 focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
          >
            <option value="price">Price</option>
            <option value="marketcap">Market Cap</option>
          </select>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CompareCoinForm;
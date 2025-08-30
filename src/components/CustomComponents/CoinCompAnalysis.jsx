import React, { use } from 'react'
import MarketChart from "@/components/CustomComponents/MarketChart";
import PriceChart from "@/components/CustomComponents/PriceChart";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from 'react';
const CoinCompAnalysis = ({
  loading, days, coin1, coin2, json, 
  chartPriceData1, chartPriceData2, 
  chartMarketCapData1, chartMarketCapData2, content
}) => {
  
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

  const scaleUp = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  useEffect(() => {
   console.log(json);
  }, [json]);

  return (
    <AnimatePresence>
      {!loading && json && Object.keys(json).length > 0 && (
        <motion.div 
          className="mt-8 space-y-8"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={containerVariants}
        >
          {/* Charts */}
          <motion.div variants={itemVariants}>
            {content === "price" ? (
              <div className="grid md:grid-cols-2 gap-6">
                <PriceChart days={days} id={coin1} chartPriceData={chartPriceData1} />
                <PriceChart days={days} id={coin2} chartPriceData={chartPriceData2} />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <MarketChart days={days} id={coin1} chartMarketCapData={chartMarketCapData1} />
                <MarketChart days={days} id={coin2} chartMarketCapData={chartMarketCapData2} />
              </div>
            )}
          </motion.div>

          {/* Coin Analysis Cards */}
          <motion.div 
            className="grid md:grid-cols-2 gap-6"
            variants={itemVariants}
          >
            <motion.div 
              className="p-6 bg-zinc-800/50 backdrop-blur-sm rounded-xl border border-zinc-700/30 shadow-lg"
              variants={scaleUp}
              whileHover={{ y: -5 }}
            >
              <h2 className="font-bold text-lg mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {json.coin1?.name || coin1}
              </h2>
              <p className="text-zinc-300 mb-3 text-sm">{json.coin1?.summary}</p>
              <p className="text-xs text-zinc-500">Metric: {json.coin1?.metric}</p>
            </motion.div>
            
            <motion.div 
              className="p-6 bg-zinc-800/50 backdrop-blur-sm rounded-xl border border-zinc-700/30 shadow-lg"
              variants={scaleUp}
              whileHover={{ y: -5 }}
            >
              <h2 className="font-bold text-lg mb-3 bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">
                {json.coin2?.name || coin2}
              </h2>
              <p className="text-zinc-300 mb-3 text-sm">{json.coin2?.summary}</p>
              <p className="text-xs text-zinc-500">Metric: {json.coin2?.metric}</p>
            </motion.div>
          </motion.div>

          {/* Comparison */}
          <motion.div 
            className="p-6 bg-zinc-800/50 backdrop-blur-sm rounded-xl border border-zinc-700/30 shadow-lg"
            variants={itemVariants}
          >
            <h2 className="font-bold text-lg mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Comparison Analysis
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-zinc-300 mb-2">
                  <b className="text-purple-400">Overall Trend:</b> {json.comparison?.overall_trend}
                </p>
                <p className="text-zinc-300">
                  <b className="text-purple-400">Best Performer:</b> {json.comparison?.best_performer}
                </p>
              </div>
              
              {json.comparison?.investment_advice && (
                <div className="p-4 bg-zinc-900/50 rounded-lg border border-purple-500/20">
                  <p className="text-sm text-zinc-300 mb-1 font-semibold">Investment Advice</p>
                  <p className="text-zinc-300 text-sm">
                    <span className="text-green-400 font-medium">
                      {json.comparison.investment_advice.should_invest}
                    </span> – {json.comparison?.investment_advice.reason}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CoinCompAnalysis;
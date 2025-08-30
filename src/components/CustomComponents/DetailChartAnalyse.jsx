import React from "react";
import { motion } from "framer-motion";

const DetailChartAnalyse = ({ data }) => {
  if (!data) return <p className="text-gray-400 text-center p-6">No data available</p>;

  const { price = {}, market_cap = {}, comparison = {}, prediction = {} } = data;

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

  // Utility function to render patterns as a table
  const renderPatternsTable = (patterns) => {
    if (!patterns || patterns.length === 0) return null;
    
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4"
      >
        <h3 className="font-semibold text-purple-300 mb-2">Patterns:</h3>
        <div className="overflow-x-auto rounded-lg border border-purple-500/20">
          <table className="w-full text-sm">
            <thead className="bg-purple-900/30">
              <tr>
                <th className="px-4 py-2 text-left text-purple-300">Date</th>
                <th className="px-4 py-2 text-left text-purple-300">Observation</th>
              </tr>
            </thead>
            <tbody>
              {patterns.map((p, i) => (
                <motion.tr 
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-purple-500/10 even:bg-gray-800/20"
                >
                  <td className="px-4 py-3 text-gray-300">{p?.date || "N/A"}</td>
                  <td className="px-4 py-3 text-gray-300">{p?.observation || "No observation"}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    );
  };

  // Utility function to render summary
  const renderSummary = (summary, delay = 0) => {
    if (!summary || summary.length === 0) return null;
    
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay }}
        className="mt-3"
      >
        <h3 className="font-semibold text-purple-300 mb-2">Summary:</h3>
        <ul className="space-y-2">
          {summary.map((s, i) => (
            <motion.li 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 + delay }}
              className="text-gray-300 flex items-start"
            >
              <span className="text-purple-400 mr-2">•</span>
              {s}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    );
  };

  // Render verdict with appropriate color
  const renderVerdict = (verdict) => {
    if (!verdict) return null;
    
    let colorClass = "text-gray-300";
    if (verdict === "Buy") colorClass = "text-green-400";
    if (verdict === "Hold") colorClass = "text-yellow-400";
    if (verdict === "Sell") colorClass = "text-red-400";
    
    return (
      <motion.p 
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className={`text-lg font-bold ${colorClass}`}
      >
        {verdict}
      </motion.p>
    );
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerChildren}
      className="max-w-4xl mx-auto p-6 bg-gray-900/60 backdrop-blur-md rounded-2xl shadow-lg space-y-8 border border-purple-500/20"
    >
      {/* Price Section */}
      {(price.current_trend || price.highest || price.summary || price.patterns) && (
        <motion.section variants={fadeIn} className="p-5 bg-gray-800/30 rounded-xl border border-purple-500/20">
          <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-4 flex items-center">
            <span className="mr-2">📈</span> Price Analysis
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {price.current_trend && (
              <div>
                <p className="text-gray-400">Current Trend</p>
                <p className="text-gray-200 font-medium">{price.current_trend}</p>
              </div>
            )}
            
            {price.highest?.value && (
              <div>
                <p className="text-gray-400">Highest Value</p>
                <p className="text-gray-200 font-medium">
                  {price.highest.value} {price.highest.date && `on ${price.highest.date}`}
                </p>
              </div>
            )}
          </div>
          
          {renderSummary(price.summary, 0.2)}
          {renderPatternsTable(price.patterns)}
        </motion.section>
      )}

      {/* Market Cap Section */}
      {(market_cap.current_trend || market_cap.highest || market_cap.summary || market_cap.patterns) && (
        <motion.section variants={fadeIn} className="p-5 bg-gray-800/30 rounded-xl border border-purple-500/20">
          <h2 className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4 flex items-center">
            <span className="mr-2">💰</span> Market Cap Analysis
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {market_cap.current_trend && (
              <div>
                <p className="text-gray-400">Current Trend</p>
                <p className="text-gray-200 font-medium">{market_cap.current_trend}</p>
              </div>
            )}
            
            {market_cap.highest?.value && (
              <div>
                <p className="text-gray-400">Highest Value</p>
                <p className="text-gray-200 font-medium">
                  {market_cap.highest.value} {market_cap.highest.date && `on ${market_cap.highest.date}`}
                </p>
              </div>
            )}
          </div>
          
          {renderSummary(market_cap.summary, 0.3)}
          {renderPatternsTable(market_cap.patterns)}
        </motion.section>
      )}

      {/* Comparison */}
      {comparison?.correlation && (
        <motion.section variants={fadeIn} className="p-5 bg-gray-800/30 rounded-xl border border-purple-500/20">
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4 flex items-center">
            <span className="mr-2">🔍</span> Comparison
          </h2>
          <p className="text-gray-300">{comparison.correlation}</p>
        </motion.section>
      )}

      {/* Prediction */}
      {(prediction?.final_verdict) && (
        <motion.section 
          variants={fadeIn}
          className="p-5 bg-gray-800/30 rounded-xl border border-purple-500/20 text-center"
        >
          <h2 className="text-xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-4 flex items-center justify-center">
            <span className="mr-2">📊</span> Prediction & Final Verdict
          </h2>
          
          <div className="mt-2">
            <p className="text-gray-400 mb-2">Final Verdict</p>
            {renderVerdict(prediction.final_verdict)}
          </div>
        </motion.section>
      )}
    </motion.div>
  );
};

export default DetailChartAnalyse;
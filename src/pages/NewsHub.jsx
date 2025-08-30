import { useLocation } from "react-router-dom";
import { timeAgo } from "@/utility/timeAgo";
import useChatGPT from "@/service/UseChatgpt";
import { newsPrompt } from "@/utility/NewsPrompt";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NewsHub = () => {
  const [json, setJson] = useState({});
  const location = useLocation();
  const news = location.state;
  const { sendPrompt, output, loading, error } = useChatGPT();
  const [loader,setLoader]  = useState(false);

  const submitToAi = async () => {
    setLoader(true);
    const prompt = newsPrompt(news);
    await sendPrompt(prompt);
    setLoader(false);
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br pt-20 from-zinc-900 to-zinc-950 text-white px-4 py-8">
      <motion.div 
        className="max-w-5xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* News List */}
        <motion.div 
          className="flex flex-col gap-6 mb-8"
          variants={containerVariants}
        >
          <AnimatePresence>
            {news?.map((item, index) => (
              <motion.div
                key={item.id}
                className="flex flex-col sm:flex-row gap-4 bg-zinc-800/50 backdrop-blur-sm rounded-xl p-5 border border-zinc-700/30 hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(128,0,255,0.2)]"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Image - Responsive */}
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 mx-auto sm:mx-0">
                  <motion.img
                    className="w-full sm:w-40 h-40 sm:h-28 object-cover rounded-lg"
                    src={item.imageurl}
                    alt={item.title}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  />
                </a>

                {/* Content */}
                <div className="flex flex-col justify-between flex-1">
                  {/* Header */}
                  <div className="flex items-center text-sm text-zinc-400 gap-2 mb-2 flex-wrap">
                    <span className="font-medium bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                      {item.source}
                    </span>
                    <span className="hidden sm:block">•</span>
                    <span>{timeAgo(item.published_on)}</span>
                  </div>

                  {/* Title */}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg font-semibold text-white hover:text-purple-400 transition-colors line-clamp-2 mb-2"
                  >
                    {item.title}
                  </a>

                  {/* Body (trimmed) */}
                  <p className="text-zinc-300 text-sm mb-3 line-clamp-3">
                    {item.body}
                  </p>

                  {/* Categories */}
                  <div className="text-xs">
                    <span className="flex flex-wrap gap-2 font-semibold text-zinc-400">
                      Categories:
                      {item.categories
                        ?.split(/\s*\|\s*/)
                        .slice(0, 3)
                        .map((cat, index) => (
                          <span
                            className="text-sm bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent"
                            key={index}
                          >
                            {cat}
                          </span>
                        ))}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* AI Button */}
        <motion.div 
          className="flex justify-center mb-8"
          variants={fadeIn}
        >
          <motion.button
            onClick={submitToAi}
            className="px-6 py-3 text-sm sm:px-8 sm:text-base bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(128,0,255,0.5)] transition-all duration-300 font-medium w-full sm:w-auto"
            whileHover={{ 
              scale: 1.05,
              background: "linear-gradient(to right, #9D50BB, #FFD700)"
            }}
            whileTap={{ scale: 0.95 }}
            disabled={loader}
          >
            {loader ? (
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

        {/* AI Output */}
        <AnimatePresence>
          {!loading && json && Object.keys(json).length > 0 && (
            <motion.div 
              className="space-y-6"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
            >
              {/* Summary */}
              {json.summary && (
                <motion.div 
                  className="bg-zinc-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-zinc-700/30 shadow-lg"
                  variants={scaleUp}
                >
                  <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Summary
                  </h2>
                  <ul className="space-y-2">
                    {json.summary.map((point, i) => (
                      <motion.li 
                        key={i} 
                        className="text-zinc-300 pl-4 border-l-2 border-purple-500 py-1 text-sm sm:text-base"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {point.replace(/^-+\s*/, "")}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Insights */}
              {json.insights && (
                <motion.div 
                  className="bg-zinc-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-zinc-700/30 shadow-lg"
                  variants={scaleUp}
                >
                  <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-teal-400 to-green-400 bg-clip-text text-transparent">
                    Insights
                  </h2>
                  <ul className="space-y-2">
                    {json.insights.map((point, i) => (
                      <motion.li 
                        key={i} 
                        className="text-zinc-300 pl-4 border-l-2 border-teal-500 py-1 text-sm sm:text-base"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        {point.replace(/^-+\s*/, "")}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {/* Sentiment */}
              {json.sentiment && (
                <motion.div 
                  className="bg-zinc-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-zinc-700/30 shadow-lg"
                  variants={scaleUp}
                >
                  <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Sentiment
                  </h2>
                  <p className="font-semibold mb-4 text-white">
                    Overall: <span className={
                      json.sentiment.overall?.toLowerCase().includes("bullish") 
                        ? "text-green-400" 
                        : json.sentiment.overall?.toLowerCase().includes("bearish") 
                        ? "text-red-400" 
                        : "text-yellow-400"
                    }>
                      {json.sentiment.overall}
                    </span>
                  </p>

                  {json.sentiment.details && (
                    <ul className="space-y-2 mb-4">
                      {json.sentiment.details.map((point, i) => (
                        <motion.li 
                          key={i} 
                          className="text-zinc-300 pl-4 border-l-2 border-blue-500 py-1 text-sm sm:text-base"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          {point.replace(/^-+\s*/, "")}
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  {json.sentiment.distribution && (
                    <motion.div 
                      className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 text-sm font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <span className="text-green-400 flex items-center">
                        <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                        Bullish: {json.sentiment.distribution.bullish}%
                      </span>
                      <span className="text-red-400 flex items-center">
                        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                        Bearish: {json.sentiment.distribution.bearish}%
                      </span>
                      <span className="text-yellow-400 flex items-center">
                        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                        Neutral: {json.sentiment.distribution.neutral}%
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default NewsHub;
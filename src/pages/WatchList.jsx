// components/WatchList.tsx
import useWatchList from "@/utility/useWatchList";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const WatchList = () => {
  const { watchlist } = useWatchList();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 18,
      },
    },
    hover: {
      y: -8,
      scale: 1.03,
      boxShadow: "0px 10px 30px rgba(128, 0, 255, 0.25)",
      transition: { duration: 0.3 },
    },
  };

  const coinCards = watchlist.map((coin) => (
    <motion.div
      key={coin.id}
      variants={cardVariants}
      className="flex flex-col items-center p-5 bg-zinc-800  backdrop-blur-sm border border-purple-800/40 rounded-2xl shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer group"
      whileHover="hover"
      onClick={() => window.open(`/coindetail/${coin.id}`, "_self")}
    >
      {/* Coin Image */}
      <motion.div
        className="mb-4 overflow-hidden rounded-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <img
          className="h-16 w-16 object-contain group-hover:scale-110 transition-transform duration-300"
          src={coin.image}
          alt={coin.name}
        />
      </motion.div>

      {/* Coin Name - Gradient Text */}
      <h1 className="text-xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-200 transition-all duration-500">
        {coin.name}
      </h1>

      {/* Live Data */}
      <div className="mt-3 space-y-1 text-sm text-gray-300 text-center">
        <p className="transition-opacity group-hover:opacity-100">
          <span className="text-purple-300">Rank:</span> #{coin.rank}
        </p>
        <p className="transition-opacity group-hover:opacity-100">
          <span className="text-green-300">Price:</span> ${Number(coin.price).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
        <p className="transition-opacity group-hover:opacity-100">
          <span className="text-blue-300">Market Cap:</span> ${Number(coin.marketCap).toLocaleString()}
        </p>
      </div>

      {/* Subtle Glow Effect on Hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(141,80,187,0.4) 0%, transparent 70%)",
        }}
        initial={{ scale: 0.8 }}
        whileHover={{ scale: 1.2, opacity: 0.3 }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  ));

  return (
    <div className="py-10 pt-20 stack px-4 sm:px-6 lg:px-8">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-200 bg-clip-text text-transparent"
      >
        Your Watchlist
      </motion.h2>

      <AnimatePresence>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {coinCards.length > 0 ? (
            coinCards
          ) : (
            <motion.p
              className="text-gray-400 col-span-full text-center py-10 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Your watchlist is empty. Add some coins from the search bar!
            </motion.p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default WatchList;
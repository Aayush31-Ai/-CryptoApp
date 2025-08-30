import React from 'react'
import { motion } from "framer-motion";
const ChartDays = ({days,setDays}) => {

      const dayButtons = [
    { label: "7 Days", value: 7 },
    { label: "30 Days", value: 30 },
    { label: "90 Days", value: 90 },
  ];

 
  return (
      <motion.div 
        className="flex gap-4 justify-center my-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {dayButtons.map((button) => (
          <motion.button
            key={button.value}
            onClick={() => setDays(button.value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
              days === button.value
                ? "bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/30"
                : "bg-gray-700/50 text-gray-300 hover:bg-gray-700/70 border border-gray-600"
            }`}
          >
            {button.label}
          </motion.button>
        ))}
      </motion.div>
  )
}

export default ChartDays
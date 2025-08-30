import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const PriceChart = ({days, setDays, id, chartPriceData}) => {
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800/90 backdrop-blur-md p-3 rounded-lg border border-purple-500/30 shadow-lg">
          <p className="text-gray-300">{`Date: ${label}`}</p>
          <p className="text-purple-400 font-medium">
            {`Price: $${payload[0].value.toLocaleString()}`}
          </p>
        </div>
      );
    }
    return null;
  };

  // Format function for YAxis and Tooltip
  const formatValue = (value) => {
    if (value >= 1e12) return (value / 1e12).toFixed(2) + "T";
    if (value >= 1e9) return (value / 1e9).toFixed(2) + "B";
    if (value >= 1e6) return (value / 1e6).toFixed(2) + "M";
    if (value >= 1e3) return (value / 1e3).toFixed(2) + "K";
    return value;
  };

  // Day buttons with active state
  const dayButtons = [
    { label: "7 Days", value: 7 },
    { label: "30 Days", value: 30 },
    { label: "90 Days", value: 90 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-3xl mx-auto bg-gray-800/30 backdrop-blur-md border border-purple-500/20 shadow-lg shadow-purple-500/10 rounded-2xl">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {id.toUpperCase()} Price Chart
          </CardTitle>
          <p className="text-gray-400 text-sm">Last {days} days</p>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartPriceData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#4A5568" 
                opacity={0.3} 
              />
              <XAxis 
                dataKey="date" 
                stroke="#A0AEC0"
                fontSize={12}
                tickLine={false}
                axisLine={{ stroke: "#4A5568" }}
              />
              <YAxis 
                domain={["auto", "auto"]} 
                stroke="#A0AEC0"
                fontSize={12}
                tickFormatter={formatValue}
                tickLine={false}
                axisLine={{ stroke: "#4A5568" }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="price"
                stroke="url(#priceGradient)"
                strokeWidth={3}
                dot={false}
                activeDot={{ 
                  r: 6, 
                  fill: "#9F7AEA", 
                  stroke: "#FFFFFF", 
                  strokeWidth: 2 
                }}
              />
              {/* Gradient definition for the line */}
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="100%" y2="0">
                  <stop offset="0%" stopColor="#9F7AEA" />
                  <stop offset="100%" stopColor="#ED64A6" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Day Selector */}
  
    </motion.div>
  );
}

export default PriceChart;
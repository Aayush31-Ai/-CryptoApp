import ChatBot from "@/components/CustomComponents/QandAbox/ChatBot";
import CoinDetail from "@/pages/CoinDetail";
import CompareCoin from "@/pages/CompareCoin";
import Home from "@/pages/Home";
import NewsHub from "@/pages/NewsHub";
import WatchList from "@/pages/WatchList";
import React from "react";
import { Route, Routes } from "react-router-dom";

const MainRoute = () => {
  return (
    <Routes>
      <Route path="/chatbot" element={<ChatBot />} />
      <Route path="/" element={<Home/>} />
      <Route path="/coindetail/:id" element={<CoinDetail />} />
      <Route path="/newshub" element={<NewsHub />} />
      <Route path="/watchlist" element={<WatchList />} />
      <Route path="/comparecoin" element={<CompareCoin />} />

    </Routes>
  );
};

export default MainRoute;

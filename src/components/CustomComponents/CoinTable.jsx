import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const CoinTable = ({ coinsList = [], loading = false }) => {
  const navigate = useNavigate();
  const mockCoins = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'btc',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNGNzkzMUEiLz4KPHBhdGggZD0iTTIzLjE4OSAxNC4wMkMyMy43NjggMTAuNTY2IDIxLjMzNiA4LjYwNiAxNy43MTggOS4wMTZMMTYuNzI5IDUuNTYzTDE0LjI5NyA2LjEwMUwxNS4yNjkgOS40NzVDMTQuNjc0IDkuNjAzIDE0LjA2NyA5Ljc0IDEzLjQ2OSA5Ljg3M0wxMi40ODkgNi40NzVMMTAuMDU3IDcuMDEzTDExLjA0NiAxMC40NjVDMTAuNTQgMTAuNTc4IDEwLjA0NCAxMC42ODkgOS41NjggMTAuNzk0TDkuNTcgMTAuNzg1TDYuNTQ5IDExLjQ4TDcuMTM5IDE0LjE0NEMxMS4xNzQgMTMuNTUgMTIuMTU4IDE0LjY4NSAxMi4xNTggMTQuNjg1QzEyLjE1OCAxNC42ODUgMTMuMzk4IDEzLjk5NyAxNC4yNTkgMTcuNzg1TDE1LjI4NSAyMS40NjJDMTUuMzg4IDIxLjQzNyAxNS41MTYgMjEuNDA1IDE1LjY2MSAyMS4zNjRMMTUuMjg1IDIxLjQ2MkwxNC4yNTkgMjUuNDM3SDE2LjY3N0wxNy42NTcgMjIuMDE4QzE4LjI3MyAyMS44NjUgMTguODc2IDIxLjcyOSAxOS40NjQgMjEuNjA3TDIwLjQ0MyAyNS4wNDhMMjIuODc1IDI0LjUxTDIxLjg0OSAyMC41MTRDMjUuNzg2IDE5LjU5NyAyOC4wOCAxNy4zMTggMjMuMTg5IDE0LjAyWiIgZmlsbD0iI0ZGRiIvPgo8L3N2Zz4K',
      current_price: 108505.81,
      price_change_percentage_24h: -1.47,
      market_cap: 2160000000000,
      market_cap_rank: 1
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'eth',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMzQzNDM0QiLz4KPHBhdGggZD0iTTE1Ljk5OTYgNC4xOTk5N1YxMy41ODgzTDI0IDEwLjQ3NEwxNS45OTk2IDQuMTk5OTdaIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjYiLz4KPHBhdGggZD0iTTggMTAuNDc0TDE2IDEzLjU4ODRWOS42Njc5N0w4IDEwLjQ3NFoiIGZpbGw9IndoaXRlIiBmaWxsLW9wYWNpdHk9IjAuNiIvPgo8cGF0aCBkPSJNOCAxMC40NzRMMTYgMTMuNTg4NFY0LjE5OTk3TDggMTAuNDc0WiIgZmlsbD0id2hpdGUiLz4KPHBhdGggZD0iTTE2IDI3LjhWMTUuNzY0TDI0IDEyLjY1TDE2IDI3LjhaIiBmaWxsPSJ3aGl0ZSIgZmlsbC1vcGFjaXR5PSIwLjYiLz4KPHBhdGggZD0iTTggMTIuNjVMMTYgMjcuOFYxNS43NjRMOCAxMi42NVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
      current_price: 4397.94,
      price_change_percentage_24h: 0.18,
      market_cap: 531220000000,
      market_cap_rank: 2
    },
    {
      id: 'ripple',
      name: 'XRP',
      symbol: 'xrp',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMyMzI5MkYiLz4KPHBhdGggZD0iTTEwIDEwSDEyVjEySDEwVjEwWk0yMCAxMEgyMlYxMkgyMFYxMFpNMTAgMjBIMTJWMjJIMTBWMjBaTTIwIDIwSDIyVjIySDIwVjIwWk0xMyAxM0wxNiAxNkwxOSAxM0gyMkwyMCAxNUwyMiAyMEgxOUwxNiAyM0wxMyAyMEgxMEwxMiAxNUwxMCAxM0gxM1oiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
      current_price: 2.82,
      price_change_percentage_24h: -1.60,
      market_cap: 168420000000,
      market_cap_rank: 3
    },
    {
      id: 'tether',
      name: 'Tether',
      symbol: 'usdt',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiMyNkE3N0IiLz4KPHBhdGggZD0iTTE3IDhIMTVWMTBIMTdWOFpNMTcgMTBIMTlWMTJIMTdWMTBaTTE1IDEwSDEzVjEySDEzVjE0SDE1VjEySDEzSDEzVjE0SDE1VjEySDEzVjEyWk0xNyAxMlYxNEgxOVYxMkgxN1oiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
      current_price: 0.9999,
      price_change_percentage_24h: -0.01,
      market_cap: 167610000000,
      market_cap_rank: 4
    },
    {
      id: 'binancecoin',
      name: 'BNB',
      symbol: 'bnb',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iMTYiIGZpbGw9IiNGM0JBMkYiLz4KPHBhdGggZD0iTTE2IDZMMjAgMTBMMTYgMTRMMTIgMTBMMTYgNloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=',
      current_price: 860.47,
      price_change_percentage_24h: 0.13,
      market_cap: 119800000000,
      market_cap_rank: 5
    }
  ];

  const displayCoins = coinsList.length > 0 ? coinsList : mockCoins;

  const formatNumber = (num) => {
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    return num.toLocaleString();
  };

  const formatPrice = (price) => {
    if (price < 1) return `$${price.toFixed(4)}`;
    if (price < 100) return `$${price.toFixed(2)}`;
    return `$${price.toLocaleString()}`;
  };

  const handleCoinClick = (coinId) => {
    console.log(`Navigate to coin: ${coinId}`);
    // Replace with your navigation logic
    navigate(`/coindetail/${coinId}`);
  };

  if (loading) {
    return (
      <div className="w-full border border-[#7538e8]/40 bg-black/40 backdrop-blur-md rounded-2xl p-8 shadow-lg shadow-[#502ece]/40">
        <div className="text-center text-gray-400">Loading coins...</div>
      </div>
    );
  }

  return (
    <div className="w-full border border-[#7538e8]/30 bg-black/60 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl shadow-[#7538e8]/20">
      {/* Desktop View */}
      <div className="hidden md:block">
        <div className="max-h-[800px] overflow-y-auto custom-scrollbar">
          <div className="relative">
            {/* Fixed Header */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-[#7538e8] via-[#6a41d4] to-[#502ece] backdrop-blur-sm">
              <div className="grid grid-cols-11 gap-4 px-6 py-5 text-white font-semibold text-lg">
                <div className="col-span-1 text-center">#</div>
                <div className="col-span-4">Coin</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">24h %</div>
                <div className="col-span-2 text-right">Market Cap</div>
              </div>
            </div>
            
            {/* Table Body */}
            <div className="bg-gradient-to-b from-black/40 to-black/60">
              {displayCoins.length > 0 ? (
                displayCoins.map((coin, index) => (
                  <div
                    key={coin.id}
                    className={`grid grid-cols-11 gap-4 px-6 py-5 hover:bg-gradient-to-r hover:from-[#7538e8]/20 hover:to-[#502ece]/10 transition-all duration-300 cursor-pointer border-b border-gray-700/30 hover:border-[#7538e8]/40 ${
                      index % 2 === 0 ? 'bg-black/20' : 'bg-transparent'
                    }`}
                    onClick={() => handleCoinClick(coin.id)}
                  >
                    {/* Rank */}
                    <div className="col-span-1 flex items-center justify-center">
                      <span className="text-white font-extrabold text-lg">
                        {coin.market_cap_rank}
                      </span>
                    </div>
                    
                    {/* Coin Info */}
                    <div className="col-span-4 flex items-center gap-4">
                      <img
                        className="h-12 w-12 object-cover rounded-full border-2 border-[#7538e8]/50 shadow-lg shadow-[#502ece]/30"
                        src={coin.image}
                        alt={coin.name}
                      />
                      <div>
                        <div className="text-white text-lg font-bold">
                          {coin.symbol.toUpperCase()}
                        </div>
                        <div className="text-gray-400 text-sm font-medium">{coin.name}</div>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="col-span-2 flex items-center justify-end">
                      <span className="text-white font-semibold text-lg">
                        {formatPrice(coin.current_price)}
                      </span>
                    </div>
                    
                    {/* 24h Change */}
                    <div className="col-span-2 flex items-center justify-end">
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-lg ${
                        coin.price_change_percentage_24h < 0 
                          ? 'text-red-400 bg-red-500/10 border border-red-500/20' 
                          : 'text-green-400 bg-green-500/10 border border-green-500/20'
                      }`}>
                        {coin.price_change_percentage_24h < 0 ? (
                          <TrendingDown className="w-4 h-4" />
                        ) : (
                          <TrendingUp className="w-4 h-4" />
                        )}
                        <span className="font-bold">
                          {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                        </span>
                      </div>
                    </div>
                    
                    {/* Market Cap */}
                    <div className="col-span-2 flex items-center justify-end">
                      <span className="text-gray-300 font-semibold">
                        ${formatNumber(coin.market_cap)}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-400 py-8">
                  No coins found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden">
        {/* Fixed Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-[#7538e8] to-[#502ece] px-4 py-3">
          <div className="grid grid-cols-12 gap-2 text-white font-semibold text-sm">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-4">Market cap</div>
            <div className="col-span-3 text-right">Price</div>
            <div className="col-span-4 text-right">24h %</div>
          </div>
        </div>
        
        {/* Scrollable Content */}
        <div className="max-h-[600px] overflow-y-auto custom-scrollbar bg-black/50">
          {displayCoins.length > 0 ? (
            displayCoins.map((coin) => (
              <div
                key={coin.id}
                className="px-4 py-4 border-b border-gray-800/50 hover:bg-gradient-to-r hover:from-[#7538e8]/30 hover:to-[#502ece]/20 transition-all duration-300 cursor-pointer"
                onClick={() => handleCoinClick(coin.id)}
              >
                <div className="grid grid-cols-12 gap-2 items-center">
                  {/* Rank & Star */}
                  <div className="col-span-1 flex flex-col items-center gap-1">
                    <span className="text-white font-extrabold text-sm">
                      {coin.market_cap_rank}
                    </span>
                  </div>
                  
                  {/* Coin Info & Market Cap */}
                  <div className="col-span-4">
                    <div className="flex items-center gap-2 mb-1">
                      <img
                        className="h-8 w-8 object-cover rounded-full border border-[#7538e8]/60"
                        src={coin.image}
                        alt={coin.name}
                      />
                      <div>
                        <div className="text-white text-sm font-bold">
                          {coin.symbol.toUpperCase()}
                        </div>
                      </div>
                    </div>
                    <div className="text-gray-400 text-xs">
                      ${formatNumber(coin.market_cap)}
                    </div>
                  </div>
                  
                  {/* Price */}
                  <div className="col-span-3 text-right">
                    <div className="text-white font-semibold text-sm">
                      {formatPrice(coin.current_price)}
                    </div>
                  </div>
                  
                  {/* 24h Change */}
                  <div className="col-span-4 text-right">
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded ${
                      coin.price_change_percentage_24h < 0 
                        ? 'text-red-500 bg-red-500/10' 
                        : 'text-green-400 bg-green-400/10'
                    }`}>
                      {coin.price_change_percentage_24h < 0 ? (
                        <TrendingDown className="w-3 h-3" />
                      ) : (
                        <TrendingUp className="w-3 h-3" />
                      )}
                      <span className="font-bold text-xs">
                        {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-8">
              No coins found
            </div>
          )}
        </div>
      </div>
      
      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(117, 56, 232, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(117, 56, 232, 0.7);
        }
      `}</style>
    </div>
  );
};

export default CoinTable;
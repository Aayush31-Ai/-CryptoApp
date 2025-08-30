
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import ShinyText from "@/ReactBit/ShinyText";
import LogoLoop from "@/ReactBit/LogoLoop";
import DarkVeil from "@/ReactBit/DarkVeil";
import useBestcoin from "@/utility/useBestcoin";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

const LandingPage = () => {

  const imageLogos = [
    { src: "/Assets/bitcoin-btc-logo.png", alt: "bitcoin",  },
    { src: "/Assets/ethereum-eth-logo.png", alt: "ethereum",  },
    { src: "/Assets/dogecoin-doge-logo.png", alt: "dogecoin",  },
  { src: "/Assets/eos-eos-logo.png", alt: "eos",  },
  { src: "/Assets/internet-computer-icp-logo.png", alt: "internet-computer",  },
  { src: "/Assets/neo-neo-logo.png", alt: "neo",  },
  { src: "/Assets/pax-gold-paxg-logo.png", alt: "pax-gold",  },
  // { src: "/Assets/solana-sol-logo.png", alt: "solana",  },
  // { src: "/Assets/tron-trx-logo.png", alt: "tron",  },
  { src: "/Assets/1inch.png", alt: "1inch",  },
  { src: "/Assets/golos-blockchain-gls-logo.svg", alt: "golos-blockchain",  },
  { src: "/Assets/astar-astr-logo.svg", alt: "astar",  },

];

  const placeholders = [
    "Bitcoin",
    "Ethereum",
    "Dogecoin",
    "Solana",
    "Thron",
    "Cardano",
    "Avalanche",
  ];

  const words = [
    {
      text: "Discover",
    },
    {
      text: "Crypto",
      className:
        "font-bold bg-gradient-to-r from-[#9D50BB] via-[#FFD700] to-[#C4A484] bg-clip-text text-transparent",
    },
    {
      text: "Like",
    },
    {
      text: "Never",
    },
    {
      text: "Before",
    },
  ];

  const [coin, setCoin] = useState("");
  const [showList, setShowList] = useState(false);
  const matchedCoin = useBestcoin(coin);
const navigate = useNavigate();
  return (
    <div>
         <div style={{ width: "100vw", height: "600px", position: "relative" }}>
        <DarkVeil className="relative z-10" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
          {/* <h1 className="text-5xl font-bold">Discover

Like Never Before</h1> */}
          <TypewriterEffectSmooth className="text-white" words={words} />
          <ShinyText className="text-2xl " speed={2} text="Stay Ahead With Real Time Data" />

          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            value={coin}
            onChange={(e) => {
              setCoin(e.target.value);
              if (showList == false) setShowList(true);
              if (e.target.value.length == 0) setShowList(false);
            }}
            onSubmit={() => {
              if (matchedCoin.length > 0) {
                const firstMatch = matchedCoin[0];
                setCoin(firstMatch.name);
                setShowList(false);
                navigate(`/coindetail/${firstMatch.id}`);
              } else {
                console.warn("No match found");
              }
            }}
          />
{showList && (
<div
  className={`bg-zinc-900 border border-purple-700 shadow-[0_0_15px_rgba(128,0,255,0.4)] rounded-xl mt-6 flex-col gap-3 max-h-48 overflow-y-auto transition-[width] duration-500 ease-in-out
    ${showList ? "w-full sm:w-80 md:w-[28rem] lg:w-[36rem] p-4" : "w-0 p-0"}
  `}
>
    <ul>
      {matchedCoin.map((coin, index) => (
        <li
          className="list-none cursor-pointer py-2 hover:bg-zinc-800 rounded-md px-2"
          onClick={() => {
            setCoin(coin.name);
            setShowList(false);
            navigate(`/coindetail/${coin.id}`);
          }}
          key={index}
        >
          {coin.name}
        </li>
      ))}
    </ul>
   
  </div>
)}

         <h2 className="text-lg text-center mt-15 text-[#c2c9d5] "
         style={{wordSpacing:"4px"}}
         >Search coins, analyze trends, and make informed decisions instantly.</h2>      
        </div>
      </div>

  <div style={{ height: '200px', position: 'relative', overflow: 'hidden'}}>
      <LogoLoop
        logos={imageLogos}
        speed={120}
        direction="left"
        logoHeight={50}
        gap={100}
        pauseOnHover
        scaleOnHover
        fadeOut
        fadeOutColor="#111"
        ariaLabel="Technology partners"
      />
    </div>

    </div>
  )
}

export default LandingPage
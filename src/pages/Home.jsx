"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { HeroHighlight, Highlight } from "../components/ui/hero-highlight";
import axios from "axios";
import CoinTable from "@/components/CustomComponents/CoinTable";
import { useNavigate } from "react-router-dom";
import Model from "@/components/CustomComponents/Model";
import LandingPage from "@/components/CustomComponents/Home/LandingPage";
import ScrambledText from "@/ReactBit/ScrambledText";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import CardSwap,{Card} from "@/ReactBit/CardSwap";
import { FlipWords } from "@/components/ui/flip-words";


const Home = () => {
  const [coinsList, setCoinsList] = useState([]);
  const [loading, setLoading] = useState(false);

const words=["Colleague","Agent","Ally","Companion"]




  const navigate = useNavigate();
  const fetchCoin = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true`
      );
      setCoinsList(res.data);
      localStorage.setItem("coindata", JSON.stringify(res.data));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const chacheData = localStorage.getItem("coindata");
    if (chacheData) setCoinsList(JSON.parse(chacheData));
    else fetchCoin();
  }, []);
  return (
    <div className="relative min-h-screen">
    

    <LandingPage />
      <div className="flex justify-center items-center   text-3xl md:text-4xl lg:text-5xl px-4 text-center">
        <ScrambledText
          className="scrambled-text-demo text-5xl"
          radius={20}
          duration={1.2}
          speed={0.5}
          scrambleChars="$"
        >
          Top <em className="ml-3">50</em>{" "}
          <span className="font-bold text-[#a06ae3] text-4xl md:text-[45px] ml-3 ">
            CryptoCurriences
          </span>
        </ScrambledText>
      </div>

      <CoinTable coinsList={coinsList} loading={loading} />


<div className="flex gap-10 mt-15">
   <HeroHighlight>
     <motion.h1
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  viewport={{ once: true, amount: 0.3 }} // once=true means only animate first time
  className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-gray-200 max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
>
  Get ahead with <em> intelligent</em>  <br /> crypto insights,<br />
  <Highlight className="text-white ai-font font-extralight">powered by AI.</Highlight>
</motion.h1>

    </HeroHighlight>
 
</div>




<div className="flex flex-col overflow-hidden text-white">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold  text-white">
              Unleash the power of <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                AI & Crypto
              </span>
            </h1>
          </>
        }
      >

        <video src="https://cdn.pixabay.com/video/2024/03/15/204292-923909617_large.mp4   " autoPlay loop muted className=" rounded-2xl object-cover h-full object-left-top" />
      </ContainerScroll>
    </div>


   <div className="md:min-h-[60vh] flex flex-wrap md:px-15 items-center ">


<TextGenerateEffect className={"md:w-[75vw] sm:w-[100vw]   "} words={` Experience the power of AI with Crypto like never before. Our platform combines advanced artificial intelligence with real-time market insights to help you make smarter investment decisions. From predictive analytics and trend forecasting to personalized portfolio optimization, AI empowers you to stay ahead in the ever-changing world of cryptocurrency. Whether you’re a beginner or a pro trader, our intelligent tools make crypto trading smarter, faster, and more efficient`} />

     <Model/>
    </div> 


  
<div className="mb-10 text-white flex gap-5 sm:flex-wrap h-[400px] lg:h-[500px] md:h-[400px] relative " >
  <div className="text-white text-[25px] md:text-6xl my-50 text-center w-[65vw] py-20 ">
    <h1 className="flex justify-center items-center">
      <span className="flex items-start flex-col ">
        <span className="text-left">
          Your smartest
        </span>
           <span className="">crypto
             <FlipWords words={words} duration={3000} className="text-[#a06ae3]"/>
             , ever.</span>
      </span>
          
    </h1>

  </div>
  <div>
      <CardSwap
    cardDistance={70}
    verticalDistance={60}
    delay={1500}
    pauseOnHover={false}
  >
    <Card>
      <img className="object-cover object-right  opacity-80  h-[400px] w-[500px] " src="/Assets/card9.jpg" alt="card9" />
    </Card>
    <Card>
      <img className="object-cover   opacity-80  h-[400px] w-[500px] " src="/Assets/card8.jpg" alt="card8" />
    </Card>
    <Card>
      <img className="object-cover  opacity-80  h-[400px] w-[500px] " src="/Assets/card7.jpg" alt="card7" />
    </Card>
    <Card>
      <img className="object-cover  opacity-80  h-[400px] w-[500px] " src="/Assets/card6.jpg" alt="card6" />
    </Card>
  </CardSwap>
  </div>

</div>


<div className="text-center border border-[#a06ae3] py-2 mt-30" >
  Made with ❤️ by Aayush Pal
</div>
      
    </div>
  );
};

export default Home;
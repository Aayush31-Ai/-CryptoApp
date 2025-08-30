import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios"
export const CoinListContext=createContext()

export const CoinListProvider=({children})=>{

    const [coinList,setCoinList]=useState([])


    useEffect(()=>{
            const fetchCoinList=async()=>{
try {
    const res = await axios.get("https://api.coingecko.com/api/v3/coins/list");
    setCoinList(res.data)
    
} catch (error) {
    console.log(error);
}
    }
fetchCoinList()
    },[])

return (
    <CoinListContext.Provider value={{coinList}}>
{children}
    </CoinListContext.Provider>
)
}
export const useCoinList=()=>{
const {coinList}=useContext(CoinListContext)
return coinList
}
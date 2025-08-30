
import React, { useEffect, useState } from 'react'

const useWatchList = () => {

const [watchlist,setWatchlist]=useState([])

useEffect(()=>{
    const saved = localStorage.getItem("watchlist")
    if(saved) setWatchlist(JSON.parse(saved))
},[])

const toggleList=(coin)=>{

let updatedList;

if(watchlist.some((c)=>c.id==coin.id)){
    updatedList=watchlist.filter((c)=>c.id != coin.id)
}
else{
    updatedList=[...watchlist,coin]
}

setWatchlist(updatedList)

localStorage.setItem("watchlist",JSON.stringify(updatedList))
}



 const isInWatchlist = (coinId) => {
    return watchlist.some(c => c.id === coinId);
  };
  return {watchlist,toggleList,isInWatchlist}
}

export default useWatchList
import React from 'react'
import { Button } from './components/ui/button'
import ChatBot from './components/CustomComponents/QandAbox/ChatBot'
import MainRoute from './Routes/MainRoute'
import WatchList from './pages/WatchList'
import { useNavigate } from 'react-router-dom'
import Nav from './components/CustomComponents/Nav'

const App = () => {
  const navigate = useNavigate()
  return (
    <div className='bg-[#000000] overflow-hidden text-white '>
      <Nav/>

      <MainRoute/>
    </div>
  );
}

export default App

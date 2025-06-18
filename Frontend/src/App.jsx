import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './Component/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Footer from './Component/Footer/Footer'

function App() {

  return (
    <>
      <Navbar/>
      <Home/>
      <Footer/>
    </>
  )
}

export default App
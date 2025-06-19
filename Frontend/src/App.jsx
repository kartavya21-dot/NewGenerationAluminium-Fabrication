import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './assets/assets'
import Navbar from './Component/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Footer from './Component/Footer/Footer'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import { menu_items } from './assets/assets'

function App() {

  return (
    <div className='app'>
      <Navbar/>
      <div className="main-content">
        {/* <Home/> */}
        <ProductDetail product={menu_items[0]}/>
      </div>
      <Footer/>
    </div>
  )
}

export default App
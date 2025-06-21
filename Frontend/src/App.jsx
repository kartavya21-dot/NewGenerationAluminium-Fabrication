import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Link,
} from "react-router-dom";
import "./assets/assets";
import Navbar from "./Component/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Footer from "./Component/Footer/Footer";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import { menu_items } from "./assets/assets";

function App() {
  return (
    <BrowserRouter basename="NewGenerationAluminium-Fabrication/">
      <div className="app">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/product/:id" element={<ProductDetail/>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

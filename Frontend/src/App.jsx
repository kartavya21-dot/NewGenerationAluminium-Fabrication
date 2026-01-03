import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import "./assets/assets";
import Navbar from "./Component/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Footer from "./Component/Footer/Footer";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import { menu_items } from "./assets/assets";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

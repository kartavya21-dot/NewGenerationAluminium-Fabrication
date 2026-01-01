import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { logo } from "../../assets/assets";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="navbar">
      <Link to="/" className="logo">
        <img src={ logo.image } alt="none" />
      </Link>

      <ul className={`navbar-menu ${isMobileMenuOpen ? "mob-active" : ""}`}>
        <Link
          to="/"
          onClick={() => setMenu("home")}
        >
          Home
        </Link>
        <a
          href="#menu"
          onClick={() => setMenu("menu")}
        >
          Menu
        </a>
        <a
          href="#about-us"
          onClick={() => setMenu("about")}
        >
          About Us
        </a>
        <a
          href="#contact"
          onClick={() => setMenu("contact")}
        >
          Contact
        </a>
      </ul>

      <div className="navbar-right">
        <div
          className="navbar-hamburger"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`bar ${isMobileMenuOpen ? "open" : ""}`}></span>
          <span className={`bar ${isMobileMenuOpen ? "open" : ""}`}></span>
          <span className={`bar ${isMobileMenuOpen ? "open" : ""}`}></span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

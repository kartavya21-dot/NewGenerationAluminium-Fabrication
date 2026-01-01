import React from "react";
import "./Header.css";
import banner from "../../assets/banner.png";

const Header = () => {
  return (
    <div className="header" id="header">
      <img src={banner} alt="" className="header-img" />
      <div className="header-contents">
        <h2>Get Your desired furniture</h2>
        <p>
          You can get your desired doors, windows, and railings at our shop...
        </p>
        <button onClick={() => window.location.href = "https://wa.me/9993036967?text=Hello%20I%20am%20interested%20in%20your%20services"}>Contact us</button>
      </div>
    </div>
  );
};

export default Header;

// https://wa.me/9993036967?text=Hello%20I%20am%20interested%20in%20your%20services

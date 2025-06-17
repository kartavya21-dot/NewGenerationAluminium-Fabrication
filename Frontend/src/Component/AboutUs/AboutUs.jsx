import React from "react";
import "./AboutUs.css";
import { photo } from "../../assets/assets";

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="image">
          <img src={photo.image} alt={photo.name} />
      </div>
      <div className="text-area">
            <p className='paragraph'>" We believe in creating long-lasting products that blend durability with aesthetics, enhancing and beautifying the environment. "</p>
            <h1 className='heading'>-Dinesh Sharma</h1>
        </div>
    </div>
  );
};

export default AboutUs;

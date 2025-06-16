import React from "react";
import "./MenuCard.css";
import { menu_items } from "../../assets/assets";

const MenuCard = ({ name, rate, image }) => {
  return (
    <div className="menu-card">
      <div className="image-container">
        <img src={image} alt="Menu Item" />
      </div>
      <div className="details">
        <h4>{name}</h4>
        <h5>₹ {rate}</h5>
      </div>
    </div>
  );
};

export default MenuCard;



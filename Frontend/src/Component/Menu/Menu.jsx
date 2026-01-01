import React from "react";
import { menu_items } from "../../assets/assets";
import MenuCard from "../MenuCard/MenuCard";
import "./Menu.css";
import { Link } from "react-router-dom";

const Menu = ({ selectedCategory }) => {
  const filteredProduct =
    selectedCategory === "All"
      ? menu_items
      : menu_items.filter((p) => p.category === selectedCategory);

  return (
    <div className="menu">
      {filteredProduct.map((item, index) => {
        return (
          <Link
            to={`product/${index}`}
            key={index}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "block",
            }}
          >
            <MenuCard
              name={item.name}
              rate={item.rate}
              image={item.images[0]}
            ></MenuCard>
          </Link>
        );
      })}
    </div>
  );
};

export default Menu;

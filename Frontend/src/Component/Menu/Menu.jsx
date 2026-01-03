import React from "react";
// import { menu_items } from "../../assets/assets";
import MenuCard from "../MenuCard/MenuCard";
import "./Menu.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { fetchProducts } from "../../api/api";

const Menu = ({ selectedCategory }) => {
  const [menu_items, setMenuItems] = useState([]);
  useEffect(()=> {
    const fetchMenuItems = async () => {
      try{
        const products = await fetchProducts();
        setMenuItems(products);
      } catch(e) {
        console.error(e);
      }
    }
    fetchMenuItems();
  }, [])

  const filteredProduct =
    selectedCategory === "All"
      ? menu_items
      : menu_items.filter((p) => p.category_id === selectedCategory.id);

  return (
    <div className="menu">
      {filteredProduct.map((item, index) => {
        return (
          <Link
            to={`product/${item.id}`}
            key={index}
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "block",
            }}
          >
            <MenuCard
              name={item.name}
              rate={item.price}
              image={item.images[0].image_url}
            ></MenuCard>
          </Link>
        );
      })}
    </div>
  );
};

export default Menu;

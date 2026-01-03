import React from "react";
import "./Category.css";
import { useState } from "react";
import { useEffect } from "react";
import { fetchCategories } from "../../api/api";

const Category = ({ selectedCategory, setSelectedCategory }) => {
  const handleCategoryClick = (cat) => {
    if (selectedCategory === cat) {
      setSelectedCategory("All");
    } else {
      setSelectedCategory(cat);
    }
  };

  const [category, setCategory] = useState([]);

  useEffect(()=> {
    const fetchCategory = async () => {
      try {
        const cat = await fetchCategories();
        setCategory(cat);
      } catch (e) {
        console.log(e);
      }
    }
    fetchCategory();
  }, [])

  return (
    <div className="category" id="category">
      <h1 className="category-heading">Categories</h1>
      <div className="category-list">
        {category.map((item, index) => {
          return (
            <div
              key={index}
              className={
                item === selectedCategory
                  ? "category-type active"
                  : "category-type"
              }
              onClick={() => handleCategoryClick(item)}
            >
              <img
                className="category-type-image"
                src={item.image.image_url}
                alt={item.name}
              ></img>
              <p className="category-type-name">{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;

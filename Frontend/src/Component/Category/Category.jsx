import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { category } from "../../assets/assets";
import "./Category.css";

const Category = ({ selectedCategory, setSelectedCategory }) => {

  const handleCategoryClick = (cat) => {
    if (selectedCategory === cat) {
      setSelectedCategory("All"); // Toggle OFF
    } else {
      setSelectedCategory(cat); // Select new category
    }
  };

  return (
    <div className="category" id="category">
      <h1 className="category-heading">Categories</h1>
      <div className="category-list">
        {category.map((item, index) => {
          return (
            <div
              key={index}
              className={item.name === selectedCategory ? 'category-type active' : 'category-type'}
            //   className="category-type"
              onClick={() => handleCategoryClick(item.name)}
            >
              <img className="category-type-image" src={item.img_src}></img>
              <p className="category-type-name">{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Category;

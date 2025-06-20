import React, { useEffect, useState } from "react";
import "./ProductDetail.css";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

const ProductDetail = ({ product }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const handleThumbnailClick = (index) => setImageIndex(index);

  const leftClick = () => {
    const ind = imageIndex === 0 ? product.images.length - 1 : imageIndex - 1;
    setImageIndex(ind);
  };
  const rightClick = () => {
    setImageIndex((imageIndex + 1) % product.images.length);
  };

  return (
    <div className="product-details-page">

      <div className="product-details">
        <h1 className="product-details-name">{product.name}</h1>
        <p className="product-details-price">₹ {product.rate}</p>
      </div>

      <hr />

      <div className="product-header-section">
        <button className="left-button" onClick={leftClick}><FaArrowCircleLeft /></button>
        <div className="main-image">
          <img src={product.images[imageIndex]} alt={product.name} />
        </div>
        <button className="right-button" onClick={rightClick}><FaArrowCircleRight /></button>
      </div>

      <hr />
      
      <div className="gallery">
        {product.images.map((item, index) => {
          return (
            <div
              key={index}
              className="gallery-image-container"
              onClick={() => handleThumbnailClick(index)}
            >
              <img src={item} alt={`${product.name} ${index + 1}`} />
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default ProductDetail;

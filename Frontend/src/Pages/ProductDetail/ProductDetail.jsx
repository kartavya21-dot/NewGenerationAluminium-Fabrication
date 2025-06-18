import React, { useState } from 'react'
import './ProductDetail.css'

const ProductDetail = ({product}) => {
  const [imageIndex, setImageIndex] = useState(0);

  const dd = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <div className='product-details-page'>
      <div className="product-details">
        <h1 className="product-details-name">{product.name}</h1>
        <p className="product-details-price">{product.rate}</p>
      </div>
      <div className="main-image">
        <img src={product.image} alt="" />
      </div>
      <div className="gallery">
        {
          dd.map((item, index) => {
            return (
              <div className="gallery-image-container" onClick={() => setImageIndex(index)}>
                <img src="https://images.pexels.com/photos/30317240/pexels-photo-30317240.jpeg" alt="" />
              </div>
            )
          } )
        }
      </div>
    </div>
  )
}

export default ProductDetail
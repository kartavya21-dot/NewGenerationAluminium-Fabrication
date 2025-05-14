import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { category } from '../../assets/assets'
import './Category.css'

const Category = () => {
  return (
    <div className='category'>
        <h1 className='category-heading'>Categories</h1>
        <div className='category-list'>
            {
                category.map((item, index) => {
                    return(
                        <div className='category-type'>
                            <img className='category-type-image' src={item.img_src}></img>
                            <p className='category-type-name'>{item.name}</p>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Category
import React from 'react'
import { menu_items } from "../../assets/assets";
import MenuCard from '../MenuCard/MenuCard'
import "./Menu.css"

const Menu = ({ selectedCategory }) => {

  const filteredProduct = (selectedCategory === 'All') ? menu_items : menu_items.filter((p) => p.category === selectedCategory);

  return (
    <div className='menu'>
        {
            filteredProduct.map((item, index) => {
                return(
                    <MenuCard name={item.name} rate={item.rate} image={item.image}></MenuCard>
                )
            })
        }
    </div>
  )
}

export default Menu
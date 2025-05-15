import React from 'react'
import { menu_items } from "../../assets/assets";
import MenuCard from '../MenuCard/MenuCard'
import "./Menu.css"

const Menu = () => {
  return (
    <div className='menu'>
        {
            menu_items.map((item, index) => {
                return(
                    <MenuCard name={item.name} rate={item.rate} image={item.image}></MenuCard>
                )
            })
        }
    </div>
  )
}

export default Menu
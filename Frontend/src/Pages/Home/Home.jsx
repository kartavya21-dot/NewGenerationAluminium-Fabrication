import React from 'react'
import Header from '../../Component/Header/Header'
import Category from '../../Component/Category/Category'
import MenuCard from '../../Component/MenuCard/MenuCard'
import Navbar from '../../Component/Navbar/Navbar'
import Menu from '../../Component/Menu/Menu'
import AboutUs from '../../Component/AboutUs/AboutUs'
import { useState } from 'react'

const Home = () => {

  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <div>
        <Header/>
        <Category
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Menu selectedCategory={selectedCategory} />
        <AboutUs/>
    </div>
  )
}

export default Home
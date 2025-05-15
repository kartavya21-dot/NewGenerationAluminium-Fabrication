import React from 'react'
import Header from '../../Component/Header/Header'
import Category from '../../Component/Category/Category'
import MenuCard from '../../Component/MenuCard/MenuCard'
import Menu from '../../Component/Menu/Menu'

const Home = () => {
  return (
    <div>
        <Header/>
        <Category/>
        <Menu/>
        {/* <MenuCard/> */}
    </div>
  )
}

export default Home
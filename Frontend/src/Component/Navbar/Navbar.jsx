import React from 'react'
import { Link } from 'react-router-dom'; 
import './Navbar.css'
import { logo } from '../../assets/assets'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className="navbar-image-container">
          <img className='logo-image' src={logo.image} alt='logo'></img>
        </div>
        <ul>
            <Link to="/"><li>HOME</li></Link>
            <a href='#category'><li>SERVICES</li></a>
            <a href='#about-us'><li>ABOUT US</li></a>
            <a href='#header'><li>CONTACT US</li></a>
        </ul>
    </nav>
  )
}

export default Navbar
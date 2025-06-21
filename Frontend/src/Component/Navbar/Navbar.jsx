import React from 'react'
import reactLogo from '../../assets/react.svg'
import './Navbar.css'
import { logo } from '../../assets/assets'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className="navbar-image-container">
          <img className='logo-image' src={logo.image} alt='logo'></img>
        </div>
        <ul>
            <li><Link to={"/"}>HOME</Link></li>
            <li><a href="#category">SERVICES</a></li>
            <li><a href="#header">CONTACT US</a></li>
            <li><a href="#about-us">ABOUT US</a></li>
        </ul>
    </nav>
  )
}

export default Navbar
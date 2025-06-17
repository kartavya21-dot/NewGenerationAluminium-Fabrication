import React from 'react'
import reactLogo from '../../assets/react.svg'
import './Navbar.css'
import { logo } from '../../assets/assets'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className="navbar-image-container">
          <img className='logo-image' src={logo.image} alt='logo'></img>
        </div>
        <ul>
            <li>HOME</li>
            <li>SERVICES</li>
            <li>CONTACT US</li>
            <li>ABOUT US</li>
        </ul>
    </nav>
  )
}

export default Navbar
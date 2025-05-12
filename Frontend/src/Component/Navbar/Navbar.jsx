import React from 'react'
import reactLogo from '../../assets/react.svg'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <img src={reactLogo}></img>
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
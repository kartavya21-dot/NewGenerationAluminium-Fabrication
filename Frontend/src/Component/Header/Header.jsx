import React from 'react'
import './Header.css'
import banner from '../../assets/banner.png'
import Button from '../Button/Button'

const Header = () => {
  return (
    <div className='header' id='header'>
        <h1>Get Your desired furniture</h1>
        <p>You can get your desired doors, windows, and railings at our shop...</p>
        <Button text='Contact us'/>
    </div>
  )
}

export default Header

// https://wa.me/9993036967?text=Hello%20I%20am%20interested%20in%20your%20services

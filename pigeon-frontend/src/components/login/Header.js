import React from 'react'
import logo from '../../pictures/pigeon-logo.svg'

const Header = ({ handleClick, loginHidden }) => {
  return (
    <header>
      <div className="logo-wrapper">
        <img src={logo} alt="pigeon logo" />
        <p className="logo-text">Pigeon</p>
      </div>
      <div className="login-register-button-wrapper">
        <div className="login-register-button">
          <button onClick={handleClick} className="login-button" disabled={!loginHidden}>
            Login
          </button>
          <button onClick={handleClick} className="register-button" disabled={loginHidden}>
            Register
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header

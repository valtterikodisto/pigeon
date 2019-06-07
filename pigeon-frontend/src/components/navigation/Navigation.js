import React from 'react'
import Menu from './Menu'
import TogglableButton from './TogglableButton'

import './styles/Navigation.css'
import logo from '../../pictures/pigeon-logo.svg'

const Navigation = ({ token, handleLoginButton, handleRegisterButton }) => {
  console.log('token:', token)

  const menu = () => {
    if (token) {
      return <Menu />
    }

    return (
      <TogglableButton
        leftText="Login"
        rigthText="Register"
        handleLeftToggle={handleLoginButton}
        handleRightToggle={handleRegisterButton}
      />
    )
  }

  return (
    <nav className="navigation">
      <div className="logo-wrapper">
        <img src={logo} alt="pigeon-logo" />
        <p className="logo-text">Pigeon</p>
      </div>
      <div className="menu-button-wrapper">{menu()}</div>
    </nav>
  )
}

export default Navigation

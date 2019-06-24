import React from 'react'
import { useApolloClient } from 'react-apollo-hooks'
import Menu from './Menu'
import TogglableButton from './TogglableButton'

import './Navigation.scss'
import logo from '../../pictures/pigeon-logo.svg'

const Navigation = ({
  token,
  setToken,
  handleLoginButton,
  handleRegisterButton,
  logout,
  setChatId
}) => {
  const client = useApolloClient()

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const handleIconClick = () => {
    if (setChatId) {
      setChatId(null)
    }
  }

  const menu = () => {
    if (token) {
      return <Menu handleLogout={handleLogout} />
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
        <img src={logo} alt="pigeon-logo" onClick={handleIconClick} />
        <p>Pigeon</p>
      </div>
      <div className="menu-button-wrapper">{menu()}</div>
    </nav>
  )
}

export default Navigation

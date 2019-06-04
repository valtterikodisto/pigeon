import React, { useState, useEffect } from 'react'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

import { animateHeader, animateLoginRegister } from '../../animations/login'
import './Login.css'
import logo from '../../pictures/pigeon-logo.svg'

const Login = () => {
  const [loginHidden, setLoginHidden] = useState(false)
  const toggleLoginRegisterButton = () => {
    setLoginHidden(!loginHidden)
  }

  useEffect(() => {
    animateHeader()
  }, [])

  useEffect(() => {
    animateLoginRegister()
  }, [loginHidden])

  const loginRegisterSection = () => {
    if (loginHidden) {
      return <RegisterForm />
    } else {
      return <LoginForm />
    }
  }

  return (
    <div className="login-page-wrapper">
      <header>
        <div className="logo-wrapper">
          <img src={logo} alt="pigeon logo" />
          <p className="logo-text">Pigeon</p>
        </div>
        <div className="login-register-button-wrapper">
          <div className="login-register-button">
            <button
              onClick={toggleLoginRegisterButton}
              className="login-button"
              disabled={!loginHidden}
            >
              Login
            </button>
            <button
              onClick={toggleLoginRegisterButton}
              className="register-button"
              disabled={loginHidden}
            >
              Register
            </button>
          </div>
        </div>
      </header>
      <div className="login-register-section-wrapper">{loginRegisterSection()}</div>
    </div>
  )
}

export default Login

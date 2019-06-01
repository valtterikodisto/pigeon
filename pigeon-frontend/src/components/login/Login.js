import React, { useState } from 'react'

import LoginForm from './LoginForm'
import './Login.css'

const Login = () => {
  const [loginHidden, setLoginHidden] = useState(false)
  const toggleLoginRegisterButton = () => {
    setLoginHidden(!loginHidden)
  }

  const loginRegisterSection = () => {
    if (loginHidden) {
      return (
        <div className="register-section">
          <p>Hidden field</p>
        </div>
      )
    } else {
      return (
        <div className="login-section">
          <LoginForm />
        </div>
      )
    }
  }

  return (
    <div className="login-page-wrapper">
      <header>
        <div className="logo-wrapper">Logo</div>
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

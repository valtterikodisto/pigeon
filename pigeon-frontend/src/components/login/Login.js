import React, { useState } from 'react'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import './Login.css'

const Login = () => {
  const [loginHidden, setLoginHidden] = useState(false)
  const toggleLoginRegisterButton = () => {
    setLoginHidden(!loginHidden)
  }

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
        <div className="logo-wrapper">Pigeon</div>
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

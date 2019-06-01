import React from 'react'

import LoginForm from './LoginForm'
import './Login.css'

const Login = () => {
  return (
    <div className="login-page-wrapper">
      <header>
        <div className="logo-wrapper">Logo</div>
        <div className="login-register-button-wrapper">
          <div className="login-register-button">
            <button className="login-button" disabled>
              Login
            </button>
            <button className="register-button">Register</button>
          </div>
        </div>
      </header>
      <div className="login-register-section-wrapper">
        <div className="login-section">
          <LoginForm />
        </div>
        <div className="register-section">
          <p>Hidden field</p>
        </div>
      </div>
    </div>
  )
}

export default Login

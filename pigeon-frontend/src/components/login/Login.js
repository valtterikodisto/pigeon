import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useApolloClient, useMutation } from 'react-apollo-hooks'

import Header from './Header'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

import { animateHeader, animateLoginRegister } from '../../animations/login'
import './Login.css'

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const REGISTER = gql`
  mutation addUser(
    $username: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    addUser(username: $username, password: $password, firstName: $firstName, lastName: $lastName) {
      value
    }
  }
`

const Login = ({ token, setToken }) => {
  const [loginHidden, setLoginHidden] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [registerError, setRegisterError] = useState(false)
  const login = useMutation(LOGIN)
  const register = useMutation(REGISTER)

  console.log('token:', token)

  const submitLogin = async (username, password) => {
    try {
      const { data } = await login({ variables: { username, password } })
      setToken(data.login.value)
    } catch (error) {
      handleLoginError(error)
    }
  }

  const handleLoginError = error => {
    console.log(error)
    setLoginError(true)
  }

  const submitRegister = async (username, password, firstName, lastName) => {
    try {
      const { data } = await register({ variables: { username, password, firstName, lastName } })
      setToken(data.addUser.value)
    } catch (error) {
      handleRegisterError(error)
    }
  }

  const handleRegisterError = error => {
    if (error && error.message.toLowerCase().includes('username already taken')) {
      setRegisterError(true)
    }
  }

  const toggleLoginRegisterButton = () => {
    setLoginHidden(!loginHidden)
    setLoginError(false)
    setRegisterError(false)
  }

  useEffect(() => {
    animateHeader()
  }, [])

  useEffect(() => {
    animateLoginRegister()
  }, [loginHidden])

  const loginRegisterSection = () => {
    if (loginHidden) {
      return <RegisterForm register={submitRegister} registerError={registerError} />
    } else {
      return <LoginForm login={submitLogin} loginError={loginError} />
    }
  }

  return (
    <div className="login-page-wrapper">
      <Header handleClick={toggleLoginRegisterButton} loginHidden={loginHidden} />
      <div className="login-register-section-wrapper">{loginRegisterSection()}</div>
    </div>
  )
}

export default Login

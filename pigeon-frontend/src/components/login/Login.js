import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useApolloClient, useMutation, useQuery } from 'react-apollo-hooks'

import Navigation from '../navigation/Navigation'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import Animation from '../animation/Animation'

import {
  handleLoginError,
  handleRegisterError
} from '../../helpers/errorhandlers/loginErrorHandler'
import { animateHeader, animateLoginRegister } from '../../animations/login'
import './Login.scss'

const GET_CURRENT_USER = gql`
  query {
    currentUser {
      username
      firstName
      lastName
    }
  }
`

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

const Login = ({ token, setToken, setCurrentUser }) => {
  const [loginHidden, setLoginHidden] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [registerError, setRegisterError] = useState(false)
  const login = useMutation(LOGIN)
  const register = useMutation(REGISTER)
  const getUser = useQuery(GET_CURRENT_USER)

  const submitLogin = async (username, password) => {
    try {
      const { data: loginData } = await login({ variables: { username, password } })
      const { data: userData } = await getUser()

      localStorage.setItem('pigeon-token', loginData.login.value)
      localStorage.setItem('user', userData.currentUser)

      setToken(loginData.login.value)
      setCurrentUser(userData.currentUser)
    } catch (error) {
      const invalidCredentials = handleLoginError(error)
      if (invalidCredentials) {
        setLoginError(true)
      }
    }
  }

  const submitRegister = async (username, password, firstName, lastName) => {
    try {
      const { data: registerData } = await register({
        variables: { username, password, firstName, lastName }
      })
      const { data: userData } = await getUser()

      localStorage.setItem('pigeon-token', registerData.addUser.value)
      localStorage.setItem('user', userData.currentUser)

      setToken(registerData.addUser.value)
      setCurrentUser(userData.currentUser)
    } catch (error) {
      const usernameTaken = handleRegisterError(error)
      if (usernameTaken) {
        setRegisterError(true)
      }
    }
  }

  const toggleLoginRegisterButton = () => {
    setLoginHidden(!loginHidden)
    setLoginError(false)
    setRegisterError(false)
  }

  const loginRegisterSection = () => {
    if (loginHidden) {
      return <RegisterForm register={submitRegister} registerError={registerError} />
    } else {
      return <LoginForm login={submitLogin} loginError={loginError} />
    }
  }

  return (
    <div className="page-wrapper">
      <Animation animation={animateHeader} />
      <Animation animation={animateLoginRegister} effectDependencies={[loginHidden]} />
      <Navigation
        token={token}
        handleLoginButton={toggleLoginRegisterButton}
        handleRegisterButton={toggleLoginRegisterButton}
        setToken={setToken}
      />
      <div className="login-register-section-wrapper">{loginRegisterSection()}</div>
    </div>
  )
}

export default Login

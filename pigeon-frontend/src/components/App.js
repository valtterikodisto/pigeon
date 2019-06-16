import React, { useState } from 'react'

import Chat from './chat/Chat'
import Login from './login/Login'
import Profile from './profile/Profile'
import './App.css'

const App = props => {
  const [token, setToken] = useState(localStorage.getItem('pigeon-token'))

  const changeToken = token => setToken(token)

  if (!token) {
    return <Login token={token} setToken={changeToken} />
  }

  return <Profile token={token} setToken={setToken} />
}

export default App

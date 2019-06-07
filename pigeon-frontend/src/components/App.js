import React, { useState } from 'react'

import Chat from './chat/Chat'
import Login from './login/Login'
import Profile from './profile/Profile'
import './App.css'

const App = props => {
  const [token, setToken] = useState(null)

  const changeToken = token => setToken(token)

  if (!token) {
    return <Login token={token} setToken={changeToken} />
  }

  return <Profile token={token} />
}

export default App

import React, { useState, useEffect } from 'react'

import Chat from './chat/Chat'
import Login from './login/Login'
import Profile from './profile/Profile'
import './App.css'
import './App.scss'

const App = props => {
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('user'))
  const [token, setToken] = useState(localStorage.getItem('pigeon-token'))
  const [chatId, setChatId] = useState(null)
  const changeToken = token => setToken(token)

  if (!token) {
    return <Login token={token} setToken={changeToken} setCurrentUser={setCurrentUser} />
  }
  if (!chatId) {
    return <Profile token={token} setToken={setToken} setChatId={setChatId} />
  }
  return (
    <Chat
      token={token}
      setToken={setToken}
      chatId={chatId}
      setChatId={setChatId}
      currentUser={currentUser}
    />
  )
}

export default App

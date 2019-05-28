import React, { useState, useEffect } from 'react'

import groupService from '../services/groups'

import MessageWindow from './MessageWindow'
import AddMessage from './AddMessage'
import Sidebar from './Sidebar'
import './App.css'

const App = props => {
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  useEffect(() => {
    groupService
      .get()
      .then(group => {
        console.log(group.messages)
        setUsers(group.users)
        setMessages(group.messages)
      })
      .catch(error => console.log('Error when tried to get group'))
  }, [])

  return (
    /*
    Tätä ehdottaisin. Nimet ovat aika itsestään selviä.
    App.css sitten järjestelee nuo elementit.
    <div id="container">
      <Sidebar />
      <section id="main">
        <MessagesList />
        <AddMessage />
      </section>
    </div>
    */
    <div className="container">
      <Sidebar users={users} />
      <div className="main">
        <p>App</p>
        <MessageWindow messages={messages} />
        <AddMessage />
      </div>
    </div>
  )
}

export default App

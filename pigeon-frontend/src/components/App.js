import React, { useState, useEffect } from 'react'

import groupService from '../services/groups'

import MessageWindow from './MessageWindow'

const App = props => {
  const [messages, setMessages] = useState([])
  useEffect(() => {
    groupService
      .get()
      .then(group => {
        console.log(group.messages)
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
    <div>
      <p>App</p>
      <MessageWindow messages={messages} />
    </div>
  )
}

export default App

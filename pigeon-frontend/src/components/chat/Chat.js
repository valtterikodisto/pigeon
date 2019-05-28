import React, { useState, useEffect } from 'react'

import Sidebar from './Sidebar'
import MessageWindow from './MessageWindow'
import AddMessage from './AddMessage'

import groupService from '../../services/groups'

const Chat = () => {
  const [name, setName] = useState('')
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    groupService
      .get()
      .then(group => {
        console.log('GROUP:', group)

        setName(group.name)
        setMessages(group.messages)
        setUsers(group.users)
      })
      .catch(error => console.log('ERROR'))
  }, [])

  return (
    <div className="container">
      <Sidebar users={users} />
      <div className="main">
        <MessageWindow messages={messages} />
        <AddMessage />
      </div>
    </div>
  )
}

export default Chat

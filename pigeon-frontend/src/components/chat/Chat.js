import React, { useState, useEffect } from 'react'

import Sidebar from './Sidebar'
import MessageWindow from './MessageWindow'
import MessageForm from './MessageForm'
import Header from './Header'

import groupService from '../../services/groups'
import userService from '../../services/user'

const Chat = () => {
  const [name, setName] = useState('')
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    groupService
      .get()
      .then(groups => {
        groups.forEach(group => {
          console.log('GROUP:', group)

          setName(group.name)
          setMessages(group.messages)
          setUsers(group.users)

        })
      })
      .catch(error => console.log('ERROR'))
  }, [])

  // Temp solution for getting current user
  useEffect(() => {
    userService
      .getUser()
      .then(user => {
        console.log('Logged in as:', user.username)
        setCurrentUser(user)
      })
      .catch(error => console.log('ERROR'))
  }, [])

  return (
    <div className="container">
      <Header groupName={name} users={users} />
      <div className="main">
        <MessageWindow messages={messages} currentUser={currentUser} />
        <MessageForm />
      </div>
    </div>
  )
}

export default Chat

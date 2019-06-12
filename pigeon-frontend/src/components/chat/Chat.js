import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'

import MessageWindow from './MessageWindow'
import MessageForm from './MessageForm'
import Header from './Header'

import groupService from '../../services/groups'
import userService from '../../services/user'

const ALL_MESSAGES = gql`
  {
    allMessages {
      message
      sender {
        username
        firstName
        lastName
      }
      id
    }
  }
`
const ADD_MESSAGE = gql`
  mutation addMessage($username: String!, $message: String!) {
    addMessage(username: $username, message: $message) {
      sender {
        username
      }
    }
  }
`

const Chat = props => {
  const [name, setName] = useState('')
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const { data, error, loading } = useQuery(ALL_MESSAGES)

  useEffect(() => {
    if (!error && !loading) {
      setMessages(data.allMessages)
    }
  }, [data, error, loading])

  const addMessage = useMutation(ADD_MESSAGE, {
    refetchQueries: [{ query: ALL_MESSAGES }]
  })
  /*
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
  */
  return (
    <div className="container">
      <Header groupName={name} users={users} />
      <div className="main">
        <MessageWindow messages={messages} currentUser={currentUser} />
        <MessageForm addMessage={addMessage} />
      </div>
    </div>
  )
}

export default Chat

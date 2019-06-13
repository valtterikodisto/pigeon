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
  mutation addMessage($chatId: ID!, $message: String!) {
    addMessage(chatId: $chatId, message: $message) {
      sender {
        username
      }
    }
  }
`

const CURRENT_USER = gql`
  {
    currentUser {
      username
      firstName
      lastName
    }
  }
`

const Chat = props => {
  const [name, setName] = useState('')
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState({})
  const { messagesData, messagesError, messagesLoading } = useQuery(ALL_MESSAGES)
  const { currentUserData, currentUserError, currentUserLoading } = useQuery(CURRENT_USER)

  useEffect(() => {
    if (!messagesError && !messagesLoading) {
      setMessages(messagesData.allMessages)
    }
  }, [messagesData, messagesError, messagesLoading])

  useEffect(() => {
    if (!currentUserError && !currentUserError) {
      setCurrentUser(currentUserData)
    }
  }, [currentUserData, currentUserError, currentUserLoading])

  const addMessage = useMutation(ADD_MESSAGE, {
    refetchQueries: [{ query: ALL_MESSAGES }]
  })

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

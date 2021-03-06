import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from 'react-apollo-hooks'
import './Chat.css'

import MessageWindow from './MessageWindow'
import MessageForm from './MessageForm'
import Navigation from '../navigation/Navigation'

const ADD_MESSAGE = gql`
  mutation addMessage($chatId: ID!, $message: String!) {
    addMessage(chatId: $chatId, message: $message) {
      message
      id
    }
  }
`

const GET_CHAT_MESSAGES = gql`
  query getChatMessages($chatId: ID!) {
    getChatMessages(chatId: $chatId) {
      name
      users {
        username
        id
      }
      messages {
        message
        sender {
          username
          firstName
          lastName
        }
        timestamp
        id
      }
      id
    }
  }
`

const Chat = ({ token, setToken, chatId, setChatId, currentUser }) => {
  const [messages, setMessages] = useState([])
  const { data, error, loading } = useQuery(GET_CHAT_MESSAGES, {
    variables: { chatId: chatId }
  })

  useEffect(() => {
    if (data.findChat) {
      setMessages(data.findChat)
    }
  }, [data, error, loading])

  const addMessage = useMutation(ADD_MESSAGE, {
    refetchQueries: [{ query: GET_CHAT_MESSAGES, variables: { chatId: chatId } }]
  })
  return (
    <div className="chat-wrapper">
      <Navigation token={token} setToken={setToken} setChatId={setChatId} />
      <div className="chat-container">
        <MessageWindow
          messages={messages.messages}
          currentUser={currentUser}
          error={error}
          loading={loading}
        />
        <MessageForm chatId={chatId} addMessage={addMessage} />
      </div>
    </div>
  )
}

export default Chat

import React from 'react'
import Message from './Message'
import { useQuery } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'

//Fetches all messages from the messages table, not from any chat.
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

const MessageWindow = ({ messages, currentUser }) => {
  const { data, error, loading } = useQuery(ALL_MESSAGES)

  if (loading) {
    return <div>Loading...</div>
  } else if (error) {
    return <div>Error! {error.message}</div>
  } else {
    const messageRows = () =>
      data.allMessages.map(message => (
        <Message key={message.id} message={message} currentUser={currentUser} />
      ))

    /*
    Saved for later testing purposes.
  const messageRows = () =>
    messages.map(message => (
      <Message key={message.id} message={message} currentUser={currentUser} />
    ))
    */
    return <div className="pigeon-messages-container">{messageRows()}</div>
  }
}

export default MessageWindow

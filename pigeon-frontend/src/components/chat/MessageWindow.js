import React from 'react'
import Message from './Message'

const MessageWindow = ({ messages, currentUser, error, loading }) => {
  if (error) return <p>{error.message}</p>
  if (messages) {
    const messageRows = () =>
      messages.map(message => (
        <Message key={message.id} message={message} currentUser={currentUser} />
      ))

    return <div className="pigeon-messages-container">{messageRows()}</div>
  }

  return (
    <div className="chat-loading">
      <p>loading</p>
    </div>
  )
}

export default MessageWindow

import React from 'react'
import Message from './Message'
import Loading from '../loading/Loading'

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
    <div className="chat-loading-container">
      <Loading id="chat-loading" />
    </div>
  )
}

export default MessageWindow

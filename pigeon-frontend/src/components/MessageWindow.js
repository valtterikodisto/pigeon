import React from 'react'
import Message from './Message'

const MessageWindow = ({ messages }) => {
  const messageRows = () => messages.map(message => <Message key={message.id} message={message} />)

  return <div className="pigeon-messages-container">{messageRows()}</div>
}

export default MessageWindow

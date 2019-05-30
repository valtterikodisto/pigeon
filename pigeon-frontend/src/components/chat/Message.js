import React from 'react'

import './Message.css'

const Message = ({ message, currentUser }) => {
  const messageObject = { ...message, timestamp: new Date(message.timestamp) }
  const sender = { ...messageObject.sender }

  const getMessageClass = () => {
    const isSender = currentUser.username === sender.username

    if (isSender) {
      return 'pigeon-message pigeon-message-sender'
    }
    return 'pigeon-message pigeon-message-reciever'
  }

  const getTimestamp = () => {
    return `${messageObject.timestamp.getHours()}:${messageObject.timestamp.getMinutes()}`
  }

  return (
    <div className={getMessageClass()}>
      <div className="pigeon-message-from">{`${sender.firstName} ${sender.lastName}`}</div>
      <div className="pigeon-message-body">{messageObject.message}</div>
      <div className="pigeon-message-timestamp">{getTimestamp()}</div>
    </div>
  )
}

export default Message

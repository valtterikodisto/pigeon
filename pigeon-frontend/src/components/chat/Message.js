import React from 'react'

const Message = ({ message }) => {
  const messageObject = { ...message, timestamp: new Date(message.timestamp) }
  const sender = { ...messageObject.sender }

  return (
    <div className="pigeon-message">
      <div className="pigeon-message-timestamp">{messageObject.timestamp.toLocaleString()}</div>
      <div className="pigeon-message-sender">{`${sender.firstName} ${sender.lastName}`}</div>
      <div className="pigeon-message-body">{messageObject.message}</div>
    </div>
  )
}

export default Message

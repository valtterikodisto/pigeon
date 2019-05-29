import React from 'react'

const Message = ({ message, currentUser }) => {
  const messageObject = { ...message, timestamp: new Date(message.timestamp) }
  const sender = { ...messageObject.sender }

  console.log('MESSAGE FROM:', sender.username)
  const isSender = currentUser.username === sender.username

  const pigeonMessageFrom = () => (
    <div className="pigeon-message-from">{`${sender.firstName} ${sender.lastName}`}</div>
  )
  const pigeonMessageBody = () => <div className="pigeon-message-body">{messageObject.message}</div>

  const messageFromAndBody = () => {
    if (isSender) {
      return (
        <>
          {pigeonMessageBody()}
          {pigeonMessageFrom()}
        </>
      )
    }

    return (
      <>
        {pigeonMessageFrom()}
        {pigeonMessageBody()}
      </>
    )
  }

  return (
    <div
      className={isSender ? 'pigeon-message-container-sender' : 'pigeon-message-container-reciever'}
    >
      <div className={isSender ? 'pigeon-message-sender' : 'pigeon-message-reciever'}>
        {messageFromAndBody()}
        <div className="pigeon-message-timestamp">{messageObject.timestamp.toLocaleString()}</div>
      </div>
    </div>
  )
}

export default Message

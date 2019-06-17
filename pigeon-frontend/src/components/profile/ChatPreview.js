import React from 'react'

const ChatPreview = ({ chat, setChatId }) => {
  const handleClick = e => {
    setChatId(chat.id)
  }

  const getPreviewMessage = () => {
    if (chat.messages.length > 0) {
      console.log(chat)

      const { sender, message } = chat.messages[0]
      return <div className="chat-preview-message">{`${sender.firstName}: ${message}`}</div>
    }
    return <div className="chat-preview-message no-message">No messages</div>
  }

  return (
    <div onClick={handleClick}>
      <div className="profile-icon-wrapper">
        <div>GR</div>
      </div>
      <div className="chat-preview-name">{chat.name || 'no-name'}</div>
      {getPreviewMessage()}
    </div>
  )
}

export default ChatPreview

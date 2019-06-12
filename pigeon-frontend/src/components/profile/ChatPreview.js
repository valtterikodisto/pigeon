import React from 'react'

const ChatPreview = ({ chat }) => {
  const getPreviewMessage = () => {
    if (chat.messages.length > 0) {
      console.log(chat)

      const { sender, message } = chat.messages[0]
      return <div className="chat-preview-message">{`${sender.firstName}: ${message}`}</div>
    }
    return <div className="chat-preview-message no-message">No messages</div>
  }

  return (
    <div>
      <div className="profile-icon-wrapper">
        <div>GR</div>
      </div>
      <div className="chat-preview-name">{chat.name || 'no-name'}</div>
      {getPreviewMessage()}
    </div>
  )
}

export default ChatPreview

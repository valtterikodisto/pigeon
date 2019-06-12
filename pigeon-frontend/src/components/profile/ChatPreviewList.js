import React from 'react'
import ChatPreview from './ChatPreview'

const ChatPreviewList = ({ chats }) => {
  const chatRow = () => {
    return chats.map(chat => <ChatPreview key={chat.id} chat={chat} />)
  }

  return <div className="chat-preview-list">{chatRow()}</div>
}

export default ChatPreviewList

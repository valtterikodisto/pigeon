import React from 'react'

import ChatPreview from './ChatPreview'

const ChatPreviewList = ({ chats, loading, error }) => {
  if (error) {
    return <div>ERROR {error.message}</div>
  }
  const chatRow = () => {
    if (loading) {
      console.log('LOADING')

      return <div>Loading...</div>
    }

    return chats.map(chat => <ChatPreview key={chat.id} chat={chat} />)
  }

  return <div className="chat-preview-list">{chatRow()}</div>
}

export default ChatPreviewList

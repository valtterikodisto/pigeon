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

    chats.sort((a, b) => {
      const dateA = a.messages.length > 0 ? a.messages[0].timestamp : null
      const dateB = b.messages.length > 0 ? b.messages[0].timestamp : null
      console.log('A:', a)

      return dateB - dateA
    })

    return chats.map(chat => <ChatPreview key={chat.id} chat={chat} />)
  }

  return <div className="chat-preview-list">{chatRow()}</div>
}

export default ChatPreviewList

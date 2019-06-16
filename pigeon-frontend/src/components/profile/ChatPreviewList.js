import React, { useEffect, useRef } from 'react'
import { chatPreviewAnimation } from '../../animations/profile'
import ChatPreview from './ChatPreview'
import Loading from '../loading/Loading'

const ChatPreviewList = ({ state, chats, loading, error }) => {
  const chatPreviewRef = useRef()

  useEffect(() => {
    if (!loading) chatPreviewAnimation(chatPreviewRef.current.children)
  }, [loading])

  if (error) {
    return <div>Could not fetch chats</div>
  }
  const chatRow = () => {
    if (loading)
      return (
        <div className="loading">
          <Loading />
        </div>
      )

    chats.sort((a, b) => {
      const dateA = a.messages.length > 0 ? a.messages[0].timestamp : null
      const dateB = b.messages.length > 0 ? b.messages[0].timestamp : null

      return dateB - dateA
    })

    return (
      <div className="chat-preview-list" ref={chatPreviewRef}>
        {chats.map(chat => (
          <ChatPreview key={chat.id} chat={chat} />
        ))}
      </div>
    )
  }

  return <>{chatRow()}</>
}

export default ChatPreviewList

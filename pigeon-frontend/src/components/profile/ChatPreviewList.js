import React, { useEffect, useRef } from 'react'
import { chatPreviewAnimation } from '../../animations/profile'
import ChatPreview from './ChatPreview'
import Loading from '../loading/Loading'

const ChatPreviewList = ({ state, chats, loading, error, setChatId }) => {
  const chatPreviewRef = useRef()

  useEffect(() => {
    if (!loading && chatPreviewRef.current) chatPreviewAnimation(chatPreviewRef.current.children)
  }, [loading])

  if (error) {
    return <div>Could not fetch chats</div>
  }
  const chatRow = () => {
    if (loading) return <Loading />

    chats.sort((a, b) => {
      const dateA = a.messages.length > 0 ? a.messages[0].timestamp : null
      const dateB = b.messages.length > 0 ? b.messages[0].timestamp : null

      return dateB - dateA
    })

    return (
      <div className="chat-preview-list" ref={chatPreviewRef}>
        {chats.map(chat => (
          <ChatPreview key={chat.id} chat={chat} setChatId={setChatId} />
        ))}
      </div>
    )
  }

  return <>{chatRow()}</>
}

export default ChatPreviewList

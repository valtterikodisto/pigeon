import React from 'react'

const Topbar = ({ chat, setChatId }) => {
  const handleClick = () => {
    setChatId(null)
  }
  if (chat.findChat) {
    console.log('users: ', chat)
    return (
      <div className="chat-header-wrapper">
        <div className="chat-header-container">
          <button onClick={handleClick}>nappi</button>
          <div className="header-group-name" align="center">
            {chat.findChat.name}
          </div>
          <ul className="header-users-list">
            {chat.findChat.users.map(user => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
  return <p>loading</p>
}

export default Topbar

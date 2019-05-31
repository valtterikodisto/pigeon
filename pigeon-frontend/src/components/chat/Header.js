import React from 'react'

const Topbar = props => {
  return (
    <div className="header">
      <div className="header-container">
        <div className="header-group-name" align="center">
          {props.groupName}
        </div>
        <ul className="header-users-list">
          {props.users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Topbar

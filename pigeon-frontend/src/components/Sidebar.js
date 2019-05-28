import React from 'react'

const Sidebar = props => {
  return (
    <aside className="sidebar">
      <ul>
        {props.users.map(u => (
          <li key={u.id}>{u.username}</li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar

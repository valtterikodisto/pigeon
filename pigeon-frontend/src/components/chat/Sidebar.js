import React from 'react'
import { isConditional } from '@babel/types'

const Sidebar = props => {
  const handleClick = () => {
    console.log('painettu')
    const bar = document.getElementById('sidebar')
    console.log(bar.offsetWidth)
    bar.style.width = bar.offsetWidth === 150 ? '25px' : '150px'
  }

  return (
    <aside className="sidebar" id="sidebar" onClick={handleClick}>
      <button className="close-button" onClick={handleClick}>
        close
      </button>
      <ul>
        {props.users.map(u => (
          <li key={u.id}>{u.username}</li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar

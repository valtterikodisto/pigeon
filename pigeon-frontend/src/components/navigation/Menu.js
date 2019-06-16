import React, { useState, useEffect } from 'react'

import './Menu.scss'
import { animateMenuOpening } from '../../animations/navigation'

const Menu = ({ handleLogout }) => {
  const [open, setOpen] = useState(null)

  useEffect(() => {
    if (open) {
      animateMenuOpening()
    }
  }, [open])

  const handleClick = () => {
    setOpen(!open)
  }

  const toggleMenu = () => {
    if (open) {
      return (
        <>
          <div className="menu-close-button" onClick={handleClick}>
            CLOSE
          </div>
          <div className="menu">
            <ul>
              <li>Menu Item</li>
              <li>Menu Item</li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </>
      )
    }

    return (
      <div className="menu-button" onClick={handleClick}>
        <div className="menu-rectangle rectangle" />
        <div className="menu-rectangle rectangle" />
        <div className="menu-rectangle rectangle" />
      </div>
    )
  }

  return <>{toggleMenu()}</>
}

export default Menu

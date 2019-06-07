import React, { useState, useEffect } from 'react'
import anime from 'animejs'

import './styles/Menu.css'
import {
  animateMenuHoverIn,
  animateMenuHoverOut,
  animateMenuOpening,
  animateMenuClosing
} from '../../animations/navigation'

const Menu = () => {
  const [open, setOpen] = useState(null)

  useEffect(() => {
    if (open) {
      animateMenuOpening()
    }
  }, [open])

  const handleClick = () => {
    // if (!open) {
    //   animateMenuOpening()
    // } else {
    //   animateMenuClosing()
    // }
    setOpen(!open)
  }

  const toggleMenu = () => {
    if (open) {
      return (
        <>
          <div className="menu-close-button" onClick={handleClick}>
            CLOSE
          </div>
          <div className="menu" />
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

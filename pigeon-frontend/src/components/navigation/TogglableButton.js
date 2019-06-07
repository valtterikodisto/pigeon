import React, { useState } from 'react'
import './styles/TogglableButton.css'

const TogglableButton = ({ leftText, rigthText, handleLeftToggle, handleRightToggle }) => {
  const [leftDisabled, setLeftDisabled] = useState(true)

  const leftToggle = () => {
    if (!leftDisabled) {
      setLeftDisabled(true)
      handleLeftToggle()
    }
  }

  const rightToggle = () => {
    if (leftDisabled) {
      setLeftDisabled(false)
      handleRightToggle()
    }
  }

  return (
    <div className="togglable-button-wrapper">
      <button onClick={leftToggle} className="togglable-button-left" disabled={leftDisabled}>
        {leftText}
      </button>
      <button onClick={rightToggle} className="togglable-button-right" disabled={!leftDisabled}>
        {rigthText}
      </button>
    </div>
  )
}

export default TogglableButton

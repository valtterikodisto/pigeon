import React from 'react'
import sendIcon from '../../pictures/send-icon.svg'

const AddMessage = props => {
  return (
    <div className="message-form-container">
      <form className="message-form">
        <input type="text" placeholder="Type your message here.." />
        <span />
      </form>
      <img id="send-icon" src={sendIcon} alt="send icon" />
    </div>
  )
}

export default AddMessage

import React, { useState } from 'react'

import sendIcon from '../../pictures/send-icon.svg'

const MessageForm = props => {
  const [message, setMessage] = useState('')

  const submit = async e => {
    e.preventDefault()

    await props.addMessage({
      //Add username that is found in the database
      variables: { username: 'kasper', message }
    })

    setMessage('')
  }

  return (
    <div className="message-form-container">
      <form className="message-form" onSubmit={submit}>
        <input
          type="text"
          placeholder="Type your message here.."
          value={message}
          onChange={({ target }) => setMessage(target.value)}
        />
        <span />
      </form>
      <img id="send-icon" src={sendIcon} alt="send icon" />
    </div>
  )
}

export default MessageForm

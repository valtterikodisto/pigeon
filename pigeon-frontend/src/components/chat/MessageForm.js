import React, { useState } from 'react'

import sendIcon from '../../pictures/send-icon.svg'

const MessageForm = props => {
  const [message, setMessage] = useState('')

  const submit = async e => {
    e.preventDefault()
    const chatId = '123'
    await props.addMessage({
      //
      variables: { chatId: chatId, message }
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

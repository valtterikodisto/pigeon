import React from 'react'

const AddMessage = props => {
  return (
    <section className="new-message">
      <form className="new-message-form">
        <input type="text" placeholder="Type your message here" />
      </form>
    </section>
  )
}

export default AddMessage

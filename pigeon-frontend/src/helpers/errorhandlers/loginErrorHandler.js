export const handleLoginError = error => {
  const message = getMessage(error)
  return messageIncludes(message, 'Invalid credentials')
}

export const handleRegisterError = error => {
  const message = getMessage(error)
  return messageIncludes(message, 'Username already taken')
}

const getMessage = error => {
  return error && error.message ? error.message : null
}

const messageIncludes = (message, text) => {
  return message && message.toLowerCase().includes(text.toLowerCase())
}

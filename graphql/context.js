const JWT_SECRET = process.env.SECRET
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const context = async ({ req }) => {
  const auth = req ? req.headers.authorization : null
  if (auth && auth.toUpperCase().startsWith('BEARER ')) {
    const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
    const currentUser = await User.findById(decodedToken.id)

    return { currentUser }
  }
}

module.exports = context

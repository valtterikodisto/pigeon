const { UserInputError } = require('apollo-server')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const Message = require('../models/message')
const Chat = require('../models/chat')

//Add required queries and mutations.

const JWT_SECRET = process.env.SECRET

const resolvers = {
  Query: {
    currentUser: (root, args, context) => {
      return context.currentUser
    },
    allUsers: (root, args) => {
      return User.find({})
    },
    allMessages: (root, args) => {
      return Message.find({})
    }
  },
  Mutation: {
    addUser: async (root, args) => {
      const saltRounds = 10
      const password = await bcrypt.hash(args.password, saltRounds)
      const newUser = new User({ ...args, password })
      console.log(newUser)

      try {
        await newUser.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

      return newUser
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      const authSuccessful =
        user === null ? false : await bcrypt.compare(args.password, user.password)

      if (!authSuccessful) {
        throw new UserInputError('Invalid username or password')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
    addMessage: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      console.log(user)
      if (!user) {
        return null
      }

      const newMessage = new Message({ sender: user, ...args })
      console.log(newMessage)

      try {
        await newMessage.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return newMessage
    }
  }
}

module.exports = resolvers

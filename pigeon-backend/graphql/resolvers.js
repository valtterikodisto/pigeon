const { UserInputError, ValidationError } = require('apollo-server')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const Message = require('../models/message')
const Friendship = require('../models/friendship')
const Chat = require('../models/chat')
const User = require('../models/user')

//Getting users friendships doesn't work. Problem with the mongoose models.

const JWT_SECRET = process.env.SECRET

const resolvers = {
  Query: {
    currentUser: (root, args, context) => {
      return context.currentUser
    },
    findUser: async (root, args, context) => {
      return await User.findById(args.id)
    },
    allUsers: async (root, args) => {
      return await User.find({}).populate('chats')
    },
    allMessages: async (root, args) => {
      return await Message.find({}).populate('sender')
    },
    allChats: async (root, args, { currentUser }) => {
      // Loads only the newest message
      console.log(currentUser)

      const user = await User.findById(currentUser.id)
        .populate({
          path: 'chats',
          populate: {
            path: 'messages',
            options: {
              sort: { timestamp: -1 },
              limit: 1
            },
            populate: {
              path: 'sender'
            }
          }
        })
        .populate('friendship') // Get chats from here and combine

      return user.chats
    },
    findChat: (root, args, context) => {
      return Chat.findById(args.id)
    },
    findChatUsers: (root, args, context) => {
      return Chat.findById(args.id).users
    }
  },
  Mutation: {
    addUser: async (root, args) => {
      const saltRounds = 10
      const password = await bcrypt.hash(args.password, saltRounds)
      const newUser = new User({ ...args, password })

      try {
        const user = await newUser.save()
        if (user) console.log(`User ${user.username} created`)

        const userForToken = {
          username: user.username,
          id: user._id
        }

        return await { value: jwt.sign(userForToken, JWT_SECRET) }
      } catch (error) {
        console.log('error:', error.name)

        if (error.name === 'MongoError') {
          throw new ValidationError('Username already taken')
        } else {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      const authSuccessful =
        user === null ? false : await bcrypt.compare(args.password, user.password)

      if (!authSuccessful) {
        throw new UserInputError('Invalid credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
    addMessage: async (root, { chatId, message }, { currentUser }) => {
      if (!currentUser || !currentUser.chats.includes(chatId)) {
        throw new Error('Forbidden')
      }

      const chat = await Chat.findById(chatId)

      const newMessage = new Message({
        chat,
        message,
        sender: currentUser.id,
        timestamp: new Date()
      })

      chat.messages = chat.messages.concat(newMessage)

      try {
        await newMessage.save()
        await chat.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return newMessage
    },
    addChat: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new Error('User not authenticated')
      }
      const users = [currentUser]
      console.log(users)
      const newChat = new Chat({ ...args, users: users })
      console.log(newChat)
      try {
        await newChat.save()
        currentUser.chats = currentUser.chats.concat(newChat)
        await currentUser.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: context
        })
      }
      return newChat
    },
    addUserToChat: async (root, args, context) => {
      const chat = await Chat.findById(args.chatId)
      if (!chat) {
        throw new UserInputError('Chat not found')
      }

      const user = await User.findById(args.userId)
      if (!user) {
        throw new UserInputError('User not found')
      }

      if (chat.users.includes(user.id)) {
        throw new Error('User is already in the chat.')
      }

      console.log(JSON.stringify(chat))
      chat.users = chat.users.concat(user.id)
      user.chats = user.chats.concat(chat.id)
      try {
        chat.save()
        user.save()
      } catch (error) {
        console.log('error:', error.name)
      }
      return user
    },
    editChatName: async (root, args, context) => {
      const chat = await Chat.findById(args.chatId)
      if (!chat) {
        throw new UserInputError('Chat not found')
      }

      chat.name = args.name

      try {
        chat.save()
      } catch (error) {
        console.log('error:', error.message)
      }

      return chat
    },
    addFriendship: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new Error('User not authenticated')
      }

      const friend = await User.findById(args.friendsId)
      if (!friend) {
        throw new Error('Friend not found')
      }

      const users = [currentUser, friend]
      const newChat = new Chat({ users: users })
      const newFriendship = new Friendship({ chat: newChat })
      //console.log(JSON.stringify(newChat))
      console.log(JSON.stringify(newFriendship))

      try {
        await newChat.save()
        await newFriendship.save()
        currentUser.friendships = currentUser.friendships.concat(newFriendship)
        friend.friendships = friend.friendships.concat(newFriendship)
        await currentUser.save()
        await friend.save()
      } catch (error) {
        throw new UserInputError(error.message)
      }

      return newFriendship
    }
  }
}

module.exports = resolvers

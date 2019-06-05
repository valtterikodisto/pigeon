require('dotenv').config()

const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('./models/user')
const Message = require('./models/message')
const Group = require('./models/group')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.SECRET

//TODO, move to the file typedefs in the folder graphql
//Add all required fields to User and Message
const typeDefs = gql`
  type User {
    username: String!
    firstName: String!
    lastName: String!
    groups: [Group]
    id: ID!
  }

  type Token {
    value: String!
  }

  type Message {
    sender: User
    message: String
  }

  type Group {
    name: String!
    users: [User]
    messages: [Message]
  }

  type Query {
    currentUser: User
    allUsers: [User]!
    allMessages: [Message]!
  }

  type Mutation {
    addUser(username: String!, password: String!, firstName: String!, lastName: String!): User
    login(username: String!, password: String!): Token
    addMessage(username: String, message: String): Message
  }
`

//TODO move to the file resolvers in the folder graphql.
//Add required queries and mutations.

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

console.log('connecting to ', MONGODB_URI)

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('Error connecting to MongDB: ', error.message)
  })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toUpperCase().startsWith('BEARER ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)

      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

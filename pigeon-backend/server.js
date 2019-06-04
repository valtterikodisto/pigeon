require('dotenv').config()

const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')

const User = require('./models/user')
const Message = require('./models/message')
const Group = require('./models/group')

mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI

//TODO, move to the file typedefs in the folder graphql
//Add all required fields to User and Message
const typeDefs = gql`
  type User {
    username: String!
    password: String!
    firstName: String!
    lastName: String!
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
    allUsers: [User]!
    allMessages: [Message]!
  }

  type Mutation {
    addUser(username: String!, password: String!, firstName: String!, lastName: String!): User
    addMessage(username: String, message: String): Message
  }
`

//TODO move to the file resolvers in the folder graphql.
//Add required queries and mutations.

const resolvers = {
  Query: {
    allUsers: (root, args) => {
      return User.find({})
    },
    allMessages: (root, args) => {
      return Message.find({})
    }
  },
  Mutation: {
    addUser: async (root, args) => {
      const newUser = new User({ ...args })
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
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

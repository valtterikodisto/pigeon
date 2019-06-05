const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    username: String!
    firstName: String!
    lastName: String!
    chats: [Chat]
    friendships: [Friendship]
    id: ID!
  }

  type Friendship {
    chat: Chat!
  }

  type Token {
    value: String!
  }

  type Message {
    sender: User
    message: String
  }

  type Chat {
    name: String
    users: [User!]!
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
module.exports = typeDefs

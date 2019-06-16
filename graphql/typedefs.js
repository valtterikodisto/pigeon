const { gql } = require('apollo-server-express')

const typeDefs = gql`
  scalar Date

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
    sender: User!
    message: String!
    timestamp: Date!
    id: ID!
  }

  type Chat {
    name: String
    users: [User!]!
    messages: [Message]
    id: ID!
  }

  type Query {
    currentUser: User
    findUser(id: ID!): User
    allUsers: [User]!
    allMessages: [Message]!
    allChats: [Chat]!
    findChat(id: ID!): Chat
    findChatUsers(id: ID!): [User]
  }

  type Mutation {
    addUser(username: String!, password: String!, firstName: String!, lastName: String!): Token
    login(username: String!, password: String!): Token
    addMessage(chatId: ID!, message: String!): Message
    addChat(name: String): Chat
    addUserToChat(chatId: ID!, userId: ID!): User
    editChatName(chatId: ID!, name: String!): Chat
    addFriendship(friendId: ID!): Friendship
  }
`
module.exports = typeDefs

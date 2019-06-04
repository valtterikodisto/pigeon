require('dotenv').config()


const { ApolloServer, UserInputError, gql } = require('apollo-server')
const mongoose = require('mongoose')

const User = require('./models/user')
const Message = require('./models/message')
const Group = require('./models/group')


mongoose.set('useFindAndModify', false)

const MONGODB_URI = process.env.MONGODB_URI


//TODO, move to the file typedefs in the folder graphql
const typeDefs = gql`
    type User {
        username: String!
        firstName: String!
        lastName: String!
    }

    type Message {
        sender: User!
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
        addUser(
            username: String!
            firstName: String!
            lastName: String!
        ): User
        addMessage(
        sender: String!
        message: String
        ): Message
    }
`

//Temporary user. May delete
const user =
{
    username: "UserNameTemp",
    firstName: "FirstNameTemp",
    lastName: "LastNameTemp",
}

//Temporary array of. May delete
let users = [
    user
]

//Temporary message. May delete
const message = {
    sender: user,
    message: "Hello world!"
}

//Temporary array of messages. May delete
let messages = [
    message
]

//TODO move to the file resolvers in the folder graphql.
const resolvers = {
    Query: {
        allUsers: () => users,
        allMessages: () => messages,
    },
    Mutation: {
        addUser: (root, args) => {
            const newUser = { ...args }
            users = users.concat(newUser)
            return newUser
        },
        addMessage: (root, args) => {
            const newMessage = { ...args }
            messages = messages.concat(newMessage)
            return newMessage
        }
    }
}

console.log('connecting to ', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongDB: ', error.message)
    })



const server = new ApolloServer({
    typeDefs,
    resolvers,

})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
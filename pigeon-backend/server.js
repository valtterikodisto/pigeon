require('dotenv').config()
const PORT = process.env.PORT || 4000

const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongo = require('./mongo')

mongo.connect()
const app = express()

const typeDefs = require('./graphql/typedefs')
const resolvers = require('./graphql/resolvers')
const context = require('./graphql/context')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
})
server.applyMiddleware({ app })

app.listen({ port: PORT }, () => {
  console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`)
})

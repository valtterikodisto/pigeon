require('dotenv').config()
const JWT_SECRET = process.env.SECRET

const { ApolloServer } = require('apollo-server')
const mongo = require('./mongo')
const jwt = require('jsonwebtoken')

const typeDefs = require('./graphql/typedefs')
const resolvers = require('./graphql/resolvers')

const User = require('./models/user')

mongo.connect()

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

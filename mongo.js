require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI

const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)

const connect = async () => {
  console.log('Connecting to MongoDB..')

  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('Error connecting to MongDB: ', error.message)
  }
}

const mongo = { connect }

module.exports = mongo

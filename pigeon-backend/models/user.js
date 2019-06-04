const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  firstName: {
    type: String,
    required: true,
    minglength: 3
  },
  lastName: {
    type: String,
    required: true,
    minglength: 3
  },
  lastSeen: {
    type: Date
  }
  //groups
})

module.exports = mongoose.model('User', schema)

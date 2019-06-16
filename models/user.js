const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 100
  },
  firstName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 20
  },
  lastSeen: {
    type: Date
  },
  chats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat'
    }
  ],
  friendships: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Friendship'
    }
  ]
})

module.exports = mongoose.model('User', schema)

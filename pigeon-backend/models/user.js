const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
      ref: 'Friendship '
    }
  ]
})

module.exports = mongoose.model('User', schema)

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
    required: true
  }
})

module.exports = mongoose.model('Friendship', schema)

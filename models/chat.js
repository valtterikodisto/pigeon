const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }
  ]
})

module.exports = mongoose.model('Chat', schema)

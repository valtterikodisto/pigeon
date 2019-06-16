const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const schema = new mongoose.Schema({
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat',
    required: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  message: {
    type: String,
    required: true
  }
})

schema.plugin(mongoosePaginate)

module.exports = mongoose.model('Message', schema)

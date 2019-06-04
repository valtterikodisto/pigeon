const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timestapn: {
        type: Date,

    },
    message: {
        type: String,
    }
})

module.exports = mongoose.model('Message', schema)
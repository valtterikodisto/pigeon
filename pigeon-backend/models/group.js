const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message'
        }
    ]
})

module.exports = mongoose.model('Group', schema)
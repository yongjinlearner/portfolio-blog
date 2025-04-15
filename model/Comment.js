const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    username: {
        type: String,
        default: 'Anonymous',
        required: false
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Comment', CommentSchema)
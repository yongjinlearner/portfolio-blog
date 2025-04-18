const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date(),
        required: true
    }
})

module.exports = mongoose.model('Blog', BlogSchema)
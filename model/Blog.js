const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    blogName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Blog', BlogSchema)
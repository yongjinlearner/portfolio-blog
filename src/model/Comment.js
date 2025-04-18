const mongoose = require('mongoose');

// Define the schema for the Comment
const CommentSchema = new mongoose.Schema({
    blogId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Blog', 
        required: true
    },
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
});
module.exports = mongoose.model('Comment', CommentSchema);

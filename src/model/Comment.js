const mongoose = require('mongoose');
console.log('Starting to define CommentSchema...');

// Define the schema for the Comment
const CommentSchema = new mongoose.Schema({
    blogID: {
        type: Number,
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

console.log('CommentSchema defined successfully.');

console.log('Exporting the model...');
module.exports = mongoose.model('Comment', CommentSchema);

console.log('Model exported.');

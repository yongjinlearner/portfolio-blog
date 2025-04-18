const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    token: {
        type: String,
        required: false
    },
    confirmed: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('User', UserSchema)
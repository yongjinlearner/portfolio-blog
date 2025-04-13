const express = require('express')
const path = require('path')
require('dotenv').config()
const router = express.Router()
const User = require('../model/User')
const emailAuth = require('../email/emailAuth')
const crypto = require('crypto')

router.post('/subscribe', async (req, res) => {
    const token = crypto.randomBytes(20).toString('hex')
    try {
        const { email } = req.body
        const newUser = new User({
            email: email,
            token: token,
            confirmed: false
        })

        await newUser.save()
        emailAuth(email, token)

        console.log(`${email} was saved to your database. Waiting for email confirmation`)
        res.status(200).sendFile(path.join(__dirname, '../public/confirmation.html'));
    } catch (error) {
        console.error('Could not add email to database', error)
        res.status(500).send('There was an issue with collecting your email')
    }
})

router.get('/confirm', async (req, res) => {
    const { token } = req.query
    try {
        const user = await User.findOne({ token: token })
        if (!user) {
            return res.status(400).send('Invalid or missing token.');
        }
        user.confirmed = true;
        await user.save();
        res.status(200).sendFile(path.join(__dirname, '../public/emailConfirmed.html'));
    } catch (error) {
        console.error("There was an error with confirming this user's email", error)
        res.status(500).send('Sorry, there was an error with confirming your email :(')
    }
})

module.exports = router
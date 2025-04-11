const express = require('express')
const path = require('path')
require('dotenv').config()
const router = express.Router()
const bodyParser = require('body-parser');
const sendEmail = require('../email/emailSender')

router.get('/admin', (req, res) => {
    if (req.session.loggedIn) {
        res.sendFile(path.join(__dirname, '../admin/admin.html'));
    } else {
        res.sendFile(path.join(__dirname, '../admin/login.html'));
    }
});

// Handle login form
router.post('/admin/login', (req, res) => {
    const passcode = req.body.passcode;
    if (passcode === process.env.ADMIN_PASS) {
        req.session.loggedIn = true;
        res.redirect('/admin');
    } else {
        res.send('Wrong passcode. <a href="/admin">Try again</a>.');
    }
});

router.post('/admin/send', async (req, res) => {
    const { subject, text } = req.body
    try {
        await sendEmail(subject, text)
        res.send('Messages have been sent! <a href="/admin">Back to admin</a>.')
    } catch (error) {
        res.status(500).send('There was an error with sending the email')
        console.log('There was a problem with inputting the subject and title')
    }
})

module.exports = router
const express = require('express')
const path = require('path')
require('dotenv').config()
const router = express.Router()
const User = require('../model/User')

const checkForDuplicate = async (req, res) => {
    // checks if the submitted email is already in the database
}

router.post('/submit', async (req,res)=>{
    try {
        const { email } = req.body
        const newUser = new User({email})
        await newUser.save()
        console.log(`${email} was saved to your database`)
        res.status(200).sendFile(path.join(__dirname, '../public/confirmation.html'));
    } catch (error) {
        console.error('Could not add email to database')
        res.status(500).send('There was an issue with collecting your email')
    }
})

module.exports = router
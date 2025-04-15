const express = require('express')
const path = require('path')
const router = express.Router()
const Comment = require('../model/Comment')

router.post('/comment', async (req, res) => {
    try {
        const { username, comment } = req.body
        const newComment = new Comment({
            username: username,
            comment: comment,
            date: Date.now()
        })

        await newComment.save()
        console.log(`Comment was saved to your database. Page should automatically reload now`)
        res.redirect('/blogs/test-blog.html');
    } catch (error) {
        console.error('Could not add comment to database', error)
        res.status(500).send('There was an issue with posting your comment')
    }
})

module.exports = router
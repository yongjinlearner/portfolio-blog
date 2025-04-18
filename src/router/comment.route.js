const express = require('express')
const path = require('path')
const router = express.Router()
const Comment = require('../model/Comment')
const User = require('../model/User')

router.post('/comment', async (req, res) => {
    try {
        const { username, comment } = req.body
        const newComment = new Comment({
            blogID: 0,
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

router.get('/displayComment', async (req, res) => {
    try {
        const comments = await Comment.find();
        const mappedComments = comments.map(comment => ({
            username: comment.username,
            comment: comment.comment
        }));
        return res.json(mappedComments);
    } catch (err) {
        console.error("Could not fetch comments:", err);
        return res.status(500).json({ error: "Could not fetch comments" });
    }
});

module.exports = router
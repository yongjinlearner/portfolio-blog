const express = require('express')
const path = require('path')
const router = express.Router()
const Comment = require('../model/Comment')
const User = require('../model/User')

router.post('/sendComment/:blogId', async (req, res) => {
    try {
        const { author, content } = req.body; // Match the keys sent from the frontend
        const { blogId } = req.params;
        console.log(blogId)

        const newComment = new Comment({
            blogId: blogId,
            author: author, // Map 'author' to 'username'
            content: content, // Map 'content' to 'comment'
            date: Date.now()
        });

        await newComment.save();
        console.log(`🔥 Comment saved to the database for blog ${blogId}.`);
        res.json({message: "Comment was successfully added"});
    } catch (error) {
        console.error('💀 Could not add comment to database:', error);
        res.status(500).send('😭 Oops, something went wrong while posting your comment.');
    }
});

router.get('/showComment/:blogId', async (req, res) => {
    try {
        const { blogId } = req.params; // Extract blogId from the route parameters
        const comments = await Comment.find({ blogId: blogId }); // Use the extracted blogId
        const mappedComments = comments.map(comment => ({
            author: comment.author,
            content: comment.content,
            date: new Date(comment.date).toLocaleString()
        }));
        return res.json(mappedComments); // Send the mapped comments as JSON
    } catch (err) {
        console.error("💀 Could not fetch comments:", err);
        return res.status(500).json({ error: "Could not fetch comments" });
    }
});

module.exports = router
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Post= require('../models/Post');

router.post('/fetchallposts', async (req, res) => {
    try {
        const posts = await Post.find({ board_name: req.body.board_name });
        res.json(posts)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/fetchyourposts', async (req, res) => {
    try {
        const posts = await Post.find({ user: req.body.user });
        res.json(posts)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/addpost', [
    body('description', 'Description must be atleast 25 characters').isLength({ min: 25 }),], async (req, res) => {
        try {
            const { user, board_name,post_title, description,image_url } = req.body;
            const post = new Post({
                user, board_name,post_title, description,image_url
            })
            const savedPost = await post.save()

            res.json(savedPost)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

    router.put('/updatepost/:id', async (req, res) => {
        const { title,description,image_url } = req.body;
        try {
            const newPost = {};
            if (title) { newPost.post_title = title };
            if (description) { newPost.description = description };
            if (image_url) { newPost.image_url = image_url };
    
            // Find the note to be updated and update it
            let post = await Post.findById(req.params.id);
            if (!post) { return res.status(404).send("Not Found") }
            post = await Post.findByIdAndUpdate(req.params.id, { $set: newPost }, { new: true })
            res.json({ post });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

    router.put('/likepost/:id', async (req, res) => {
        const {liked_users,likes} = req.body;
        try {
            const post = await Post.findById(req.params.id);
            const newPost = {};
            newPost.liked_users = liked_users;
            newPost.likes = likes ;

            if (!post) { return res.status(404).send("Not Found") }
            post = await Post.findByIdAndUpdate(req.params.id, { $set: newPost }, { new: true })
            res.json({ post });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })


    router.delete('/deletepost/:id',async (req, res) => {
        try {
            let post = await Post.findById(req.params.id);
            if (!post) { return res.status(404).send("Not Found") }
    
            // Allow deletion only if user owns this Note
    
            post = await Post.findByIdAndDelete(req.params.id)
            res.json({ "Success": "Note has been deleted", note: post });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })
    module.exports = router
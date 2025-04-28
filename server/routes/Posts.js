const express = require('express');
const router = express.Router();
const { Posts } = require('../models')

// get all the Posts
router.get('/', async (req, res) => {     // req (request), res (response)
    const allPosts = await Posts.findAll();
    res.json(allPosts);
});

// create a new Post
router.post('/', async (req, res) => {
    const post = req.body;
    await Posts.create(post);
    res.json(post);
})

module.exports = router;
const express = require('express');
const router = express.Router();
const { Posts, Likes, Comments } = require("../models")
const { validateToken } = require("../middlewares/AuthMiddleware");

// get all the Posts
router.get('/', async (req, res) => {     // req (request), res (response)
    const allPosts = await Posts.findAll({ include: [Likes] });
    res.json(allPosts);
});

// get one post with its id
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const post = await Posts.findByPk(id, { include: [Likes] });  // find by Primary Key
    res.json(post);
});

// create a new Post
router.post('/', validateToken, async (req, res) => {
    const post = req.body;
    post.username = req.user.username;
    await Posts.create(post);
    res.json(post);
});

// delete a Post
router.delete("/:postId", validateToken, async (req, res) => {
    const postId = req.params.postId;

    await Posts.destroy({where: { id: postId }});
    res.json(`Post #${postId} destroyed`);
});

module.exports = router;
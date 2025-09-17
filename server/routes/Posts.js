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

// get the posts from one user (using the user's id)
router.get("/byUserId/:id", async (req, res) => {
    const id = req.params.id;
    const listOfPosts = await Posts.findAll({
        where: {UserId: id},
        include: [Likes]
    });  // find by the User's id
    res.json(listOfPosts);
});

// create a new Post
router.post('/', validateToken, async (req, res) => {
    const post = req.body;
    post.username = req.user.username;
    post.UserId = req.user.id;

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
const express = require('express');
const router = express.Router();
const { Comments } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

// get all the comments from the post defined by 'postId'
router.get("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const comments = await Comments.findAll({where: { PostId: postId }});  // find by postId
  res.json(comments);
});

// Create a new comment
router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  comment.username = req.user.username;

  await Comments.create(comment);
  res.json(comment);
});

router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;

  await Comments.destroy({where: { id: commentId }});
  res.json(`Comment #${commentId} destroyed`);
});

module.exports = router;
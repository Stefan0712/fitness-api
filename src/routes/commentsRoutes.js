const express = require('express');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const User = require('../models/userModel');
const authenticateUser = require('../middlewares/authenticate');

const router = express.Router();



// Get all comments for a post
router.get('/:postId', async (req, res)=>{
    const {postId} = req.params;
    try{
        const comments = await Comment.find({postId}).populate('author', 'username _id').populate('comments');
        if(!comments){
            return res.status(404).json({ message: 'Comments not found' });
        }
        res.status(200).json(comments);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})

// Create a comment
router.post('/:postId', authenticateUser, async (req, res) => {
    try {
      const { body, parentId } = req.body;
      const { postId } = req.params;
      const authorId = req.user.id;
  
      const commentData = {
        author: authorId,
        postId,
        body,
        parentId,
        createdAt: new Date()
      };
  
      // Create and save the comment
      const newComment = new Comment(commentData);
      const savedComment = await newComment.save();
  
      if (parentId) {
        // Find the parent comment
        const parentComment = await Comment.findById(parentId);
  
        // Check if the parent already has a parentId (i.e., it’s a nested comment)
        if (parentComment.parentId) {
          return res.status(400).json({ message: "A comment can only have one parent. You can't add more comments to this comment" });
        }
  
        // Push the new comment ID to the parent's comments array
        await Comment.findByIdAndUpdate(parentId, {
          $push: { comments: savedComment._id }
        });
      }
  
      // Update the user and post with the new comment
      await User.findByIdAndUpdate(authorId, {
        $push: { createdComments: savedComment._id }
      });
  
      if(!parentId){
        await Post.findByIdAndUpdate(postId, {
            $push: { comments: savedComment._id }
          });
      }
  
      // Respond with the created comment
      res.status(201).json(savedComment);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating comment' });
    }
  });
  


router.post('/status-post', authenticateUser, async (req, res) => {
    try {
      const {title, body, tags, privacy} = req.body;
      if (!title || !body || !privacy) {
        return res.status(400).json({ message: "Missing required fields" });
      }      
      const createdAt = new Date();
      const newStatusPost = {
        author: req.user.id,
        type: 'status',
        title,
        body,
        tags: Array.isArray(tags) ? tags : [],
        privacy,
        createdAt,
        likes: [],
        comments: [],

      }
  
      const newPost = new StatusPost(newStatusPost);
      const savedPost = await newPost.save();
  
      await User.findByIdAndUpdate(req.user.id, {
        $push: { createdPosts: savedPost._id }
      });
  
      res.status(201).json(savedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating post' });
    }
  });
  

  router.put('/:id', authenticateUser, async(req,res)=>{
    const {id} = req.params;
    const userId = req.user.id;
    
    try{
        const post = await Post.findById(id);
        if (!post) {
        return res.status(404).json({ message: "Post not found." });
        }

        // Check if the logged-in user is the author of the post
        if (post.author.toString() !== userId) {
        return res.status(403).json({ message: "You are not authorized to edit this post." });
        }

        const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "Post updated successfully", post: updatedPost });      
  } catch (error) {
        res.status(500).json({ message: 'Error updating post' });
  }});

  router.delete('/:id', authenticateUser, async (req, res) => {
    const userId = req.user.id;
    try {
      if (!userId) {
        return res.status(404).json({ message: 'You are not authenticated.' });
      }
  
      const post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
  
      const userData = await User.findById(userId);
  
      if (post.author.toString() === userId || userData.role === 'admin') {
        await Post.findByIdAndDelete(req.params.id);
        await User.findByIdAndUpdate(userId, {
            $pull: { createdPosts: req.params.id }
          });
        return res.status(200).json({ message: 'Post deleted successfully' });
      } else {
        return res.status(403).json({ message: 'You do not have the permission to delete this post' });
      }
      
    } catch (error) {
      res.status(500).json({ message: 'Error deleting post' });
    }
  });


  router.put('/:id/like', authenticateUser, async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;
  
    try {
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: 'Post not found.' });
      }
  
      const alreadyLiked = post.likes.includes(userId);
  
  
      if (alreadyLiked) {
        await Post.findByIdAndUpdate(id, { $pull: { likes: userId } });
        await User.findByIdAndUpdate(userId, { $pull: { likedPosts: id } });
      } else {
        await Post.findByIdAndUpdate(id, { $addToSet: { likes: userId } });
        await User.findByIdAndUpdate(userId, { $addToSet: { likedPosts: id } });
      }
      const updatedPost = await Post.findById(id)
      res.status(200).json(updatedPost);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error toggling like' });
    }
  });



module.exports = router;

  
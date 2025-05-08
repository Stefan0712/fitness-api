const express = require('express');
const Post = require('../models/postModel');
const StatusPost = require('../models/statusPostModel.ts');
const User = require('../models/userModel');
const authenticateUser = require('../middlewares/authenticate');

const router = express.Router();



router.get('/', async (req, res)=>{
    try{
        const posts = await Post.find().populate('author', 'username _id');
        const statusPosts = await StatusPost.find().populate('author', 'username _id');
        if(!posts || !statusPosts){
            return res.status(404).json({ message: 'Posts not found' });
        }
        const sorted = [...posts, ...statusPosts].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        res.status(200).json(sorted);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})

router.get('/:postId', async (req, res)=>{
    const {postId} = req.params;
    try{
        const post = await Post.findById(postId).populate('author', 'username _id');
        if(!post){
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
})
router.post('/', authenticateUser, async (req, res) => {
    try {
      const postData = req.body;
      postData.author = req.user.id;
  
      const newPost = new Post(postData);
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

  
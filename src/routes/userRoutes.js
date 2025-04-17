const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const authenticateUser = require('../middlewares/authenticate');


const router = express.Router();


router.get('/private', authenticateUser, async (req, res) => {
    const userId = req.user.id; 
    console.log(req.body)
    try {
        const user = await User.findById(userId);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            message: 'Private profile data',
            user: user
        });
    } catch (error) {
        console.error('Error finding user:', error.message);
        return res.status(500).json({ message: 'Server error' });
    }
    
});








module.exports = router;
const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModel');
const authenticateUser = require('../middlewares/authenticate');


const router = express.Router();


router.get('/private', authenticateUser, async (req, res) => {
    const userId = req.user.id; 
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


// Get profile info for the edit page
router.get('/update-user', authenticateUser, async (req, res)=>{
    const userId = req.user.id; 
    try {
        const user = await User.findById(userId);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }
        const profileData = {
            username: user.username,
            name: user.name,
            bio: user.bio,
            age: user.age,
            gender: user.gender,
            height: user.height,
            weight: user.weight,
            profileSettings: user.profileSettings
        }
        res.status(200).json({
            message: 'Profile data for updating user profile',
            user: profileData
        });
    } catch (error) {
        console.error('Error finding user:', error.message);
        return res.status(500).json({ message: 'Server error' });
    }
})

// Update user's profile
router.put('/update-user', authenticateUser, async (req, res)=>{
    try {
        const {
            username,
            name,
            bio,
            age,
            gender,
            height,
            weight,
            profileSettings
        } = req.body;
        // Validate inputs
        const updatedFields = {
            ...(username && { username }),
            ...(name && { name }),
            ...(bio && { bio }),
            ...(age && { age }),
            ...(gender && { gender }),
            ...(height && { height }),
            ...(weight && { weight }),
            ...(profileSettings && { profileSettings })
        };
        const user = await User.findByIdAndUpdate(req.user.id,
            { $set: updatedFields },
            { new: true } 
        );
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'Successfully updated profile',
        });
    } catch (error) {
        console.error('Error finding user:', error.message);
        return res.status(500).json({ message: 'Server error' });
    }
})







module.exports = router;
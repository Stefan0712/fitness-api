const express = require('express');
const router = express.Router();
const Food = require('../models/foodModel');
const User = require('../models/userModel');
const authenticateUser = require('../middlewares/authenticate');

// Create a new food
router.post('/', authenticateUser, async (req, res) => {
  try {
    const food = new Food({ ...req.body, userId: req.user.id });
    await food.save();

    await User.findByIdAndUpdate(req.user.id, {
      $push: { createdFood: food._id }
    });

    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create food' });
  }
});

// Get a food by ID
router.get('/:id', authenticateUser, async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ error: 'Food not found' });

    res.json(food);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get food' });
  }
});

// Update a food
router.put('/:id', authenticateUser, async (req, res) => {
  try {
    const food = await Food.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!food) return res.status(403).json({ error: 'Not allowed' });

    res.json(food);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update food' });
  }
});

// Delete a food
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const food = await Food.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!food) return res.status(403).json({ error: 'Not allowed' });

    await User.findByIdAndUpdate(req.user.id, {
      $pull: {
        createdFood: food._id,
        savedFood: food._id,
        favoriteFood: food._id
      }
    });

    res.json({ message: 'Food deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete food' });
  }
});

// Save/unsave food (make a copy and save/remove)
router.post('/save/:id', authenticateUser, async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ error: 'Food not found' });

    const existing = await Food.findOne({
      originalId: food._id,
      userId: req.user.id
    });

    if (existing) {
      await Food.findByIdAndDelete(existing._id);
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { savedFood: existing._id }
      });
      return res.json({ message: 'Food unsaved' });
    }

    const copy = new Food({
      ...food.toObject(),
      _id: undefined,
      originalId: food._id,
      userId: req.user.id
    });
    await copy.save();

    await User.findByIdAndUpdate(req.user.id, {
      $push: { savedFood: copy._id }
    });

    res.json(copy);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save/unsave food' });
  }
});

// Favorite/unfavorite food
router.post('/favorite/:id', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const foodId = req.params.id;

    const isFavorited = user.favoriteFood.includes(foodId);
    const update = isFavorited
      ? { $pull: { favoriteFood: foodId } }
      : { $addToSet: { favoriteFood: foodId } };

    await User.findByIdAndUpdate(req.user.id, update);
    res.json({ message: isFavorited ? 'Unfavorited' : 'Favorited' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle favorite' });
  }
});

// Get all of user's foods
router.get('/my/all', authenticateUser, async (req, res) => {
  try {
    const foods = await Food.find({ userId: req.user.id });
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch your foods' });
  }
});

// Get all food (e.g., public food list)
router.get('/', authenticateUser, async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch foods' });
  }
});

module.exports = router;

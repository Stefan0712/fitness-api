const express = require('express');
const router = express.Router();
const MealPlan = require('../models/MealPlan');
const User = require('../models/User');
const authenticateUser = require('../middleware/authenticateUser');

// Create a meal plan
router.post('/', authenticateUser, async (req, res) => {
  try {
    const plan = new MealPlan({ ...req.body, userId: req.user.id });
    await plan.save();

    await User.findByIdAndUpdate(req.user.id, {
      $push: { createdMealPlans: plan._id }
    });

    res.status(201).json(plan);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create meal plan' });
  }
});

// Get a single meal plan
router.get('/:id', authenticateUser, async (req, res) => {
  try {
    const plan = await MealPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ error: 'Meal plan not found' });

    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get meal plan' });
  }
});

// Update a meal plan
router.put('/:id', authenticateUser, async (req, res) => {
  try {
    const plan = await MealPlan.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!plan) return res.status(403).json({ error: 'Not allowed' });

    res.json(plan);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update meal plan' });
  }
});

// Delete a meal plan
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const plan = await MealPlan.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!plan) return res.status(403).json({ error: 'Not allowed' });

    await User.findByIdAndUpdate(req.user.id, {
      $pull: {
        createdMealPlans: plan._id,
        savedMealPlans: plan._id,
        favoriteMealPlans: plan._id
      }
    });

    res.json({ message: 'Meal plan deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete meal plan' });
  }
});

// Save / Unsave meal plan (create copy)
router.post('/save/:id', authenticateUser, async (req, res) => {
  try {
    const plan = await MealPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ error: 'Meal plan not found' });

    const existing = await MealPlan.findOne({
      originalId: plan._id,
      userId: req.user.id
    });

    if (existing) {
      await MealPlan.findByIdAndDelete(existing._id);
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { savedMealPlans: existing._id }
      });
      return res.json({ message: 'Meal plan unsaved' });
    }

    const copy = new MealPlan({
      ...plan.toObject(),
      _id: undefined,
      originalId: plan._id,
      userId: req.user.id
    });

    await copy.save();

    await User.findByIdAndUpdate(req.user.id, {
      $push: { savedMealPlans: copy._id }
    });

    res.json(copy);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save/unsave meal plan' });
  }
});

// Favorite / Unfavorite meal plan
router.post('/favorite/:id', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const planId = req.params.id;

    const isFavorited = user.favoriteMealPlans.includes(planId);
    const update = isFavorited
      ? { $pull: { favoriteMealPlans: planId } }
      : { $addToSet: { favoriteMealPlans: planId } };

    await User.findByIdAndUpdate(req.user.id, update);

    res.json({ message: isFavorited ? 'Unfavorited' : 'Favorited' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle favorite meal plan' });
  }
});

// Get all of user's meal plans
router.get('/my/all', authenticateUser, async (req, res) => {
  try {
    const plans = await MealPlan.find({ userId: req.user.id });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch your meal plans' });
  }
});

// Get all meal plans
router.get('/', authenticateUser, async (req, res) => {
  try {
    const plans = await MealPlan.find();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch meal plans' });
  }
});

module.exports = router;

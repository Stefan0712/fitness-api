const express = require('express');
const router = express.Router();
const ActivityPlan = require('../models/ActivityPlan');
const User = require('../models/User');
const authenticateUser = require('../middleware/authenticateUser');
const ActivityDayTemplate = require('../models/activityDayTemplateModel');

// Create an activity plan
router.post('/', authenticateUser, async (req, res) => {
  try {
    const plan = new ActivityPlan({ ...req.body, userId: req.user.id });
    await plan.save();

    await User.findByIdAndUpdate(req.user.id, {
      $push: { createdActivityPlans: plan._id }
    });

    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create activity plan' });
  }
});

// Get a single activity plan
router.get('/:id', authenticateUser, async (req, res) => {
  try {
    const plan = await ActivityPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ error: 'Plan not found' });

    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity plan' });
  }
});

// Edit an activity plan
router.put('/:id', authenticateUser, async (req, res) => {
  try {
    const plan = await ActivityPlan.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!plan) return res.status(403).json({ error: 'Not allowed' });

    res.json(plan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update plan' });
  }
});

// Delete an activity plan
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const plan = await ActivityPlan.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!plan) return res.status(403).json({ error: 'Not allowed' });

    await User.findByIdAndUpdate(req.user.id, {
      $pull: {
        createdActivityPlans: plan._id,
        savedActivityPlans: plan._id,
        favoriteActivityPlans: plan._id
      }
    });

    res.json({ message: 'Activity plan deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete activity plan' });
  }
});

// Save / Unsave an activity plan (copy)
router.post('/save/:id', authenticateUser, async (req, res) => {
  try {
    const plan = await ActivityPlan.findById(req.params.id);
    if (!plan) return res.status(404).json({ error: 'Plan not found' });

    const existing = await ActivityPlan.findOne({
      originalId: plan._id,
      userId: req.user.id
    });

    if (existing) {
      await ActivityPlan.findByIdAndDelete(existing._id);
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { savedActivityPlans: existing._id }
      });
      return res.json({ message: 'Activity plan unsaved' });
    }

    const copy = new ActivityPlan({
      ...plan.toObject(),
      _id: undefined,
      originalId: plan._id,
      userId: req.user.id
    });
    await copy.save();

    await User.findByIdAndUpdate(req.user.id, {
      $push: { savedActivityPlans: copy._id }
    });

    res.json(copy);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save/unsave plan' });
  }
});

// Favorite / Unfavorite an activity plan
router.post('/favorite/:id', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const planId = req.params.id;

    const isFavorited = user.favoriteActivityPlans.includes(planId);
    const update = isFavorited
      ? { $pull: { favoriteActivityPlans: planId } }
      : { $addToSet: { favoriteActivityPlans: planId } };

    await User.findByIdAndUpdate(req.user.id, update);
    res.json({ message: isFavorited ? 'Unfavorited' : 'Favorited' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to toggle favorite' });
  }
});

// Get all of user's activity plans
router.get('/my/all', authenticateUser, async (req, res) => {
  try {
    const plans = await ActivityPlan.find({ userId: req.user.id });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch your activity plans' });
  }
});

// Get all activity plans (e.g., public feed)
router.get('/', authenticateUser, async (req, res) => {
  try {
    const plans = await ActivityPlan.find();
    res.json(plans);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch activity plans' });
  }
});
const ActivityDayTemplate = require('../models/activityDayTemplateModel');

// Save a day as a reusable template
router.post('/save-day-template', authenticateUser, async (req, res) => {
  try {
    const { name, description, tags, day } = req.body;

    if (!name || !day) {
      return res.status(400).json({ error: 'Name and day object are required' });
    }

    const template = new ActivityDayTemplate({
      userId: req.user.id,
      name,
      description,
      tags,
      day
    });

    await template.save();
    res.status(201).json(template);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save day template' });
  }
});

module.exports = router;

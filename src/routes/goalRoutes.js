const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authenticateUser');

const Goal = require('../models/goalModel');
const Log = require('../models/logModel');

// Create a new goal
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { name, unit, target, icon, color } = req.body;

    const goal = new Goal({
      userId: req.user.id,
      name,
      unit,
      target,
      icon,
      color,
    });

    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create goal' });
  }
});

// Get all goals for user
router.get('/', authenticateUser, async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.id });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch goals' });
  }
});

// Get a specific goal by ID
router.get('/:id', authenticateUser, async (req, res) => {
  try {
    const goal = await Goal.findOne({ _id: req.params.id, userId: req.user.id });
    if (!goal) return res.status(404).json({ error: 'Goal not found' });
    res.json(goal);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch goal' });
  }
});

// Update a goal
router.put('/:id', authenticateUser, async (req, res) => {
  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!goal) return res.status(404).json({ error: 'Goal not found' });
    res.json(goal);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update goal' });
  }
});

// Delete a goal
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!goal) return res.status(404).json({ error: 'Goal not found' });
    res.json({ message: 'Goal deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete goal' });
  }
});

// Log progress to a goal
router.post('/:id/log', authenticateUser, async (req, res) => {
  try {
    const goal = await Goal.findOne({ _id: req.params.id, userId: req.user.id });
    if (!goal) return res.status(404).json({ error: 'Goal not found' });

    const { value, time, description } = req.body;

    const log = new Log({
      userId: req.user.id,
      type: 'goal',
      name: goal.name,
      icon: goal.icon,
      timestamp: new Date(),
      data: {
        value,
        time,
        description,
        name: goal.name,
        unit: goal.unit,
      },
    });

    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: 'Failed to log goal progress' });
  }
});

module.exports = router;

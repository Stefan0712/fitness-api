const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authenticateUser');
const Log = require('../models/logModel');
const mongoose = require('mongoose');

// Add a log
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { type, name, icon, timestamp, data } = req.body;

    const log = new Log({
      userId: req.user.id,
      type,
      name,
      icon,
      timestamp: timestamp || new Date(),
      data
    });

    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create log' });
  }
});

// Get a log by ID
router.get('/:id', authenticateUser, async (req, res) => {
  try {
    const log = await Log.findOne({ _id: req.params.id, userId: req.user.id });
    if (!log) return res.status(404).json({ error: 'Log not found' });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch log' });
  }
});

// Edit a log
router.put('/:id', authenticateUser, async (req, res) => {
  try {
    const log = await Log.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!log) return res.status(404).json({ error: 'Log not found' });
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update log' });
  }
});

// Delete a log
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const log = await Log.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!log) return res.status(404).json({ error: 'Log not found' });
    res.json({ message: 'Log deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete log' });
  }
});

// Get all logs for a day by type
router.get('/day/:type/:date', authenticateUser, async (req, res) => {
  try {
    const { type, date } = req.params;
    const dayStart = new Date(date);
    const dayEnd = new Date(dayStart);
    dayEnd.setHours(23, 59, 59, 999);

    const logs = await Log.find({
      userId: req.user.id,
      type,
      timestamp: { $gte: dayStart, $lte: dayEnd }
    });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch day logs' });
  }
});

// Get all logs for a week by type (from start date)
router.get('/week/:type/:startDate', authenticateUser, async (req, res) => {
  try {
    const { type, startDate } = req.params;
    const weekStart = new Date(startDate);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const logs = await Log.find({
      userId: req.user.id,
      type,
      timestamp: { $gte: weekStart, $lte: weekEnd }
    });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch week logs' });
  }
});

module.exports = router;

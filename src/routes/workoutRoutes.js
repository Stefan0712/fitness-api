const express = require('express');
const Workout = require('../models/workoutModel');
const User = require('../models/userModel');
const authenticateUser = require('../middlewares/authenticate');
const mongoose = require('mongoose');

const router = express.Router();

// Protect all routes
router.use(authenticateUser);

// Get all workouts
router.get('/', async (req, res) => {
  try {
    const workouts = await Workout.find().populate('exercises');
    res.status(200).json(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Get user's workouts (saved, favorite, created)
router.get('/my-workouts', authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      saved: user.savedWorkouts,
      favorites: user.favoriteWorkouts,
      created: user.createdWorkouts,
    });
  } catch (error) {
    console.error('Error fetching user workouts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Get a specific workout
router.get('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id).populate('phases.exercises');
    if (!workout) return res.status(404).json({ message: 'Workout not found' });
    res.status(200).json(workout);
  } catch (error) {
    console.error('Error fetching workout:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a workout
router.post('/',authenticateUser, async (req, res) => {
  const {
    authorId, name, source, description, reference,
    difficulty, duration, durationUnit,
    visibility, imageUrl, targetGroups,
    exercises, tags, equipment, phases
  } = req.body;
  console.log(phases)
  try {
    const newWorkout = new Workout({
      authorId,
      name,
      source,
      description,
      reference,
      difficulty,
      duration,
      durationUnit,
      visibility,
      imageUrl,
      targetGroups,
      exercises,
      tags,
      equipment,
      phases: phases.map(phase => ({...phase, exercises: phase.exercises.map(id => new mongoose.Types.ObjectId(id))})),
      isCompleted: false,
      createdAt: new Date(),
      authorId: req.user.id
    });

    const savedWorkout = await newWorkout.save();

    await User.findByIdAndUpdate(
      req.userId,
      { $addToSet: { createdWorkouts: savedWorkout._id } }
    );

    res.status(201).json({message: 'Successfully created a new workout'});
  } catch (error) {
    console.error('Error creating workout:', error);
    res.status(500).json({ message: 'Error creating workout' });
  }
});


// Update a workout
router.put('/:id', async (req, res) => {
  try {
    const updatedWorkout = await Workout.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedWorkout) return res.status(404).json({ message: 'Workout not found' });
    res.json(updatedWorkout);
  } catch (error) {
    console.error('Error updating workout:', error);
    res.status(500).json({ message: 'Error updating workout' });
  }
});

// Delete a workout
router.delete('/:id', async (req, res) => {
  try {
    const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);
    if (!deletedWorkout) return res.status(404).json({ message: 'Workout not found' });

    await User.findByIdAndUpdate(req.userId, {
      $pull: {
        createdWorkouts: deletedWorkout._id,
        savedWorkouts: deletedWorkout._id,
        favoriteWorkouts: deletedWorkout._id
      }
    });

    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (error) {
    console.error('Error deleting workout:', error);
    res.status(500).json({ message: 'Error deleting workout' });
  }
});

// Add or remove workout from savedWorkouts
router.post('/save/:id', authenticateUser, async (req, res) => {
  const userId = req.user.id;
  const workoutId = req.params.id;
  try {
    const user = await User.findById(userId);
    const index = user.savedWorkouts.indexOf(workoutId) || [];

    if (index === -1) {
      user.savedWorkouts.push(workoutId);
      await user.save();
      return res.status(200).json({ message: 'Workout successfully added to saved workouts' });
    } else {
      user.savedWorkouts.splice(index, 1);
      await user.save();
      return res.status(200).json({ message: 'Workout successfully removed from saved workouts' });
    }
  } catch (error) {
    console.error('Error saving workout:', error);
    res.status(500).json({ message: 'Error saving workout' });
  }
});


// Add or remove workout from favoriteWorkouts
router.post('/favorite/:id', authenticateUser, async (req, res) => {
  try {
    const workoutId = req.params.id;
    const user = await User.findById(req.user.id);

    const alreadyFavorited = user.favoriteWorkouts.includes(workoutId) || [];
    const message = alreadyFavorited ? "Workout removed from favorites" : "Workout saved to favorites";
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { [alreadyFavorited ? '$pull' : '$addToSet']: { favoriteWorkouts: workoutId } },
      { new: true }
    );

    res.status(200).json({ message });
  } catch (error) {
    console.error('Error favoriting workout:', error);
    res.status(500).json({ message: 'Error favoriting workout' });
  }
});

module.exports = router;

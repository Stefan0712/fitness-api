const express = require('express');
const Exercise = require('../models/exerciseModel');

const router = express.Router();

// CREATE a new exercise
router.post('/', async (req, res) => {
  const {
    sourceId,
    createdAt,
    author,
    source,
    isFavorite,
    isCompleted,
    name,
    description,
    reference,
    difficulty,
    sets,
    duration,
    durationUnit,
    rest,
    restUnit,
    visibility,
    fields,
    notes,
    equipment,
    muscleGroups,
    tags,
    instructions,
  } = req.body;

  try {
    const newExercise = new Exercise({
      sourceId,
      source,
      createdAt,
      author,
      isFavorite,
      isCompleted,
      name,
      description,
      reference,
      difficulty,
      sets,
      duration,
      durationUnit,
      rest,
      restUnit,
      visibility,
      fields,
      notes,
      equipment,
      muscleGroups,
      tags,
      instructions,
    });

    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (error) {
    res.status(500).json({ message: 'Error creating exercise' });
  }
});

// GET all exercises
router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exercises' });
  }
});

// GET a specific exercise by ID
router.get('/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.json(exercise);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exercise' });
  }
});

// UPDATE an exercise by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedExercise = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedExercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.json(updatedExercise);
  } catch (error) {
    res.status(500).json({ message: 'Error updating exercise' });
  }
});

// DELETE an exercise by ID
router.delete('/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting exercise' });
  }
});




module.exports = router;

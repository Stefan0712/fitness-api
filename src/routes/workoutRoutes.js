const express = require('express');
const mongoose = require('mongoose');
const Workout = require('../models/workoutModel');



const router = express.Router();


// Get all workouts
router.get('/', async (req, res) =>{
    try{
        const workouts = await Workout.find();

        res.status(200).json(workouts);
    } catch (error){
        console.error('Error fetching workouts:', error);
        res.status(500).json({message: 'Serve error'})
    }
});

// Create a workout
router.post('/', async (req, res) =>{
  const {
    createdAt, 
    authorId,
    isCompleted, 
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
  } = req.body;

  try{
    const newWorkout = new Workout({
      createdAt, 
      authorId,
      isCompleted, 
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
    })
    await newWorkout.save();
    res.status(201).json({ message: 'Workout created successfully' });
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error creating workout' });
  }
});

// Get a specific workout
router.get('/:id', async (req, res) =>{
    try {
        const { id } = req.params; // Get the id from the request parameters
    
        // Check if the id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: 'Invalid ID format' });
        }
    
        // Find the workout by id
        const workout = await Workout.findById(id).populate('exercises');
    
        // If the workout doesn't exist, send a 404 response
        if (!workout) {
          return res.status(404).json({ message: 'Workout not found' });
        }
    
        // Send the workout as a response
        res.status(200).json(workout);
      } catch (error) {
        // Handle any errors that occur during the query
        console.error('Error fetching workout:', error);
        res.status(500).json({ message: 'Server error' });
      }
   
});

// Update a specific workout
router.patch('/:id', (req, res) =>{

});

// Delete a specific workout
router.delete('/:id', (req, res) =>{

});



module.exports = router;



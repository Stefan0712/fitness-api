const express = require('express');
const Exercise = require('../models/exerciseModel');
const User = require('../models/userModel');
const authenticateUser = require('../middlewares/authenticate');

const router = express.Router();

// CREATE a new exercise
router.post('/', authenticateUser, async (req, res) => {
  const userId = req.user.id;
  if(!userId){
    return res.status(404).json({ message: 'You are not authenticated.' });
  };
  const {
    createdAt,
    authorId,
    source,
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
      createdAt,
      authorId,
      source,
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

    const createdExercise = await newExercise.save();

    if(createdExercise){
      const userData = await User.findById(userId);
      userData.createdExercises.push(createdExercise._id);
      await userData.save();
    }

    res.status(201).json(newExercise);
  } catch (error) {
    console.error(error)
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
router.get('/view/:id', authenticateUser, async (req, res) => {
  const userId = req.user.id;
  const userData = await User.findById(userId);
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }
    if ((exercise.isPrivate && userId !== exercise.authorId) || userData.role==='admin') {
      return res.status(404).json({ message: 'Exercise is private' });
    }
    res.json(exercise);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exercise' });
  }
});

// UPDATE an exercise by ID
router.put('/:id', authenticateUser, async (req, res) => {
try {
    const exerciseId = req.params.id; 
    const userId = req.user.id;


    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: "Exercise not found." });
    }

    // Check if the logged-in user is the author of the exercise
    if (exercise.authorId.toString() !== userId) {
      return res.status(403).json({ message: "You are not authorized to edit this exercise." });
    }

    await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json({message: "Exercise updated successfully"});
  } catch (error) {
    res.status(500).json({ message: 'Error updating exercise' });
  }
});

// DELETE an exercise by ID
router.delete('/:id', authenticateUser, async (req, res) => {
  const userId = req.user.id;
  try {
    if (!userId) {
      return res.status(404).json({ message: 'You are not authenticated.' });
    }

    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' });
    }

    const userData = await User.findById(userId);

    if (exercise.authorId.toString() === userId || userData.role === 'admin') {
      await Exercise.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: 'Exercise deleted successfully' });
    } else {
      return res.status(403).json({ message: 'You do not have the permission to delete this exercise' });
    }
    
  } catch (error) {
    res.status(500).json({ message: 'Error deleting exercise' });
  }
});


// Get all three arrays of exercises
router.get('/my-exercises', authenticateUser, async (req, res) => {
  const userId = req.user.id;
  console.log("User id is :", userId)
  try {
    const userData = await User.findById(userId)

    if (!userData) {
      return res.status(404).json({ message: "User not found." });
    }

    const exercises = {
      favorites: userData.favoriteExercises,
      created: userData.createdExercises,
      saved: userData.savedExercises
    };

    res.status(200).json({ exercises });

  } catch (error) {
    console.error("There has been an error fetching all three exercises arrays:", error);
    res.status(500).json({ message: 'There has been an error fetching all three exercises arrays.' });
  }
});


// Add to favorites
router.post('/:id/favorite', authenticateUser, async (req, res)=>{
  try{
    const userId = req.user.id;
    const exerciseId = req.params.id;

    // Check if the exercise exists
    const exercise = await Exercise.findById(exerciseId);
    if(!exercise){
      return res.status(404).json({message: "Exercise not found."})
    };

    const user = await User.findById(userId);

    if(user.favoriteExercises.includes(exerciseId)) {
      return res.status(400).json({message: "Exercise already in favorites."})
    };

    // If the exercise is not in favorites and it exists, then add it to favorites
    user.favoriteExercises.push(exerciseId);
    await user.save();

    return res.status(200).json({message: "Exercise added to favorites."})
  } catch (error) {
    console.error('Error adding to favorites: ',error);
    return res.status(500).json({message: "Failed to add exercise to favorites. Server Error."})
  }
})
// Remove from favorites
router.delete('/:id/favorite', authenticateUser, async (req, res)=>{
  try{
    const userId = req.user.id;
    const exerciseId = req.params.id;

    if(!userId){
      return res.status(404).json({message: "You are not authenticated."})
    };
    // Check if the exercise exists
    const exercise = await Exercise.findById(exerciseId);
    if(!exercise){
      return res.status(404).json({message: "Exercise not found."})
    };

    const user = await User.findById(userId);

    if(!user.favoriteExercises.includes(exerciseId)) {
      return res.status(400).json({message: "Exercise is not in favorites."})
    };

    // If the exercise is in favorites and it exists, then remove it to favorites
    const newFavoriteExercises = user.favoriteExercises.filter(item=>item!=exerciseId);
    user.favoriteExercises = newFavoriteExercises;
    await user.save();

    return res.status(200).json({message: "Exercise removed from favorites."})
  } catch (error) {
    console.error('Error removing from favorites: ',error);
    return res.status(500).json({message: "Failed to remove exercise from favorites. Server Error."})
  }
})
// Add to saved exercises
router.post('/:id/saved', authenticateUser, async (req, res)=>{
  try{
    const userId = req.user.id;
    const exerciseId = req.params.id;

    // Check if the exercise exists
    const exercise = await Exercise.findById(exerciseId);
    if(!exercise){
      return res.status(404).json({message: "Exercise not found."})
    };

    const user = await User.findById(userId);

    if(user.savedExercises.includes(exerciseId)) {
      return res.status(400).json({message: "Exercise already in saved exercises."})
    };

    // If the exercise is not in saved and it exists, then add it to saved
    user.savedExercises.push(exerciseId);
    await user.save();

    return res.status(200).json({message: "Exercise added to saved exercises."})
  } catch (error) {
    console.error('Error adding to saved exercises: ',error);
    return res.status(500).json({message: "Failed to add exercise to saved exercises. Server Error."})
  }
})
// Remove from saved exercises
router.delete('/:id/saved', authenticateUser, async (req, res)=>{
  try{
    const userId = req.user.id;
    const exerciseId = req.params.id;
    if(!userId){
      return res.status(404).json({message: "You are not authenticated."})
    };

    // Check if the exercise exists
    const exercise = await Exercise.findById(exerciseId);
    if(!exercise){
      return res.status(404).json({message: "Exercise not found."})
    };
    const user = await User.findById(userId);

    if(!user.savedExercises.includes(exerciseId)) {
      return res.status(400).json({message: "Exercise is not in favorites."})
    };

    // If the exercise is in saved exercises and it exists, then remove
    const newSavedExercises = user.savedExercises.filter(item=>item!=exerciseId);
    user.savedExercises = newSavedExercises;
    await user.save();

    return res.status(200).json({message: "Exercise removed from saved exercises."})
  } catch (error) {
    console.error('Error removing from saved exercises: ',error);
    return res.status(500).json({message: "Failed to remove exercise from saved exercises. Server Error."})
  }
})


module.exports = router;

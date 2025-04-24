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
router.post('/favorite/:id', authenticateUser, async (req, res)=>{
  try {
    const exerciseId = req.params.id;
    const user = await User.findById(req.user.id);

    const alreadyFavorited = user.favoriteExercises.includes(exerciseId);
    const message = alreadyFavorited ? "Exercise removed from favorites" : "Exercise added to favorites";
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { [alreadyFavorited ? '$pull' : '$addToSet']: { favoriteExercises: exerciseId } },
      { new: true }
    );

    res.status(200).json({ message });
  } catch (error) {
    console.error('Error favoriting exercise:', error);
    res.status(500).json({ message: 'Error favoriting exercise' });
  }
})
// Add to saved exercises
router.post('/save/:id', authenticateUser, async (req, res)=>{
  try {
    const exerciseId = req.params.id;
    const user = await User.findById(req.user.id);

    const alreadySaved = user.savedExercises.includes(exerciseId);
    const message = alreadySaved ? "Exercise removed from library" : "Exercise saved to library";
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { [alreadySaved ? '$pull' : '$addToSet']: { savedExercises: exerciseId } },
      { new: true }
    );

    res.status(200).json({ message});
  } catch (error) {
    console.error('Error saving exercise:', error);
    res.status(500).json({ message: 'Error saving exercise' });
  }
})


module.exports = router;

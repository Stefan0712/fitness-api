const {exercises } = require('./mockExercises.js');
const {workouts } = require('./mockWorkouts.js');
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const dotenv = require('dotenv');
dotenv.config();

const Exercise = require('../models/exerciseModel.js');
const Workout = require('../models/workoutModel.js');




// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/fitness-db')
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
});




const seedDatabase = async () => {
    try {
      // Clear existing data
      await Exercise.deleteMany();
      await Workout.deleteMany();
  
      // Insert predefined exercises into the Exercise collection
      const formatedExercises = exercises.map((exercise) => {
        return { 
          ...exercise, 
          _id: new ObjectId(exercise.id)  // Convert string `id` to ObjectId 
        };
      });

      const exerciseDocs = await Exercise.insertMany(formatedExercises);
      console.log('Exercises seeded:', exerciseDocs);
  
      // Insert predefined workouts into the Workout collection, using the exercise IDs
      const formatedWorkouts = workouts.map((workout) => {
        return { 
          ...workout, 
          _id: new ObjectId(workout.id)  // Convert string `id` to ObjectId 
        };
      });
      const workoutDocs = await Workout.insertMany(formatedWorkouts);
      console.log('Workouts seeded:', workoutDocs);
  
      // Close the connection
      mongoose.connection.close();
    } catch (err) {
      console.error('Error seeding database:', err);
      mongoose.connection.close();
    }
  };
  
  // Run the seeding function
  seedDatabase();
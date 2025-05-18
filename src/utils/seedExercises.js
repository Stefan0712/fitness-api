// scripts/seedExercises.js
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Exercise = require('../models/exerciseModel.js');
const defaultExercises = require('../utils/defaultExercises.js');


dotenv.config();

// Connect to your MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
    console.error(err);
    process.exit(1);
    });


// Main seed function
const seedExercises = async () => {
  try {
    const existing = await Exercise.find({}, 'name'); // get the names of already existing exercises
    const existingNames = new Set(existing.map(e => e.name)); // check for duplicate names 

    const newExercises = defaultExercises.filter(ex => !existingNames.has(ex.name)); // filter only exercises that are not in the databse already

    await Exercise.insertMany(newExercises); // insert them into the database
    console.log(`Seeded ${created.length} exercises`); 
    process.exit();
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
};

seedExercises();

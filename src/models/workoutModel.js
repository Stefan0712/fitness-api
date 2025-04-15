const mongoose = require('mongoose')

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
  targetGroups: [{
    type: Object, 
    required: true,
  }],
  duration: {
    type: Number, 
    required: true,
  },
  equipment: [{
    type: Object, 
    required: true,
  }],
  exercises: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
  authorId: {
    type: String,
    required: true,
  },
  source: {
    type: String,
  },
  authorId: {
    type: String,
  },
  imageUrl: String,
  isCompleted: {
    type: Boolean,
    default: false,
  },
  visibility: {
    type: String,
    required: true,
    default: false
  },
  tags: [{
    type: Object, 
  }],
  reference: {
    type: String,
    default: ''
  },
});



const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;

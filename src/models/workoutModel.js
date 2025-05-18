const mongoose = require('mongoose');
const PhaseSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  exercises: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise', 
      required: true,
    },
  ],
});
const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    default: 'Description not set'
  },
  difficulty: {
    type: String,
    required: true,
    default: 'beginner'
  },
  targetGroups: [{
    type: Object, 
    required: true,
  }],
  duration: {
    type: Number, 
    required: true,
    default: 0,
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
  author: {
    type: String,
    required: true,
  },
  source: {
    type: String,
  },
  author: {
    type: String,
    required: true,
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
    default: 'Not set'
  },
  phases: {
    type: [PhaseSchema],
    default: []
  },
  notes: { type: String, default: 'No notes' },
});



const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;

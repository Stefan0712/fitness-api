const mongoose = require('mongoose')

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  qty: {
    type: Number,
    required: true,
    default: 1
  },
  unit: {
    type: String,
    required: true,
    default: 'g'
  },
  protein: {
    type: Number,
    default: 0
  },
  carbs: {
    type: Number,
    default: 0
  },
  fats: {
    type: Number,
    default: 0
  },
  sugar: {
    type: Number,
    default: 0
  },
  calories: {
    type: Number,
    required: true
  },
  sodium: {
    type: Number,
    default: 0
  },
  type: {
    type: String,
    default: 'other'
  },
  note: {
    type: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  visibility: {
    type: String,
    enum: ['private', 'public', 'friends'],
    default: 'private'
  },
  tags: [String],
}, { timestamps: true });

const Food = mongoose.model('Food', foodSchema);


module.exports = Food;

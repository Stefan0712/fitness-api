const {mongoose, Schema} = require('mongoose');

const targetGroupSchema = new Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
});

const equipmentAttributesSchema = new Schema({
  name: { type: String, required: true },
  value: { type: Number },
  unit: { type: String },
});

const equipmentSchema = new Schema({
  name: { type: String, required: true, default: 'Name not set' },
  attributes: [equipmentAttributesSchema],
});

const tagSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true },
  author: { type: String, required: true },
});

const fieldSchema = new Schema({
  name: { type: String, required: true, default: 'Name not set' },
  unit: { type: String, required: true, default: 'No unit' },
  value: { type: Number, required: true, default: 0 },
  target: { type: Number },
  description: { type: String },
  isCompleted: { type: Boolean, default: false },
});

const exerciseSchema = new Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: String, required: true },
  updatedAt: { type: String, default: '' },
  isCompleted: { type: Boolean, default: false },
  sourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' },
  name: { type: String, required: true },
  description: { type: String },
  reference: { type: String, default: '' },
  difficulty: { type: String, required: true },
  sets: { type: Number, required: true, default: 1 },
  duration: { type: Number, required: true, default: 0 },
  durationUnit: { type: String, default: 'min' },
  rest: { type: Number, required: true, default: 45 },
  restUnit: { type: String, default: 's' },
  visibility: { type: String, required: true, default: 'private' },
  fields: [fieldSchema],
  notes: { type: String },
  equipment: [equipmentSchema],
  muscleGroups: [targetGroupSchema],
  tags: [tagSchema],
  instructions: [{ type: String }],
  media: [{url: String, type: String}]
});

// Create the Exercise model
const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;

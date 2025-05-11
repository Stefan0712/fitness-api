const mongoose = require('mongoose');
const { Schema } = mongoose;

const GoalSchema = new Schema({
  name: { type: String, required: true },
  unit: { type: String, required: true },
  target: { type: Number, required: true },
  icon: { type: String },
  color: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Goal', GoalSchema);

const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExerciseInPlanSchema = new Schema({
  exerciseId: { type: Schema.Types.ObjectId, ref: 'Exercise', required: true },
  startTime: { type: String },
  duration: { type: Number },
  note: { type: String },
  targetGroups: [String],
}, { _id: false });

const DaySchema = new Schema({
  exercises: [ExerciseInPlanSchema],
  goals: [{ type: Schema.Types.ObjectId, ref: 'Goal' }],
}, { _id: false });

const ActivityPlanSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  tags: [String],
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
  visibility: { type: String, enum: ['private', 'public', 'friends'], default: 'private' },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  days: {
    mon: DaySchema,
    tue: DaySchema,
    wed: DaySchema,
    thu: DaySchema,
    fri: DaySchema,
    sat: DaySchema,
    sun: DaySchema,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ActivityPlan', ActivityPlanSchema);

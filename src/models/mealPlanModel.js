const mongoose = require('mongoose');
const { Schema } = mongoose;

const FoodItemSchema = new Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  unit: { type: String, required: true },
  protein: Number,
  carbs: Number,
  fats: Number,
  sugar: Number,
  calories: Number,
  sodium: Number,
  time: String,
  note: String
});

const MealPlanDaySchema = new Schema({
  day: { type: String, required: true },
  meals: {
    breakfast: [FoodItemSchema],
    lunch: [FoodItemSchema],
    dinner: [FoodItemSchema],
    snacks: [FoodItemSchema],
    other: [FoodItemSchema]
  },
  note: String
}, { _id: false });

const MealPlanSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  tags: [String],
  visibility: { type: String, enum: ['private', 'public', 'friends'], default: 'private' },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  goals: [{ type: Schema.Types.ObjectId, ref: 'Goal' }],
  days: [MealPlanDaySchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MealPlan', MealPlanSchema);

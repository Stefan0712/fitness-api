const mongoose = require('mongoose');

const activityDayTemplateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  tags: [{ type: String }],
  day: { type: Object, required: true }, // the whole day object from activityPlan.days[]
}, {
  timestamps: true
});

module.exports = mongoose.model('ActivityDayTemplate', activityDayTemplateSchema);

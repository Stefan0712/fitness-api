const mongoose = require('mongoose');
const { Schema } = mongoose;

const LogSchema = new Schema({
  type: { type: String, required: true, enum: ['goal', 'food', 'exercise', 'workout'] },
  timestamp: { type: Date, default: Date.now },
  name: { type: String, required: true },
  icon: { type: String },
  source: { type: String, enum: ['mobile', 'web'], default: 'web' },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  data: { type: Schema.Types.Mixed }, // use mixed for flexible data
});

module.exports = mongoose.model('Log', LogSchema);

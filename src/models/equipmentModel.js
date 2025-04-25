const mongoose = require("mongoose")

const EquipmentAttributeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: mongoose.Schema.Types.Mixed },
  unit: { type: String }
}, { _id: false });

const TagSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true }
}, { _id: false });

const TargetGroupSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true }
}, { _id: false });

const EquipmentSchema = new mongoose.Schema({
  authorId: { type: String, required: true },
  name: { type: String, required: true },
  attributes: { type: [EquipmentAttributeSchema], default: [] },
  description: { type: String },
  tags: { type: [TagSchema], default: [] },
  muscleGroups: { type: [TargetGroupSchema], default: [] },
  createdAt: { type: String, required: true },
  url: { type: String },
  urlName: { type: String }
});

module.exports = mongoose.model('Equipment', EquipmentSchema);

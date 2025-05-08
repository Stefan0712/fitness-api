const mongoose = require('mongoose');
const { Schema, model, Types } = mongoose;

const StatusPostSchema = new Schema({
  title: {
    type: String,
    required: true,
    maxlength: 50,
  },
  body: {
    type: String,
    required: true,
    maxlength: 500,
  },
  privacy: {
    type: String,
    enum: ['friends', 'public', 'private'],
    default: 'public',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: [],
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    default: [],
  }],
  tags: [{
    type: String,
    default: [],
  }],
  type: {
    type: String,
    enum: ['status'],
    default: 'status',
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = model('StatusPost', StatusPostSchema);

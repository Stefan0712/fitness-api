const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000 // Optional limit to prevent abuse
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  parentCommentId: {
    type: Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  dislikes: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  editedAt: {
    type: Date
  },
  isEdited: {
    type: Boolean,
    default: false
  },
  reportedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  isDeleted: {
    type: Boolean,
    default: false
  }
});

const mongoose = require('mongoose');
const { Schema } = mongoose;

const commentSchema = new Schema({
  body: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
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
    ref: 'User',
    default: [], 
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

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;

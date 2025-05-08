const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    createdAt: {type: String, required: true},
    title: {type: String, required: true},
    body: {type: String, required: true},
    likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    linkedItems: [{
      type: { type: String, enum: ['Workout', 'Exercise', 'Equipment']},
      refId: {type: Schema.Types.ObjectId, refPath: 'linkedItems.type' }}
    ],
    visibility: {type: String, default: 'public'},
    archived: {type: Boolean, default: false},
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

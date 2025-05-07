const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    createdAt: {type: string, required: true},
    title: {type: string, required: true},
    content: {type: string, required: true},
    likes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    dislikes: [{type: Schema.Types.ObjectId, ref: 'User'}],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    linkedItems: [{
                type: { type: String, enum: ['Workout', 'Exercise', 'Equipment'], required: true},
                refId: {type: Schema.Types.ObjectId, required: true, refPath: 'linkedItems.type' }}],
    visibility: {type: string, default: 'public'},
    archived: {type: boolean, default: false},

  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;

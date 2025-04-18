const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, default: '', required: false },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User', default: [] }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: [] }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post', default: [] }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'Like', default: [] }],
    savedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post', default: [] }],
    
    age: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    weight: { type: Number, default: 0 },
    bio: { type: String, default: '' },
    gender: { type: String, default: '' },

    badges: [{ type: Schema.Types.ObjectId, ref: 'Badge', default: [] }],

    role: { type: String, default: 'user' },
    isPrivate: { type: Boolean, default: true },

    favoriteExercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise', default: [] }],
    favoriteWorkouts: [{ type: Schema.Types.ObjectId, ref: 'Workout', default: [] }],
    savedExercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise', default: [] }],
    savedWorkouts: [{ type: Schema.Types.ObjectId, ref: 'Workout', default: [] }],
    createdExercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise', default: [] }],
    createdWorkouts: [{ type: Schema.Types.ObjectId, ref: 'Workout', default: [] }]
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

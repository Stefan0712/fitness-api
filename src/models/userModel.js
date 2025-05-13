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
    createdComments: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: [] }],
    likedComments: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: [] }],
    createdPosts: [{ type: Schema.Types.ObjectId, ref: 'Post', default: [] }],
    likedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post', default: [] }],
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
    profileSettings:{
      showProfile: {type: Boolean, default: true},
      showMyWorkouts: {type: Boolean, default: true},
      showMyExercises: {type: Boolean, default: true},
      showMyActivity: {type: Boolean, default: true},
      showMyDetails: {type: Boolean, default: true},
      showMyPosts: {type: Boolean, default: true},
      showMyPlans: {type: Boolean, default: true},
    },

    // EXERCISES
    favoriteExercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise', default: [] }],
    savedExercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise', default: [] }],
    createdExercises: [{ type: Schema.Types.ObjectId, ref: 'Exercise', default: [] }],

    // WORKOUTS
    savedWorkouts: [{ type: Schema.Types.ObjectId, ref: 'Workout', default: [] }],
    createdWorkouts: [{ type: Schema.Types.ObjectId, ref: 'Workout', default: [] }],
    favoriteWorkouts: [{ type: Schema.Types.ObjectId, ref: 'Workout', default: [] }],

    // EQUIPMENT
    savedEquipment: [{ type: Schema.Types.ObjectId, ref: 'Equipment', default: [] }],
    createdEquipment: [{ type: Schema.Types.ObjectId, ref: 'Equipment', default: [] }],
    // FOODS
    createdFoods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }],
    savedFoods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }],
    favoriteFoods: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Food' }],

    // WORKOUTS
    createdWorkouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
    savedWorkouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
    favoriteWorkouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],

    // ACTIVITY PLANS
    createdActivityPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ActivityPlan' }],
    savedActivityPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ActivityPlan' }],
    favoriteActivityPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ActivityPlan' }],

    // MEAL PLANS
    createdMealPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MealPlan' }],
    savedMealPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MealPlan' }],
    favoriteMealPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MealPlan' }],

    // GOALS
    goals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Goal' }]
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const workoutRoutes = require('./routes/workoutRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const userRoutes = require('./routes/userRoutes');
dotenv.config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/userModel');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error("Couldn't connect to MongoDB:", err);
  });

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // Allow the specific frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods if needed
    credentials: true, // Allow cookies to be sent
  })
);

app.use('/api/workout', workoutRoutes)
app.use('/api/exercise', exerciseRoutes)
app.use('/api/user', userRoutes)

// Login/Register routes

app.post('/api/auth/register', async (req, res)=>{
  const {username, email, password} = req.body;
  console.log(req.body);
  try{
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with is username/email already exists.' });
    }

     // Hash password
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();

    // Generate token
    const token = jwt.sign({ id: newUser._id, username: newUser.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' } );
    console.log(token);
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        role: newUser.role
      }
    });
  }catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


app.post('/api/auth/login', async (req, res) => {
  try {
      const { username, password } = req.body;

      // Validation
      if (!username || !password) {
          return res.status(400).json({ error: 'Username and password are required.' });
      }

      // Find user
      const user = await User.findOne({ username });
      if (!user) {
          return res.status(401).json({ error: 'Invalid username or password.' });
      }

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(401).json({ error: 'Invalid username or password.' });
      }

      // Create JWT
      const token = jwt.sign( { id: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' } );

      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'Strict',
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200).json({
          message: 'Login successful',
          user: {
              id: user._id,
              username: user.username,
              role: user.role,
          }
      });

  } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ error: 'Server error during login.' });
  }
});

//logout route to remove the cookie
app.post('/api/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'Strict',
    secure: false,
  });
  res.status(200).json({ message: 'Logged out' });
});

// Test Route
app.get('/api/', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

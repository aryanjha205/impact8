const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

// Render login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    req.session.userId = user._id;
    req.session.userEmail = user.email;
    res.redirect('/profile');
  } else {
    res.redirect('/login');
  }
});

// Render signup page
router.get('/signup', (req, res) => {
  const error = req.query.error;
  res.render('signup', { error });
});

// Handle signup
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashedPassword });
  try {
    await user.save();
    req.session.userId = user._id;
    req.session.userEmail = user.email;
    res.redirect('/profile');
  } catch (error) {
    if (error.code === 11000) { // Duplicate key error
      res.redirect('/signup?error=Email already exists');
    } else {
      res.redirect('/signup?error=An error occurred');
    }
  }
});

// Handle logout
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

module.exports = router;

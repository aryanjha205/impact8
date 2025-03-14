require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const methodOverride = require('method-override');
const students = require('./routes/students');
const teachers = require('./routes/teachers');
const auth = require('./routes/auth');
const profile = require('./routes/profile');
const manage = require('./routes/manage');
const assignments = require('./routes/assignments');
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
app.set('view engine', 'ejs');

// Authentication middleware
function requireLogin(req, res, next) {
  if (!req.session.userId && req.path !== '/login' && req.path !== '/signup') {
    return res.redirect('/login');
  }
  next();
}

// Routes
app.use('/', auth);
app.use('/profile', requireLogin, profile);
app.use('/students', requireLogin, students);
app.use('/teachers', requireLogin, teachers);
app.use('/manage', requireLogin, manage);
app.use('/assignments', requireLogin, assignments);

// Root route
app.get('/', requireLogin, (req, res) => {
  res.redirect('/profile');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
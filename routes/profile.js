const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Render profile page
router.get('/', async (req, res) => {
  const userEmail = req.session.userEmail;
  const student = await Student.findOne({ email: userEmail });
  if (!student) {
    return res.redirect('/login?error=Student not found');
  }
  res.render('profile', { student });
});

module.exports = router;

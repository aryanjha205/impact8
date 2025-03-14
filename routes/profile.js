const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Render profile page
router.get('/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) {
    return res.redirect('/students?error=Student not found');
  }
  res.render('profile', { student });
});

module.exports = router;

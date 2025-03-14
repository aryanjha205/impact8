const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Assignment = require('../models/assignment');

// Get all students or search students by name
router.get('/', async (req, res) => {
  const searchQuery = req.query.name;
  let students;
  if (searchQuery) {
    students = await Student.find({ name: new RegExp(searchQuery, 'i') });
  } else {
    students = await Student.find();
  }
  const assignments = await Assignment.find().populate('studentId'); // Fetch the list of assignments
  res.render('students', { students, assignments }); // Pass assignments to the view
});

// Delete a student
router.delete('/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect('/students');
});

module.exports = router;

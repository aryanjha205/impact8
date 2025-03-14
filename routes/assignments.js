const express = require('express');
const router = express.Router();
const Assignment = require('../models/assignment');
const Student = require('../models/student');

// Get all assignments
router.get('/', async (req, res) => {
  const assignments = await Assignment.find().populate('studentId');
  const students = await Student.find(); // Fetch the list of students
  res.render('assignments', { assignments, students }); // Pass students to the view
});

// Add a new assignment
router.post('/', async (req, res) => {
  const assignment = new Assignment(req.body);
  await assignment.save();
  res.redirect('/assignments');
});

// Delete an assignment
router.delete('/:id', async (req, res) => {
  await Assignment.findByIdAndDelete(req.params.id);
  res.redirect('/assignments');
});

module.exports = router;

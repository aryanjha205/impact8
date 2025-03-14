const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacher');
const Student = require('../models/student');
const Assignment = require('../models/assignment');

// Get all teachers or search teachers by name
router.get('/', async (req, res) => {
  const searchQuery = req.query.name;
  let teachers;
  if (searchQuery) {
    teachers = await Teacher.find({ name: new RegExp(searchQuery, 'i') });
  } else {
    teachers = await Teacher.find();
  }
  const students = await Student.find();
  const assignments = await Assignment.find().populate('studentId');
  res.render('teachers', { teachers, students, assignments });
});

// Add a new teacher
router.post('/', async (req, res) => {
  const teacher = new Teacher(req.body);
  await teacher.save();
  res.redirect('/teachers');
});

// Delete a teacher
router.delete('/:id', async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  res.redirect('/teachers');
});

module.exports = router;

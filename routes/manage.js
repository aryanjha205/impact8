const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Teacher = require('../models/teacher');

// Render manage page
router.get('/', async (req, res) => {
  const students = await Student.find();
  const teachers = await Teacher.find();
  res.render('manage', { students, teachers });
});

// Add a new student
router.post('/students', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.redirect('/manage');
});

// Update a student
router.put('/students/:id', async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/manage');
});

// Add a new teacher
router.post('/teachers', async (req, res) => {
  const teacher = new Teacher(req.body);
  await teacher.save();
  res.redirect('/manage');
});

// Update a teacher
router.put('/teachers/:id', async (req, res) => {
  await Teacher.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/manage');
});

// Delete a student
router.delete('/students/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.redirect('/manage');
});

// Delete a teacher
router.delete('/teachers/:id', async (req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  res.redirect('/manage');
});

module.exports = router;

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  major: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  semester: {
    type: Number,
    required: true
  },
  division: {
    type: String,
    required: true
  },
  rollNo: {
    type: Number,
    required: true
  },
  batch: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  mobileNo: {
    type: String,
    required: true
  },
  profilePhoto: {
    type: String,
    required: false
  },
  enrollmentNo: {
    type: String,
    required: true
  },
  assignmentUrl: {
    type: String,
    required: false
  }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;

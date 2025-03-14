const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  onLeave: {
    type: Boolean,
    default: false
  }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;

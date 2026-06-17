const mongoose = require('mongoose');

const attendanceRecordSchema = new mongoose.Schema({
  date: { type: String, required: true },
  status: { type: String, enum: ['present', 'absent', 'today'], default: 'present' }
});

const competencySchema = new mongoose.Schema({
  name: { type: String, required: true },
  percentage: { type: Number, required: true },
  color: { type: String, default: 'green' }
});

const progressSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  percentage: { type: Number, required: true },
  color: { type: String, default: 'blue' }
});

const monthlyGradeSchema = new mongoose.Schema({
  month: { type: String, required: true },
  grade: { type: String, required: true },
  color: { type: String, default: 'green' }
});

const studentSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, required: true },
  grade:      { type: String, required: true },
  school:     { type: String, default: 'AM International' },
  avatarText: { type: String },
  avatarImg:  { type: String },

  // Attendance
  attendanceRate:    { type: Number, default: 100 },
  presentDays:       { type: Number, default: 0 },
  missedDays:        { type: Number, default: 0 },
  attendanceRecords: [attendanceRecordSchema],

  // Competencies
  overallCompetency: { type: Number, default: 85 },
  competencies:      [competencySchema],
  growthAreas:       [{ type: String }],

  // Holistic Progress
  progressBars:      [progressSchema],
  overallScore:      { type: Number, default: 88 },

  // Monthly Grades
  monthlyGrades:     [monthlyGradeSchema],

  // Partnership score
  partnershipScore:  { type: Number, default: 92 },

  // Profile & Classes extension
  location:          { type: String, default: 'Location not specified' },
  enrolledClasses:   [{
    subject: { type: String },
    grade:   { type: String },
    teacher: { type: String }
  }],

  // Teachers, Activities & Attendance extension
  teachers: [{
    name:    { type: String },
    email:   { type: String },
    subject: { type: String }
  }],
  activities: [{
    name:     { type: String },
    category: { type: String },
    status:   { type: String, enum: ['pending', 'completed', 'overdue'], default: 'pending' },
    date:     { type: String }
  }],

}, { timestamps: true });


module.exports = mongoose.model('Student', studentSchema);


const express = require('express');
const router  = express.Router();
const Student = require('../models/Student');
const Parent  = require('../models/Parent');

/* ─── STUDENTS ─── */

// GET all students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json({ success: true, data: students });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single student
router.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, error: 'Student not found' });
    res.json({ success: true, data: student });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create student
router.post('/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ success: true, data: student });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// PUT update student
router.put('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!student) return res.status(404).json({ success: false, error: 'Student not found' });
    res.json({ success: true, data: student });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

// DELETE student
router.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ success: false, error: 'Student not found' });
    res.json({ success: true, message: 'Student deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/* ─── PARENTS ─── */

// GET all parents with populated children
router.get('/parents', async (req, res) => {
  try {
    const parents = await Parent.find().populate('children');
    res.json({ success: true, data: parents });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single parent with children
router.get('/parents/:id', async (req, res) => {
  try {
    const parent = await Parent.findById(req.params.id).populate('children');
    if (!parent) return res.status(404).json({ success: false, error: 'Parent not found' });
    res.json({ success: true, data: parent });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create parent
router.post('/parents', async (req, res) => {
  try {
    const parent = new Parent(req.body);
    await parent.save();
    res.status(201).json({ success: true, data: parent });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

/* ─── ATTENDANCE ─── */

// PATCH update a student's attendance record
router.patch('/students/:id/attendance', async (req, res) => {
  try {
    const { date, status } = req.body;
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ success: false, error: 'Student not found' });

    const existing = student.attendanceRecords.find(r => r.date === date);
    if (existing) {
      existing.status = status;
    } else {
      student.attendanceRecords.push({ date, status });
    }

    // Recalculate stats
    const total   = student.attendanceRecords.filter(r => r.status !== 'today').length;
    const present = student.attendanceRecords.filter(r => r.status === 'present').length;
    const absent  = student.attendanceRecords.filter(r => r.status === 'absent').length;
    student.presentDays    = present;
    student.missedDays     = absent;
    student.attendanceRate = total > 0 ? Math.round((present / total) * 100) : 100;

    await student.save();
    res.json({ success: true, data: student });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

/* ─── HEALTH CHECK ─── */
router.get('/health', (req, res) => {
  res.json({ success: true, message: 'API is running', timestamp: new Date() });
});

module.exports = router;

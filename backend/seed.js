require('dotenv').config();
const mongoose = require('mongoose');
const Student  = require('./models/Student');
const Parent   = require('./models/Parent');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');

    // Clear existing data
    await Student.deleteMany({});
    await Parent.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // ── Sofia Delgado ──
    const sofia = await Student.create({
      name:       'Sofia Delgado',
      email:      'aaryamishra325+sofia@gmail.com',
      grade:      'BV1',
      school:     'AM International',
      avatarText: 'SD',
      avatarImg:  'flower.png',

      attendanceRate: 100,
      presentDays:    13,
      missedDays:     0,
      attendanceRecords: [
        { date: '2026-06-02', status: 'present' },
        { date: '2026-06-03', status: 'present' },
        { date: '2026-06-04', status: 'present' },
        { date: '2026-06-05', status: 'present' },
        { date: '2026-06-06', status: 'present' },
        { date: '2026-06-09', status: 'absent'  },
        { date: '2026-06-10', status: 'present' },
        { date: '2026-06-11', status: 'present' },
        { date: '2026-06-12', status: 'present' },
        { date: '2026-06-13', status: 'present' },
        { date: '2026-06-16', status: 'present' },
        { date: '2026-06-17', status: 'present' },
        { date: '2026-06-18', status: 'present' },
        { date: '2026-06-19', status: 'present' },
        { date: '2026-06-20', status: 'today'   },
      ],

      overallCompetency: 85,
      competencies: [
        { name: 'Problem Solving',   percentage: 81, color: 'green'  },
        { name: 'Critical Thinking', percentage: 86, color: 'blue'   },
        { name: 'Communication',     percentage: 90, color: 'purple' },
        { name: 'Leadership',        percentage: 86, color: 'orange' },
      ],
      growthAreas: [
        'Strengthen mathematical reasoning',
        'Enhance collaborative skills',
        'Develop creative problem-solving',
      ],

      overallScore: 88,
      progressBars: [
        { subject: 'Cognitive Development',  percentage: 85, color: 'blue'   },
        { subject: 'Social-Emotional',        percentage: 83, color: 'green'  },
        { subject: 'Physical Development',    percentage: 89, color: 'purple' },
      ],

      monthlyGrades: [
        { month: 'This Month', grade: '+5%', color: 'green'  },
        { month: 'Goals Met',  grade: '16',  color: 'blue'   },
        { month: 'Awards',     grade: '5',   color: 'orange' },
      ],

      partnershipScore: 92,
    });
    console.log('✅ Created Sofia Delgado');

    // ── Kiara Malhotra ──
    const kiara = await Student.create({
      name:       'Kiara Malhotra',
      email:      'aaryamishra325+kiaramalhotra@gmail.com',
      grade:      'BV3',
      school:     'AM International',
      avatarText: 'KM',

      attendanceRate: 90,
      presentDays:    9,
      missedDays:     1,
      attendanceRecords: [
        { date: '2026-06-02', status: 'present' },
        { date: '2026-06-03', status: 'present' },
        { date: '2026-06-04', status: 'absent'  },
        { date: '2026-06-05', status: 'present' },
        { date: '2026-06-06', status: 'present' },
        { date: '2026-06-10', status: 'present' },
        { date: '2026-06-11', status: 'present' },
        { date: '2026-06-12', status: 'present' },
        { date: '2026-06-13', status: 'present' },
        { date: '2026-06-20', status: 'today'   },
      ],

      overallCompetency: 79,
      competencies: [
        { name: 'Problem Solving',   percentage: 75, color: 'green'  },
        { name: 'Critical Thinking', percentage: 82, color: 'blue'   },
        { name: 'Communication',     percentage: 78, color: 'purple' },
        { name: 'Leadership',        percentage: 72, color: 'orange' },
      ],
      growthAreas: [
        'Improve reading comprehension',
        'Build confidence in presentations',
        'Strengthen logical reasoning',
      ],

      overallScore: 82,
      progressBars: [
        { subject: 'Mathematics',    percentage: 72, color: 'blue'   },
        { subject: 'Science',        percentage: 80, color: 'green'  },
        { subject: 'English',        percentage: 88, color: 'purple' },
        { subject: 'Social Studies', percentage: 85, color: 'orange' },
        { subject: 'Arts & Crafts',  percentage: 90, color: 'pink'   },
      ],

      monthlyGrades: [
        { month: 'Jan', grade: 'B+', color: 'purple' },
        { month: 'Feb', grade: 'A',  color: 'green'  },
        { month: 'Mar', grade: 'B',  color: 'blue'   },
        { month: 'Apr', grade: 'B+', color: 'purple' },
        { month: 'May', grade: 'A',  color: 'green'  },
        { month: 'Jun', grade: 'B+', color: 'purple' },
      ],

      partnershipScore: 85,
    });
    console.log('✅ Created Kiara Malhotra');

    // ── Parent ──
    const parent = await Parent.create({
      name:       'Miguel Delgado',
      email:      'miguel.delgado@email.com',
      avatarText: 'MD',
      children:   [sofia._id, kiara._id],
    });
    console.log('✅ Created Parent: Miguel Delgado');

    console.log('\n🎉 Seed complete! Database populated with:');
    console.log(`   👨‍👩‍👧 Parent: ${parent.name}`);
    console.log(`   👧 Child 1: ${sofia.name} (Grade ${sofia.grade})`);
    console.log(`   👧 Child 2: ${kiara.name} (Grade ${kiara.grade})`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();

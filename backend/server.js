require('dotenv').config();
const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');
const path      = require('path');
const apiRoutes = require('./routes/api');

const app = express();
app.use(cors());
app.use(express.json());

/* ─── Lazy MongoDB connection (connect only when API is called) ─── */
let isConnected = false;
async function connectDB() {
  if (isConnected && mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 8000,
  });
  isConnected = true;
  console.log('✅ MongoDB connected');
}

/* ─── Connect DB before every API request ─── */
app.use('/api', async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('❌ DB Error:', err.message);
    return res.status(500).json({ success: false, error: 'DB connection failed: ' + err.message });
  }
});

/* ─── API Routes ─── */
app.use('/api', apiRoutes);

/* ─── Static files + index.html fallback ─── */
const publicDir = path.join(__dirname, '..');
app.use(express.static(publicDir));
app.use((req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

/* ─── Local dev only ─── */
if (!process.env.VERCEL) {
  app.listen(3001, () => console.log('🚀 http://localhost:3001'));
}

module.exports = app;

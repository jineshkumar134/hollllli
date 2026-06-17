require('dotenv').config();
const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');
const path      = require('path');
const apiRoutes = require('./routes/api');

const app = express();

/* ─── Middleware ─── */
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..'))); // serve frontend

/* ─── API Routes ─── */
app.use('/api', apiRoutes);

/* ─── Serve frontend for all other routes ─── */
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

/* ─── Connect to MongoDB ─── */
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
  console.log('✅ Connected to MongoDB Atlas');
}

connectDB().catch(err => console.error('❌ MongoDB error:', err.message));

/* ─── Local dev: start server ─── */
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
}

/* ─── Vercel: export the app ─── */
module.exports = app;

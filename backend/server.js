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

/* ─── Static files ─── */
const publicDir = path.join(__dirname, '..');
app.use(express.static(publicDir));

/* ─── API Routes ─── */
app.use('/api', apiRoutes);

/* ─── Serve index.html for all other routes ─── */
app.use((req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

/* ─── MongoDB Connection (cached for serverless) ─── */
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
  console.log('✅ Connected to MongoDB Atlas');
}

connectDB().catch(err => console.error('❌ MongoDB error:', err.message));

/* ─── Local dev only ─── */
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
}

/* ─── Export for Vercel serverless ─── */
module.exports = app;

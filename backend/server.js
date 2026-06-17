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

/* ─── Static files (index.html, images) ─── */
app.use(express.static(path.join(__dirname, '..')));

/* ─── API Routes ─── */
app.use('/api', apiRoutes);

/* ─── Fallback → index.html ─── */
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

/* ─── MongoDB (cached for serverless) ─── */
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
  console.log('✅ MongoDB connected');
}
connectDB().catch(err => console.error('❌', err.message));

/* ─── Local dev server ─── */
if (!process.env.VERCEL) {
  app.listen(3001, () => console.log('🚀 http://localhost:3001'));
}

/* ─── Export for Vercel ─── */
module.exports = app;

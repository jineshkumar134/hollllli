require('dotenv').config();
const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');
const apiRoutes = require('./routes/api');

const app = express();

app.use(cors());
app.use(express.json());

/* ─── API Routes only ─── */
app.use('/api', apiRoutes);

/* ─── MongoDB (cached for serverless) ─── */
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGODB_URI);
  isConnected = true;
  console.log('✅ MongoDB connected');
}

connectDB().catch(err => console.error('❌', err.message));

/* ─── Local dev: start server + serve static files ─── */
if (!process.env.VERCEL) {
  const path = require('path');
  app.use(require('express').static(path.join(__dirname, '..')));
  app.use((req, res) => res.sendFile(path.join(__dirname, '..', 'index.html')));
  app.listen(3001, () => console.log('🚀 http://localhost:3001'));
}

module.exports = app;

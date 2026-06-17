require('dotenv').config();
const express   = require('express');
const mongoose  = require('mongoose');
const cors      = require('cors');
const path      = require('path');
const apiRoutes = require('./routes/api');

const app  = express();
const PORT = process.env.PORT || 3001;

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

/* ─── Connect to MongoDB & Start Server ─── */
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas');
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });

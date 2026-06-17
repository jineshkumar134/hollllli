const mongoose = require('mongoose');

const parentSchema = new mongoose.Schema({
  name:       { type: String, required: true },
  email:      { type: String, required: true },
  avatarText: { type: String },
  children:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
}, { timestamps: true });

module.exports = mongoose.model('Parent', parentSchema);

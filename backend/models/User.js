const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true, lowercase: true, trim: true },
  dob: { type: String },
  password: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },  // Add role - default is 'user'
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

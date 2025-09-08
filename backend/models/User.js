// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: { 
    type: String, 
    unique: true, 
    required: true,
    lowercase: true,
    trim: true,
  },
  dob: {
    type: String,
  },
  password: { 
    type: String,
  },
}, { timestamps: true }); // adds createdAt and updatedAt

module.exports = mongoose.model('User', userSchema);

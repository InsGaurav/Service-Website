const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  size: { type: String, enum: ['small', 'medium', 'large'], default: 'medium' }
});

module.exports = mongoose.model('Project', projectSchema);

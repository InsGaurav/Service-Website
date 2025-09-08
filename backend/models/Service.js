const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String }, // optional, e.g., icon name or image URL
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Service', serviceSchema);

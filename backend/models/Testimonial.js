const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company: { type: String },
  image: { type: String },
  quote: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Testimonial', testimonialSchema);

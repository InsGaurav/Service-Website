const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  name: String,
  quote: String,
});

const homeFeatureSchema = new mongoose.Schema({
  heading: String,
  description: String,
  image: String,
  star: String,
  vectorIcon: String,
  bgImage: String,
  ergonomic: String,
  award: String,
  testimonial: testimonialSchema,
});

module.exports = mongoose.model("HomeFeature", homeFeatureSchema);

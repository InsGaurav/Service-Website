const mongoose = require("mongoose");

const homeHeroSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  heroImage: { type: String, required: true },
  bgShape: { type: String },
  bgAbstract: { type: String },
  partners: [{ type: String }]  // Array of image URLs
});

module.exports = mongoose.model("HomeHero", homeHeroSchema);

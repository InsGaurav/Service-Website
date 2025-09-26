const mongoose = require("mongoose");

const industryImageSchema = new mongoose.Schema({
  src: String,
  overlay: String,
  cardTitle: String,
  bg: String
});

const homeIndustrySchema = new mongoose.Schema({
  type: String, // "left-col", "middle-col", "right-col"
  images: [industryImageSchema]
});

module.exports = mongoose.model("HomeIndustry", homeIndustrySchema);

const mongoose = require("mongoose");

const homeAdditionalIndustryImageSchema = new mongoose.Schema({
  src: String,
  overlay: String,
  belowText: String,
});

module.exports = mongoose.model("HomeAdditionalIndustryImage", homeAdditionalIndustryImageSchema);

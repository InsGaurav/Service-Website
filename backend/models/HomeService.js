const mongoose = require("mongoose");

const homeServiceSchema = new mongoose.Schema({
  id: String,
  image: String,
  title: String,
  description: String,
});

module.exports = mongoose.model("HomeService", homeServiceSchema);

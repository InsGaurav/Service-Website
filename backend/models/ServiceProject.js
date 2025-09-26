const mongoose = require("mongoose");

const serviceProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  img: { type: String, required: true },
  desc: { type: String, required: true }
});

module.exports = mongoose.model("ServiceProject", serviceProjectSchema);

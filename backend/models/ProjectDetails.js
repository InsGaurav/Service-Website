const mongoose = require("mongoose");

const projectDetailsSchema = new mongoose.Schema({
  _id: Number,
  projectId: Number,
  title: String,
  description: String,
  details: String,
  image: String,
}, { _id: false });

module.exports = mongoose.model("ProjectDetails", projectDetailsSchema);

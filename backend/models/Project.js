const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  _id: Number,
  title: { type: String, required: true },
  size: { type: String },
  category: { type: String },
  image: { type: String },
  detailsId: Number, // linked detail id
}, { _id: false });

module.exports = mongoose.model("Project", projectSchema);

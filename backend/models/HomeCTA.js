const mongoose = require("mongoose");

const homeCTASchema = new mongoose.Schema({
  bg: String,
  mask: String,
  label: String,
  title: String,
  buttonLabel: String,
});

module.exports = mongoose.model("HomeCTA", homeCTASchema);

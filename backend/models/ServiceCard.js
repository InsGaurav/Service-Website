const mongoose = require("mongoose");

const serviceCardSchema = new mongoose.Schema({
  iconChar: { type: String, required: true },
  title: { type: String, required: true },
  text: { type: String, required: true }
});

module.exports = mongoose.model("ServiceCard", serviceCardSchema);

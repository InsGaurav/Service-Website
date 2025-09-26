const mongoose = require("mongoose");

const serviceStackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  emoji: { type: String, required: true }
});

module.exports = mongoose.model("ServiceStack", serviceStackSchema);

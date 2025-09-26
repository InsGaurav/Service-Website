const mongoose = require("mongoose");

const serviceStatSchema = new mongoose.Schema({
  value: { type: String, required: true },
  label: { type: String, required: true }
});

module.exports = mongoose.model("ServiceStat", serviceStatSchema);

const mongoose = require("mongoose");

const homeToolSchema = new mongoose.Schema({
  src: String,  // image url as string
});

module.exports = mongoose.model("HomeTool", homeToolSchema);

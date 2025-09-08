const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String },
  photo: { type: String },
  linkedin: { type: String },
  github: { type: String }
});

module.exports = mongoose.model('TeamMember', teamMemberSchema);

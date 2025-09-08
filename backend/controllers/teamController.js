const TeamMember = require('../models/TeamMember');

exports.getTeamMembers = async (req, res) => {
  const teamMembers = await TeamMember.find();
  res.json(teamMembers);
};

exports.createTeamMember = async (req, res) => {
  const { name, role, bio, photo, linkedin, github } = req.body;
  const member = new TeamMember({ name, role, bio, photo, linkedin, github });
  await member.save();
  res.status(201).json(member);
};

exports.updateTeamMember = async (req, res) => {
  const { name, role, bio, photo, linkedin, github } = req.body;
  const member = await TeamMember.findByIdAndUpdate(
    req.params.id,
    { name, role, bio, photo, linkedin, github },
    { new: true }
  );
  res.json(member);
};

exports.deleteTeamMember = async (req, res) => {
  await TeamMember.findByIdAndDelete(req.params.id);
  res.json({ message: 'Team member deleted' });
};

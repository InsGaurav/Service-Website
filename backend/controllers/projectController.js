const Project = require('../models/Project');

exports.getProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

exports.createProject = async (req, res) => {
  const { title, category, image, size } = req.body;
  const project = new Project({ title, category, image, size });
  await project.save();
  res.status(201).json(project);
};

exports.updateProject = async (req, res) => {
  const { title, category, image, size } = req.body;
  const project = await Project.findByIdAndUpdate(
    req.params.id,
    { title, category, image, size },
    { new: true }
  );
  res.json(project);
};

exports.deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Project deleted' });
};

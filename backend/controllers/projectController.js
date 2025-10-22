const Project = require("../models/Project");

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProject = async (req, res) => {
  const { _id, title, category, image, size, detailsId } = req.body;
  try {
    const project = new Project({ _id, title, category, image, size, detailsId });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateProject = async (req, res) => {
  const { title, category, image, size, detailsId } = req.body;
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { title, category, image, size, detailsId },
      { new: true }
    );
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

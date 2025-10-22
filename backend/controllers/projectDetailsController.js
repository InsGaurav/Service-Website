const ProjectDetails = require("../models/ProjectDetails");

exports.getAllProjectDetails = async (req, res) => {
  try {
    const details = await ProjectDetails.find();
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getProjectDetailsById = async (req, res) => {
  try {
    const details = await ProjectDetails.findById(req.params.id);
    if (!details) return res.status(404).json({ error: "ProjectDetails not found" });
    res.json(details);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createProjectDetails = async (req, res) => {
  const { _id, projectId, title, description, details, image } = req.body;
  try {
    const projectDetails = new ProjectDetails({ _id, projectId, title, description, details, image });
    await projectDetails.save();
    res.status(201).json(projectDetails);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateProjectDetails = async (req, res) => {
  const { projectId, title, description, details, image } = req.body;
  try {
    const updated = await ProjectDetails.findByIdAndUpdate(
      req.params.id,
      { projectId, title, description, details, image },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "ProjectDetails not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteProjectDetails = async (req, res) => {
  try {
    const deleted = await ProjectDetails.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "ProjectDetails not found" });
    res.json({ message: "ProjectDetails deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

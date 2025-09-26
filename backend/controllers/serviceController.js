const Stat = require("../models/ServiceStat");
const ServiceCard = require("../models/ServiceCard");
const Project = require("../models/ServiceProject");
const Stack = require("../models/ServiceStack");

// GET endpoints
exports.getStats = async (req, res) => {
  const stats = await Stat.find();
  res.json(stats);
};

exports.getServiceCards = async (req, res) => {
  const cards = await ServiceCard.find();
  res.json(cards);
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

exports.getStack = async (req, res) => {
  const stack = await Stack.find();
  res.json(stack);
};

// CREATE endpoints
exports.createStat = async (req, res) => {
  const stat = new Stat(req.body);
  await stat.save();
  res.status(201).json(stat);
};

exports.createServiceCard = async (req, res) => {
  const card = new ServiceCard(req.body);
  await card.save();
  res.status(201).json(card);
};

exports.createProject = async (req, res) => {
  const project = new Project(req.body);
  await project.save();
  res.status(201).json(project);
};

exports.createStack = async (req, res) => {
  const s = new Stack(req.body);
  await s.save();
  res.status(201).json(s);
};

// UPDATE endpoints
exports.updateStat = async (req, res) => {
  const stat = await Stat.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(stat);
};

exports.updateServiceCard = async (req, res) => {
  const card = await ServiceCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(card);
};

exports.updateProject = async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(project);
};

exports.updateStack = async (req, res) => {
  const s = await Stack.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(s);
};

// DELETE endpoints
exports.deleteStat = async (req, res) => {
  await Stat.findByIdAndDelete(req.params.id);
  res.json({ message: "Stat deleted" });
};

exports.deleteServiceCard = async (req, res) => {
  await ServiceCard.findByIdAndDelete(req.params.id);
  res.json({ message: "Service card deleted" });
};

exports.deleteProject = async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: "Project deleted" });
};

exports.deleteStack = async (req, res) => {
  await Stack.findByIdAndDelete(req.params.id);
  res.json({ message: "Stack deleted" });
};

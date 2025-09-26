const HomeHero = require("../models/HomeHero");
const HomeFeature = require("../models/HomeFeature");
const HomeService = require("../models/HomeService");
const HomeTool = require("../models/HomeTool");
const HomeIndustry = require("../models/HomeIndustry");
const HomeAdditionalIndustryImage = require("../models/HomeAdditionalIndustryImage");
const HomeCTA = require("../models/HomeCTA");

// HERO
exports.getHero = async (req, res) => {
  const hero = await HomeHero.find();
  res.json(hero);
};
exports.createHero = async (req, res) => {
  const hero = new HomeHero(req.body);
  await hero.save();
  res.status(201).json(hero);
};
exports.updateHero = async (req, res) => {
  const hero = await HomeHero.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(hero);
};
exports.deleteHero = async (req, res) => {
  await HomeHero.findByIdAndDelete(req.params.id);
  res.json({ message: "Hero deleted" });
};

// FEATURES
exports.getFeatures = async (req, res) => {
  const features = await HomeFeature.find();
  res.json(features);
};
exports.createFeature = async (req, res) => {
  const feature = new HomeFeature(req.body);
  await feature.save();
  res.status(201).json(feature);
};
exports.updateFeature = async (req, res) => {
  const feature = await HomeFeature.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(feature);
};
exports.deleteFeature = async (req, res) => {
  await HomeFeature.findByIdAndDelete(req.params.id);
  res.json({ message: "Feature deleted" });
};

// SERVICES
exports.getServices = async (req, res) => {
  const services = await HomeService.find();
  res.json(services);
};
exports.createService = async (req, res) => {
  const service = new HomeService(req.body);
  await service.save();
  res.status(201).json(service);
};
exports.updateService = async (req, res) => {
  const service = await HomeService.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(service);
};
exports.deleteService = async (req, res) => {
  await HomeService.findByIdAndDelete(req.params.id);
  res.json({ message: "Service deleted" });
};

// TOOLS
exports.getTools = async (req, res) => {
  const tools = await HomeTool.find();
  res.json(tools);
};
exports.createTool = async (req, res) => {
  const tool = new HomeTool(req.body);
  await tool.save();
  res.status(201).json(tool);
};
exports.updateTool = async (req, res) => {
  const tool = await HomeTool.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(tool);
};
exports.deleteTool = async (req, res) => {
  await HomeTool.findByIdAndDelete(req.params.id);
  res.json({ message: "Tool deleted" });
};

// INDUSTRIES
exports.getIndustries = async (req, res) => {
  const industries = await HomeIndustry.find();
  res.json(industries);
};
exports.createIndustry = async (req, res) => {
  const industry = new HomeIndustry(req.body);
  await industry.save();
  res.status(201).json(industry);
};
exports.updateIndustry = async (req, res) => {
  const industry = await HomeIndustry.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(industry);
};
exports.deleteIndustry = async (req, res) => {
  await HomeIndustry.findByIdAndDelete(req.params.id);
  res.json({ message: "Industry deleted" });
};

// ADDITIONAL INDUSTRY IMAGES
exports.getAdditionalIndustryImages = async (req, res) => {
  const images = await HomeAdditionalIndustryImage.find();
  res.json(images);
};
exports.createAdditionalIndustryImage = async (req, res) => {
  const image = new HomeAdditionalIndustryImage(req.body);
  await image.save();
  res.status(201).json(image);
};
exports.updateAdditionalIndustryImage = async (req, res) => {
  const image = await HomeAdditionalIndustryImage.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(image);
};
exports.deleteAdditionalIndustryImage = async (req, res) => {
  await HomeAdditionalIndustryImage.findByIdAndDelete(req.params.id);
  res.json({ message: "Additional Industry Image deleted" });
};

// CTA
exports.getCTAs = async (req, res) => {
  const ctas = await HomeCTA.find();
  res.json(ctas);
};
exports.createCTA = async (req, res) => {
  const cta = new HomeCTA(req.body);
  await cta.save();
  res.status(201).json(cta);
};
exports.updateCTA = async (req, res) => {
  const cta = await HomeCTA.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(cta);
};
exports.deleteCTA = async (req, res) => {
  await HomeCTA.findByIdAndDelete(req.params.id);
  res.json({ message: "CTA deleted" });
};

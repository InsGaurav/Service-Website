const Service = require('../models/Service');

exports.getServices = async (req, res) => {
  const services = await Service.find();
  res.json(services);
};

exports.createService = async (req, res) => {
  const { name, description, icon, isActive } = req.body;
  const service = new Service({ name, description, icon, isActive });
  await service.save();
  res.status(201).json(service);
};

exports.updateService = async (req, res) => {
  const { name, description, icon, isActive } = req.body;
  const service = await Service.findByIdAndUpdate(
    req.params.id,
    { name, description, icon, isActive },
    { new: true }
  );
  res.json(service);
};

exports.deleteService = async (req, res) => {
  await Service.findByIdAndDelete(req.params.id);
  res.json({ message: 'Service deleted' });
};

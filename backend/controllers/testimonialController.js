const Testimonial = require('../models/Testimonial');

exports.getTestimonials = async (req, res) => {
  const testimonials = await Testimonial.find();
  res.json(testimonials);
};

exports.createTestimonial = async (req, res) => {
  const { name, company, image, quote } = req.body;
  const testimonial = new Testimonial({ name, company, image, quote });
  await testimonial.save();
  res.status(201).json(testimonial);
};

exports.updateTestimonial = async (req, res) => {
  const { name, company, image, quote } = req.body;
  const testimonial = await Testimonial.findByIdAndUpdate(
    req.params.id,
    { name, company, image, quote },
    { new: true }
  );
  res.json(testimonial);
};

exports.deleteTestimonial = async (req, res) => {
  await Testimonial.findByIdAndDelete(req.params.id);
  res.json({ message: 'Testimonial deleted' });
};

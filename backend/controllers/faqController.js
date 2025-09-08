const FAQ = require('../models/FAQ');

// Get all FAQs
exports.getFaqs = async (req, res) => {
  const faqs = await FAQ.find();
  res.json(faqs);
};

// Create new FAQ
exports.createFaq = async (req, res) => {
  const { question, answer } = req.body;
  const faq = new FAQ({ question, answer });
  await faq.save();
  res.status(201).json(faq);
};

// Update FAQ
exports.updateFaq = async (req, res) => {
  const { question, answer } = req.body;
  const faq = await FAQ.findByIdAndUpdate(
    req.params.id,
    { question, answer },
    { new: true }
  );
  res.json(faq);
};

// Delete FAQ
exports.deleteFaq = async (req, res) => {
  await FAQ.findByIdAndDelete(req.params.id);
  res.json({ message: 'FAQ deleted' });
};

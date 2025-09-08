
const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');

// Add auth middleware if needed
router.get('/', testimonialController.getTestimonials);
router.post('/', testimonialController.createTestimonial);
router.put('/:id', testimonialController.updateTestimonial);
router.delete('/:id', testimonialController.deleteTestimonial);

module.exports = router;

const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');

// Public or protected with middleware as needed
router.get('/', faqController.getFaqs);
router.post('/', faqController.createFaq);
router.put('/:id', faqController.updateFaq);
router.delete('/:id', faqController.deleteFaq);

module.exports = router;

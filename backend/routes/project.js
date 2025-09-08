const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// Add auth middleware here if needed

router.get('/', projectController.getProjects);
router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;

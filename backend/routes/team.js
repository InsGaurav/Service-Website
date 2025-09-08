const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');

// Add auth middleware if needed
router.get('/', teamController.getTeamMembers);
router.post('/', teamController.createTeamMember);
router.put('/:id', teamController.updateTeamMember);
router.delete('/:id', teamController.deleteTeamMember);

module.exports = router;

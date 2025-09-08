const express = require('express');
const { getUserData } = require('../controllers/userDataController');
const verifyJWT = require('../middleware/verifyJwt');

const router = express.Router();

router.get('/profile', verifyJWT, getUserData); // GET /api/user/profile

module.exports = router;

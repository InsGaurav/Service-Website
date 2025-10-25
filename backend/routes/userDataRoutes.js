const express = require('express');
const { getUserData } = require('../controllers/userDataController');
const verifyJWT = require('../middleware/verifyJwt');

const { changePassword } = require("../controllers/authController");
const router = express.Router();

router.get('/profile', verifyJWT, getUserData); // GET /api/user/profile

// Protected route for changing user password
router.put("/change-password", verifyJWT, changePassword);

module.exports = router;

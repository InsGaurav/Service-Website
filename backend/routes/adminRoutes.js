const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJwt');
const authorizeAdmin = require('../middleware/authorizeAdmin');

router.use(verifyJWT);
router.use(authorizeAdmin);

router.get('/dashboard', (req, res) => {
  res.json({ message: 'Welcome to the admin dashboard, accessible only by admins.' });
});

// Add more admin routes here...

module.exports = router;

// routes/auth.js
const express = require('express');
const { signup, login } = require('../controllers/authController');



const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Start Google OAuth
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
}));

// Google OAuth Callback
router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Redirect with JWT to your frontend
    res.redirect(`http://localhost:5173/oauth-success?token=${token}`);
  });
// Handle JWT token in the frontend
router.get('/oauth-success', (req, res) => {
  const token = req.query.token;
  if (token) {
    // Store the token in local storage or cookies
    res.send('OAuth successful! Token received.');
  } else {
    res.status(400).send('No token received.');
  }
});

 



router.post('/signup', signup);
router.post('/login', login);

module.exports = router;


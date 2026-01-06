const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/userController');

// Show login page
router.get('/login', (req, res) => {
  res.render('pages/login'); // Make sure this file exists
});

// Show register page
router.get('/register', (req, res) => {
  res.render('pages/register');
});

// Auth actions
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);

module.exports = router;

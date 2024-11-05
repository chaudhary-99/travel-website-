const express = require('express');
const {
  handleUserSignup,
  handleUserSignin,
  handleVerifyEmail,
} = require('../controllers/authUser');

const router = express.Router();

// Auth Routes
router.post('/signup', handleUserSignup); // User signup
router.post('/signin', handleUserSignin); // User signin
router.get('/verify-email', handleVerifyEmail); // Email verification

module.exports = router;

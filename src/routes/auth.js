const express = require('express');
const { register, login, logout, getCurrentUser } = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/me', auth, getCurrentUser);

module.exports = router;
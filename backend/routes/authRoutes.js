const express = require('express');
const { register, login, info } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/info', authMiddleware, info);

module.exports = router;
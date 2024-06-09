const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.get('/me', authenticateToken, authController.me);

module.exports = router;

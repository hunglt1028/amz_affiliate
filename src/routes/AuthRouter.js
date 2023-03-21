const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthController');

router.get('/login',authController.getLogin);
router.post('/login',authController.postLogin);
router.get('/logout',authController.getLogout);
router.get('/forgot-password',authController.getForgotPassword);
module.exports = router;

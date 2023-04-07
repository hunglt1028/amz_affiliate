const express = require('express');
const router = express.Router();
const login_controller = require('../controllers/login.controller');

router.get('/',login_controller.get_login);
router.post('/',login_controller.post_login);
router.get('/logout',login_controller.get_logout);
router.get('/forgot-password',login_controller.get_forgot_pwd);

module.exports = router;

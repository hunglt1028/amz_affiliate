const express = require('express');
const router = express.Router();
const login_controller = require('../controllers/login.controller');

router.get('/',login_controller.getLogin);
router.post('/',login_controller.postLogin);
router.get('/logout',login_controller.getLogout);
router.get('/forgot-password',login_controller.getForgotPassword);

module.exports = router;

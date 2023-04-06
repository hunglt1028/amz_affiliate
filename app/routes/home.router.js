const express = require('express');
const router = express.Router();

const home_controller = require('../controllers/home.controller');

// Home Controller Index
router.use('/',home_controller.index);

module.exports = router;
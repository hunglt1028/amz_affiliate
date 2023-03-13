const express = require('express');
const router = express.Router();

const homeController = require('../controllers/HomeController');

// Home Controller Index
router.use('/',homeController.index);

module.exports = router;
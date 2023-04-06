const express = require('express');
const router = express.Router();
const error_controller = require('../controllers/error.controller');

//404 Page
router.use('/',error_controller.notFound);
module.exports = router;
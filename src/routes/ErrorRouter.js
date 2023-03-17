const express = require('express');
const router = express.Router();
const errorController = require('../controllers/ErrorController');

//404 Page
router.use('/',errorController.notFound);
module.exports = router;
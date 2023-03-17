const express = require('express');
const router = express.Router();
const newsController = require('../controllers/NewsController');

router.get('/create-category',newsController.createCategory);
router.post('/create-category',newsController.index);
router.get('/',newsController.index);

module.exports = router;

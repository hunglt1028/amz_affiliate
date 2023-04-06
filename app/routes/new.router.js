const express = require('express');
const router = express.Router();
const news_controller = require('../controllers/news.controller');

router.get('/create-category',news_controller.createCategory);
router.post('/create-category',news_controller.index);
router.get('/',news_controller.index);

module.exports = router;

const express = require('express');
const router = express.Router();
const tagController = require('../controllers/DashboardTags');

router.get('/search',tagController.search);
router.post('/add',tagController.postAdd);
router.get('/',tagController.getIndex);

module.exports = router;

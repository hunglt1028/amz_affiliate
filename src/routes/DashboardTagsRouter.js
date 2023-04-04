const express = require('express');
const router = express.Router();
const tagController = require('../controllers/DashboardTags');

router.get('/search',tagController.search);
router.post('/add',tagController.postAdd);
router.post('/del',tagController.postDel);
router.get('/',tagController.getIndex);

module.exports = router;

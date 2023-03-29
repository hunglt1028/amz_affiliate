const express = require('express');
const router = express.Router();
const tagController = require('../controllers/DashboardTags');

router.get('/',tagController.getIndex);

module.exports = router;

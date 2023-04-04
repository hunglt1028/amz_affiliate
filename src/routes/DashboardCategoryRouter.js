const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/DashboardCategoryController');

router.post('/add',categoryController.postAdd);
router.get('/',categoryController.getIndex);

module.exports = router;

const express = require('express');
const router = express.Router();
const admin_cat_controller = require('../controllers/admin.cat.controller');

router.post('/create',admin_cat_controller.postAdd);
router.get('/',admin_cat_controller.getIndex);

module.exports = router;

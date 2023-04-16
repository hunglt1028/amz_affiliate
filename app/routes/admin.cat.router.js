const express = require('express');
const router = express.Router();
const admin_cat_controller = require('../controllers/admin.cat.controller');

router.post('/create',admin_cat_controller.post_create);
router.post('/delete',admin_cat_controller.post_delete);
router.post('/action',admin_cat_controller.post_action);
router.post('/update',admin_cat_controller.post_update);

router.get('/',admin_cat_controller.get_index);

module.exports = router;

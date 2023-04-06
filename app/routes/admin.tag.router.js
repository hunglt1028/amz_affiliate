const express = require('express');
const router = express.Router();
const admin_tag_controller = require('../controllers/admin.tag.controller');

router.post('/create',admin_tag_controller.post_create);
router.post('/delete',admin_tag_controller.post_delete);
router.post('/update',admin_tag_controller.post_update);

router.get('/update',admin_tag_controller.get_update);
router.get('/',admin_tag_controller.get_index);

module.exports = router;

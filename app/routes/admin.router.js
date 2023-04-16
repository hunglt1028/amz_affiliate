const express = require('express');
const router = express.Router();
const admin_tag_router = require('./admin.tag.router'); 
const admin_cat_router = require('./admin.cat.router');
const upload_controller = require('../controllers/upload.controller');
const login_router = require('./login.router');
const constant_util = require('../utils/constant.util');

router.use('/login',login_router);
router.post('/upload-image',upload_controller.uploadImage(), upload_controller.uploadHandle);
router.use('/tag',admin_tag_router);
router.use('/cat',admin_cat_router);
router.get('*',(req,res)=>{
    res.render(constant_util.page.ADMIN,{layout:constant_util.layout.ADMIN});
});

module.exports = router;

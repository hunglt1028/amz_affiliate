const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/UploadController');

router.get('/',(req,res)=>{
    res.render('dashboard/index',{layout:'dashboard.hbs'});
});
router.post('/upload-image',uploadController.uploadImage(), uploadController.uploadHandle);
//router.post('/upload-image',(req,res)=>{
//    console.log('req',req);
//});
module.exports = router;

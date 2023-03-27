const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/UploadController');

router.post('/upload-image',uploadController.uploadImage(), uploadController.uploadHandle);

router.get('*',(req,res)=>{
    res.render('dashboard/index',{layout:'dashboard.hbs'});
});

module.exports = router;

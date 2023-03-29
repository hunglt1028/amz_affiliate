const express = require('express');
const router = express.Router();
const tagsRouter = require('./DashboardTagsRouter'); 
const uploadController = require('../controllers/UploadController');

router.post('/upload-image',uploadController.uploadImage(), uploadController.uploadHandle);
router.use('/tags',tagsRouter);
router.get('*',(req,res)=>{
    res.render('dashboard/index',{layout:'dashboard.hbs'});
});

module.exports = router;

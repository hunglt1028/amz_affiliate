const express = require('express');
const router = express.Router();


router.get('/',(req,res)=>{
    res.render('dashboard/index',{layout:'dashboard.hbs'});
});
module.exports = router;

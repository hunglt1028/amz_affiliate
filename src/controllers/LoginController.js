class LoginController{
    index(req,res,next){
        res.render('login',{layout: 'admin.hbs'});
    }
}
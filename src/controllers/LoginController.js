class LoginController{
    getLogin(req,res,next){
        res.render('login/index',{layout: 'admin.hbs'});
    }
}
module.exports = new LoginController;
const Constants = require('../utils/constant.util');
class Auth{
    static requireLogin(req,res,next){
        if(!req.session.user){
            req.session.returnTo= req.originalUrl || req.url;
            return res.redirect(Constants.redirect.LOGIN);
        }
        next();
    }
}
module.exports = Auth;
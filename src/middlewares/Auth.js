const Constants = require('../utils/Constants');
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
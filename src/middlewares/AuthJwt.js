const jwt = require('jsonwebtoken');
const appConfig = require('../config/AppConfig');
class AuthJwt{
    static verifyToken(req,res,next){
        let token = req.headers['x-access-token'];
        
        if(!token){
            return res.status(403).redirect('/admin/login');
        }

        jwt.verify(token,appConfig.jwt.secret, (err, decoded)=>{
            if(err){
                return res.status(401).send({
                    messsage:'Unauthenrized'
                });
            }
            req.userId = decoded.userId;
            next();
        });
    }
}
module.exports = AuthJwt;
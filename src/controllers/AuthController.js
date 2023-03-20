class AuthController{
    login(req, res){
        const {email, password}= req.body;
        console.log('email: ',email, ' password: ', password);
        res.end();
    }
}
module.exports = new AuthController;
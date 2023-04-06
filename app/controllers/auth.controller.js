const resDo = require('../utils/res.do.util');
const messages = require('../utils/message.util');
const Constants = require('../utils/constant.util');
const User = require('../models/User');
class AuthController {
    //Đăng nhập
    getLogin(req, res) {
        res.render(Constants.page.LOGIN, { layout: Constants.layout.AUTH, title: Constants.title.LOGIN });
    }
    //Xử lý đăng nhập
    async postLogin(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {//Kiểm tra giá trị đầu vào
            resDo.data={email:email};
            resDo.error = messages.ERR_LOGIN;
            return res.render(Constants.page.LOGIN, { layout: Constants.layout.AUTH, title: Constants.title.LOGIN, data: resDo });
        }
        try {
            const user = await User.finByEmail(email);
            if (!user) {//Kiểm tra email
                resDo.data={email:email};
                resDo.error = messages.ERR_NOTFOUND_EMAIL;
                return res.render(Constants.page.LOGIN, { layout: Constants.layout.AUTH, title: Constants.title.LOGIN, data: resDo });
            } else {
                const isPasswordValid = await user.comparePassword(password); //Kiểm tra mật khẩu
                if (!isPasswordValid) {
                    resDo.data={email:email};
                    resDo.error = messages.ERR_WRONG_PASS;
                    return res.render(Constants.page.LOGIN, { layout: Constants.layout.AUTH, title: Constants.title.LOGIN, data: resDo });
                }else{
                    //Đăng nhập thành công
                    req.session.user= user;
                    const returnTo = req.session.returnTo || Constants.redirect.DASHBOARD
                    return res.redirect(returnTo);
                }
            }
        } catch (error) {
            resDo.error = messages.ERR_SERVER;
            return res.render(Constants.page.LOGIN, { layout: Constants.layout.AUTH, title: Constants.title.LOGIN, data: resDo });
        }
    }

    //Đăng xuất
    getLogout(req,res){
        delete req.session.user;
        res.redirect(Constants.redirect.HOME);
    }
    //Quên mật khẩu
    getForgotPassword(req,res){
        res.render(Constants.page.FORGOT_PASS, { layout: Constants.layout.AUTH, title: Constants.title.FORGOT_PASS });
    }
}
module.exports = new AuthController;
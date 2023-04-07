const res_do_util = require('../utils/res.do.util');
const messages_util = require('../utils/message.util');
const constant_util = require('../utils/constant.util');
const User = require('../models/user.model');
class LoginController {
    //Đăng nhập
    get_login(req, res) {
        res.render(constant_util.page.LOGIN, { layout: constant_util.layout.LOGIN, title: constant_util.title.LOGIN });
    }
    //Xử lý đăng nhập
    async post_login(req, res) {
        try {
            const { log, pwd } = req.body;
            if (!log || !pwd) {//Kiểm tra giá trị đầu vào
                res_do_util.data = { log: log };
                res_do_util.error = messages_util.ERR_LOGIN;
                return res.render(constant_util.page.LOGIN, { layout: constant_util.layout.LOGIN, title: constant_util.title.LOGIN, data: res_do_util });
            }
            const user = await User.finByEmail(log);
            if (!user) {//Kiểm tra email
                res_do_util.data = { log: log };
                res_do_util.error = messages_util.ERR_NOTFOUND_EMAIL;
                return res.render(constant_util.page.LOGIN, { layout: constant_util.layout.LOGIN, title: constant_util.title.LOGIN, data: res_do_util });
            } else {
                const isPasswordValid = await user.comparePassword(pwd); //Kiểm tra mật khẩu
                if (!isPasswordValid) {
                    res_do_util.data = { log: log };
                    res_do_util.error = messages_util.ERR_WRONG_PASS;
                    return res.render(constant_util.page.LOGIN, { layout: constant_util.layout.LOGIN, title: constant_util.title.LOGIN, data: res_do_util });
                } else {
                    //Đăng nhập thành công
                    req.session.user = user;
                    const returnTo = req.session.returnTo || constant_util.redirect.ADMIN
                    return res.redirect(returnTo);
                }
            }
        } catch (error) {
            res_do_util.error = messages_util.ERR_SERVER;
            return res.render(constant_util.page.LOGIN, { layout: constant_util.layout.LOGIN, title: constant_util.title.LOGIN, data: res_do_util });
        }
    }

    //Đăng xuất
    get_logout(req, res) {
        delete req.session.user;
        res.redirect(constant_util.redirect.HOME);
    }
    //Quên mật khẩu
    get_forgot_pwd(req, res) {
        res.render(constant_util.page.FORGOT_PASS, { layout: constant_util.layout.LOGIN, title: Constants.title.constant_util });
    }
}
module.exports = new LoginController;
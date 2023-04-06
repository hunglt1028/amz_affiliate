const home_router = require('./home.router');
const new_router = require('./new.router');
const error_router = require('./error.router');
const login_router = require('./login.router');
const admin_router= require('./admin.router');
const auth_middleware=require('../middlewares/auth.middlewares');
module.exports=(app)=>{
    app.use('/login',login_router);
    app.use('/admin',auth_middleware.requireLogin,admin_router);
    app.use('/news', new_router);
    app.use('/',home_router);
}
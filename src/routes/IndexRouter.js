const homeRouter = require('./HomeRouter');
const newsRouter = require('./NewsRouter');
const errorRouter = require('./ErrorRouter');
const loginRouter = require('./AuthRouter');
const dashboardRouter= require('./DashboardRouter');
const auth=require('../middlewares/Auth');
module.exports=(app)=>{
    app.use('/auth',loginRouter);
    app.use('/dashboard',auth.requireLogin,dashboardRouter);
    app.use('/news', newsRouter);
    app.use('/',homeRouter);
}
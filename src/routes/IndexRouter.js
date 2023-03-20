const homeRouter = require('./HomeRouter');
const newsRouter = require('./NewsRouter');
const errorRouter = require('./ErrorRouter');
const authRouter = require('./AuthRouter');
const loginRouter = require('./LoginRouter');
module.exports=(app)=>{
    app.use('/admin/login',loginRouter);
    app.use('/admin',authRouter);
    app.use('/news', newsRouter);
    app.use('/',homeRouter);
    //app.get('*',errorRouter);
}
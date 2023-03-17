const homeRouter = require('./HomeRouter');
const newsRouter = require('./NewsRouter');
const errorRouter = require('./ErrorRouter');
module.exports=(app)=>{
    app.use('/news', newsRouter);
    app.use('/',homeRouter);
    //app.get('*',errorRouter);
}
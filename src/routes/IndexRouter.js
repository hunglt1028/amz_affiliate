const homeRouter = require('./HomeRouter');
const newsRouter = require('./NewsRouter');
module.exports=(app)=>{
    app.get('/news', newsRouter);
    app.get('/',homeRouter);
}
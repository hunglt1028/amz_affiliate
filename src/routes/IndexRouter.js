const homeRouter = require('./HomeRouter');
const newsRouter = require('./NewsRouter');
const errorRouter = require('./ErrorRouter');
const User = require('../models/User');
module.exports=(app)=>{
    app.use('/create-user',async (req,res)=>{
        const user = await User.create({firstName:'Hung', lastName:'Le Tien', email:'hunglt@neosvietnam.vn', password:'123456a@'});
        res.send(user);
        res.end();
    });
    app.use('/login', (req, res)=>{
        res.send('hello');
        res.end();
    })
    app.use('/news', newsRouter);
    app.use('/',homeRouter);
    //app.get('*',errorRouter);
}

const conn = require('../repositories/Repository');
const Category = require('./Category');

async function testConnect(){
    try{
        await conn.authenticate();
        //await conn.sync();
        Category.create({name:'Cá Chép'});
        console.log('Connected');
    }catch(err){
        console.log(err);
    }
}
testConnect();
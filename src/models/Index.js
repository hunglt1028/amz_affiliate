const Sequelize = require('sequelize');

const config = require('../config/DbConfig');

const Category = require('./Category');
const User = require('./User');
//Connect db
const sequelize = new Sequelize(config.dbname, config.user, config.password,{
    host:config.host,
    dialect:config.dialect,
    pool:{
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
});
const db ={};
//Connect db
sequelize.authenticate()
.then(()=>{console.log('Connected database ');})
.catch(err=>{console.error('Unable to connect to database ',err)});
User.init(sequelize);
Category.init(sequelize);

db.sequelize=sequelize;
db.Sequelize = Sequelize;
db.sequelize.sync({force:false})
.then(()=>{
    console.log('re-sync done!');
})

module.exports =db;
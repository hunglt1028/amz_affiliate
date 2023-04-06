const Sequelize = require('sequelize');

const config = require('../config/database');

const Category = require('../models/cat.model');
const User = require('../models/user.model');
const Tag = require('../models/tag.model');
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
Tag.init(sequelize)
db.sequelize=sequelize;
db.Sequelize = Sequelize;


db.sequelize=sequelize;
db.Sequelize = Sequelize;
db.sequelize.sync({force:true})
.then(()=>{
    //Create Admin Account
    User.create({firstName:'Hung', lastName:'Le Tien', email:'hunglt1028@gmail.com',password:'1'});
    console.log('re-sync done!');
})

module.exports =db;
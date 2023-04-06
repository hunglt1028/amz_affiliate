const Sequelize = require('sequelize');
const db_config = require('../config/database');
const User = require('./user.model');
const Tag = require('./tag.model');
const Category = require('./cat.model');
//Connect db
const sequelize = new Sequelize(db_config.dbname, db_config.user, db_config.password,{
    host:db_config.host,
    dialect:db_config.dialect,
    pool:{
        max: db_config.pool.max,
        min: db_config.pool.min,
        acquire: db_config.pool.acquire,
        idle: db_config.pool.idle
    }
});
const db ={};
//Connect db
sequelize.authenticate()
.then(()=>{console.log('Connected database ');})
.catch(err=>{console.error('Unable to connect to database ',err)});
User.init(sequelize);
Tag.init(sequelize)
Category.init(sequelize);

db.sequelize=sequelize;
db.Sequelize = Sequelize;

// db.sequelize.sync({force:false})
// .then(()=>{
//     console.log('re-sync done!');
// })

module.exports = db;
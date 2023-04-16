const Sequelize = require('sequelize');
const db_config = require('../config/database');
const UserModel = require('./user.model');
const TagModel = require('./tag.model');
const CatModel = require('./cat.model');
//Connect db
const sequelize = new Sequelize(db_config.dbname, db_config.user, db_config.password, {
    host: db_config.host,
    dialect: db_config.dialect,
    pool: {
        max: db_config.pool.max,
        min: db_config.pool.min,
        acquire: db_config.pool.acquire,
        idle: db_config.pool.idle
    }
});
const db = {};
//Connect db
sequelize.authenticate()
    .then(() => { console.log('Connected database '); })
    .catch(err => { console.error('Unable to connect to database ', err) });
//Thêm model cho các quan hệ 
const models = {
    CatModel: CatModel.init(sequelize)
}
UserModel.init(sequelize);
TagModel.init(sequelize);

CatModel.associate(models);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// db.sequelize.sync({force:false})
// .then(()=>{
//     console.log('re-sync done!');
// })

module.exports = db;
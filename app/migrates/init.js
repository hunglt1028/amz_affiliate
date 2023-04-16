const Sequelize = require('sequelize');

const config = require('../config/database');

const TagModel = require('../models/tag.model');
const CatModel = require('../models/cat.model');
const UserModel = require('../models/user.model');
//Connect db
const sequelize = new Sequelize(config.dbname, config.user, config.password, {
    host: config.host,
    dialect: config.dialect,
    pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
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
TagModel.init(sequelize)
CatModel.associate(models);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

try {
    db.sequelize = sequelize;
    db.Sequelize = Sequelize;
    db.sequelize.sync({ force: true })
        .then(() => {
            //Create Admin Account
            UserModel.create({ firstName: 'Hung', lastName: 'Le Tien', email: 'hunglt1028@gmail.com', password: '1' });
            console.log('re-sync done!');
        })

} catch (error) {
    console.log(error)
}

module.exports = db;
const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const appConfig = require('../config/AppConfig');
class user extends Model {
    async comparePassword(password){
        return bcrypt.compare(password, this.password);
    }
    generateToken(){
        return jwt.sign({userId: this.id}, appConfig.jwt.secret, {expiresIn: appConfig.jwt.expiration});
    }
    static async finByEmal(email){
        return this.findOne({where:{email:email}});
    }
    static init(sequelize){
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            firstName: {
                type:DataTypes.STRING(100),
                allowNull: false,
            },
            lastName: {
                type:DataTypes.STRING(200),
                allowNull: false,
            },
            email: {
                type:DataTypes.STRING(200),
                allowNull: false,
            },
            password:{
                type:DataTypes.STRING(200),
                allowNull: false,
            }
        },{
            tableName: 'user',
            sequelize,
            modelName: 'User',
            hooks:{
                beforeCreate: async(user)=>{
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            }
        })
    }
}
module.exports = user;
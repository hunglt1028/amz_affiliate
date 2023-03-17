const {Model, DataTypes} = require('sequelize');
class Category extends Model {
    static init(sequelize){
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type:DataTypes.STRING,
                allowNull: false,
            },
            active:{
                type: DataTypes.BOOLEAN,
                defaultValue:true
            }
        },{
            tableName: 'p_category',
            sequelize
        })
    }

    //static associate(models){
    //    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    //}
}
module.exports = Category;
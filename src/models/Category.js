const {Model, DataTypes,Op} = require('sequelize');
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
                unique:true
            },
            active:{
                type: DataTypes.BOOLEAN,
                defaultValue:true
            },
            link:{
                type:DataTypes.STRING,
                allowNull:false,
            },
            parent:{
                type:DataTypes.INTEGER,
                allowNull:true
            }
        },{
            tableName: 'p_category',
            sequelize,
            indexes: [
                {
                  unique: true,
                  fields: ['name'] 
                }
              ]
        })
    }
    static async getCategorys(index=1, page_size=15, str){
        let offset =(index-1)*page_size;
        let limit= page_size;
        return Category.findAndCountAll({
            offset:offset,
            limit:limit,
            where:{
                name: !str ? {[Op.not]:null} : {[Op.iLike]:`%${str}%`}
            }
        });
    }
}
module.exports = Category;
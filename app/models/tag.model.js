const {Model, DataTypes} = require('sequelize');
const { Op } = require('sequelize');
class TagModel extends Model {
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
                type: DataTypes.STRING,
                allowNull:false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull:true
            }
        },{
            tableName: 'p_tag',
            sequelize,
            indexes: [
                {
                    unique: true,
                    fields: ['name'] // tạo index trên trường email
                }
            ],
            hooks: {
                //kiểm tra slug tồn tại
                //beforeCreate: async (tag) => {
                //  let i = 1;
                //  let link = tag.link;
                //  while (true) {
                //    const tagWithLink = await Tag.findOne({ where: { link: tag.link } });
                //    if (!tagWithLink) {
                //      break;
                //    }
                //    tag.link = `${link}-${i}`;
                //    i++;
                //  }
                //}
            }
        })
    }
    static async getTags(page=1,size=15,str=null){
        let limit = size;
        let offset = (page-1)*limit;

        return TagModel.findAndCountAll({limit:limit,offset:offset,
            where:{
                name: !str ? {[Op.not]:null} : {[Op.like]:`%${str}%`} 
            },
            attributes:['id','name','link','description'],
            order: [['id', 'DESC']]
        });
    }
}
module.exports = TagModel;
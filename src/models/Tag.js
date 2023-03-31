const {Model, DataTypes} = require('sequelize');
class Tag extends Model {
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
}
module.exports = Tag;
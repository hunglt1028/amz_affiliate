const { Model, DataTypes, Op } = require('sequelize');
class CatModel extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    unique: true,
                },
                active: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: true,
                },
                slug: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                parent_id: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
                    references: {
                        model: CatModel,
                        key: 'id',
                    },
                },
                description: {
                    type: DataTypes.STRING,
                    allowNull:true
                }
            },
            {
                tableName: 'p_category',
                modelName: 'CatModel',
                sequelize,
                indexes: [
                    {
                        unique: true,
                        fields: ['name'],
                    },
                ],
            }
        );
    }
    static associate(models) {
        CatModel.belongsTo(models.CatModel, { as: 'parent', foreignKey: 'parent_id' });
        CatModel.hasMany(models.CatModel, { as: 'children', foreignKey: 'parent_id' });
    }
    static async getCatsDrop() {
        return CatModel.findAll({
            where: { parent_id: null },
            include: [{ model: CatModel, as: 'children' }],
        });
    }

    static async getCats(page=1,size=15,str=null) {
        let limit = size;
        let offset = (page-1)*limit;

        return CatModel.findAndCountAll({
            limit: limit,
            offset: offset,
            where: {
                name: !str ? { [Op.not]: null } : { [Op.like]: `%${str}%` },
            },
            attributes: ['id', 'name', 'slug', 'description'],
            order: [['id', 'DESC']],
        });
    }
}
module.exports = CatModel;
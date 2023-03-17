const Category = require('../models/Category');
class NewsController{
    index(req,res){
        res.render('./news/index');
    }
    async createCategory(req,res){
        await Category.create({name:'Ca Thu'});
        res.render('./news/index');
    }
}
module.exports = new NewsController;
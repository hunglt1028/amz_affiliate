const CategoryModel = require('../models/cat.model');
class NewsController{
    index(req,res){
        res.render('./news/index');
    }
    async createCategory(req,res){
        await CategoryModel.create({name:'Ca Thu'});
        res.render('./news/index');
    }
}
module.exports = new NewsController;
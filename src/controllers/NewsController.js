class NewsController{
    index(req,res){
        res.render('./news/index');
    }
    
}
module.exports = new NewsController;
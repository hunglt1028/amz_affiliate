class ErrorController{
    notFound(req, res){
        res.render('error/404');
    }
}
module.exports = new ErrorController();
const constants = require('../utils/Constants');
class DashboardTags{
    getIndex(req,res){
        res.render('dashboard/tags',constants.layout.MAIN);
    }
}
module.exports = new DashboardTags;
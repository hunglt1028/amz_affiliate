const constants = require('../utils/Constants');
const Category = require('../models/Category');
const MESSAGES = require('../utils/Messages');
class DashboardCategoryController {
    static page_size = 12;
    async getIndex(req, res) {
        try {
            let index = 1;
            let cats = await Category.getCategorys(index, DashboardCategoryController.page_size);
            res.render(constants.page.DASHBOARD_CATEGORY, { layout: constants.layout.DASHBOARD, title: constants.title.DASHBOARD_CATEGORY, data: cats });
        } catch (error) {
            console.log(error);
        }
    }
    async postAdd(req, res) {
        try {
            let { name, link, description, parent } = req.body;
            if (!name || !link) {
                dataRes.status = STATUS.BAD_REQ;
                dataRes.error = MESSAGES.ERR_CATEGORY_ADD_REQIRED;
                return res.json(dataRes);
            }
            link = slugConvert(link);
            let cat = await Category.create({ name: name, link: link, description: description, parent: parent });
            dataRes.status = STATUS.SUSCCESS;
            dataRes.data = { 'id': cat.id, 'name': cat.name, 'link': cat.link, 'description': cat.description, 'parent': cat.parent };
            return res.json(dataRes);
        } catch (error) {
            dataRes.status = STATUS.BAD_REQ;
            dataRes.error = error;
            return res.json(dataRes);
        }
    }
}
module.exports = new DashboardCategoryController;
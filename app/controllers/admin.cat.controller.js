const constant_util = require('../utils/constant.util');
const CategoryModel = require('../models/cat.model');
const message_util = require('../utils/message.util');
class AdminCatController {
    static page_size = 12;
    async getIndex(req, res) {
        try {
            let index = 1;
            let cats = await CategoryModel.getCategorys(index, AdminCatController.page_size);
            res.render(constant_util.page.ADMIN_CATEGORY, { layout: constant_util.layout.ADMIN, title: constant_util.title.ADMIN_CATEGORY, data: cats });
        } catch (error) {
            console.log(error);
        }
    }
    async postAdd(req, res) {
        try {
            let { name, slug, description, parent } = req.body;
            if (!name || !slug) {
                dataRes.status = STATUS.BAD_REQ;
                dataRes.error = MESSAGES.ERR_CATEGORY_ADD_REQIRED;
                return res.json(dataRes);
            }
            slug = slugConvert(slug);
            let cat = await Category.create({ name: name, slug: slug, description: description, parent: parent });
            dataRes.status = STATUS.SUSCCESS;
            dataRes.data = { 'id': cat.id, 'name': cat.name, 'slug': cat.slug, 'description': cat.description, 'parent': cat.parent };
            return res.json(dataRes);
        } catch (error) {
            dataRes.status = STATUS.BAD_REQ;
            dataRes.error = error;
            return res.json(dataRes);
        }
    }
}
module.exports = new AdminCatController;
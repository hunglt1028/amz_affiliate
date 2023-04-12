const constant_util = require('../utils/constant.util');
const res_do_util = require('../utils/res.do.util');
const status_util = require('../utils/status.util');
const message_util = require('../utils/message.util');
const { slug_convert,isNotPaged } = require('../utils/common.util');
const { Op } = require('sequelize');
const TagModel = require('../models/tag.model');
class AdminTagController {
    static pageSize = 15;
    async get_index(req, res) {
        try {
            let s = req.query.s ?? '';
            let paged = parseInt(req.query.paged) ?? 1 ;
            if(isNotPaged(paged)) paged=1; //Kiểm tra kiểu dữ liệu
            let tags = await TagModel.getTags(paged, AdminTagController.pageSize, s);
            let listTag = tags.rows.map(tag => tag.get({ plain: true }));
            let totalCount = tags.count;
            let totalPage = Math.ceil(totalCount / AdminTagController.pageSize);
            let data = {};
            data.tags = listTag;
            data.totalCount = totalCount;
            data.totalPage = totalPage;
            data.s = s;
            data.paged = paged;
            res.render(constant_util.page.ADMIN_TAG, { layout: constant_util.layout.ADMIN, data: data ,title: constant_util.title.ADMIN_TAG});
        } catch (error) {
            console.log(error);
        }
    }
    async post_create(req, res) {
        try {
            let { name, slug, description } = req.body;
            if (!name || !slug) {
                res_do_util.status = status_util.BAD_REQ;
                res_do_util.error = message_util.ERR_TAG_ADD_REQIRED;
                return res.json(res_do_util);
            }
            slug = slug_convert(slug);
            let tag = await TagModel.create({ name: name, slug: slug, description: description });
            res_do_util.status = status_util.SUSCCESS;
            res_do_util.data = { 'id': tag.id, 'name': tag.name, 'slug': tag.slug, 'description': tag.description };
            return res.json(res_do_util);
        } catch (error) {
            //console.log(error);
            res_do_util.status = status_util.BAD_REQ;
            res_do_util.error = error;
            return res.json(res_do_util);
        }
    }
    async post_delete(req, res) {
        try {
            let {id}= req.body;
            await TagModel.destroy({where:{id:id}});
            return res.status(200).end();
        } catch (error) {
            return res.status(500).json({error:error});
        }
    }
    async post_action(req, res) {
        try {
            let { delete_tags, action } = req.body;
            if (action == 1) {
                await TagModel.destroy({where:{id:{[Op.in]:delete_tags}}});
                res_do_util.status = status_util.SUSCCESS;
                return res.redirect(constant_util.redirect.ADMIN_TAGS);
            }else{
                return res.redirect(constant_util.redirect.ADMIN_TAGS);
            }
        } catch (error) {
            console.log('error', error);
            return res.redirect(constant_util.redirect.ADMIN_TAGS);
        }
    }
    async get_update(req, res) {
        try {
            let id = req.query.id;
            let tag = (await TagModel.findByPk(id)).get({plain:true});
            return res.render(constant_util.page.ADMIN_TAG_UPDATE, { layout: constant_util.layout.ADMIN, data: tag, title: constant_util.title.ADMIN_TAG_UPDATE });
        } catch (error) {
            console.log('error', error);
            return res.redirect(constant_util.redirect.ADMIN_TAGS);
        }
    }
    async post_update(req, res) {
        try {
            let {id, name, slug, description } = req.body;
            let tag = await TagModel.findByPk(id);
            if(!tag){
                res_do_util.status = status_util.NOT_FOUND;
                res_do_util.error = message_util.ERR_TAG_NOT_FOUND;
                return res.json(res_do_util);
            }
            if (!name || !slug) {
                res_do_util.status = status_util.BAD_REQ;
                res_do_util.error = message_util.ERR_TAG_ADD_REQIRED;
                return res.json(res_do_util);
            }
            await tag.update({name:name,slug:slug,description:description});
            res_do_util.status = status_util.SUSCCESS;
            res_do_util.data = { 'id': tag.id, 'name': tag.name, 'slug': tag.slug, 'description': tag.description };
            return res.status(200).json(res_do_util);
        } catch (error) {
            console.log(error);
            res_do_util.status = status_util.BAD_REQ;
            res_do_util.error = error;
            return res.json(res_do_util);
        }
    }
}
module.exports = new AdminTagController;
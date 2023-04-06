const constant_util = require('../utils/constant.util');
const res_do_util= require('../utils/res.do.util');
const status_util = require('../utils/status.util');
const message_util = require('../utils/message.util');
const {slug_convert} = require('../utils/common.util');
const { Op } = require('sequelize');
const TagModel = require('../models/tag.model');
class AdminTagController{
    static pageSize=15;
    async get_index(req,res){
        try {
            let q= req.query.q ?? '';
            let paged = req.query.paged ?? 1;
            let tags= await TagModel.getTags(paged,AdminTagController.pageSize,q);
            let listTag= tags.rows.map(tag=>tag.get({plain:true}));
            let totalCount = tags.count;
            let totalPage=Math.ceil(totalCount/AdminTagController.pageSize);
            let data={};
            data.tags=listTag;
            data.totalCount=totalCount;
            data.totalPage=totalPage;
            data.q= q;
            data.paged=paged;
            res.render(constant_util.page.ADMIN_TAG,{layout:constant_util.layout.ADMIN,data:data});   
        } catch (error) {
            console.log(error);
        }
    }
    async post_create(req,res){
        try {
            let {name, link, description} =req.body;
            if(!name || !link){
                res_do_util.status=status_util.BAD_REQ;
                res_do_util.error=message_util.ERR_TAG_ADD_REQIRED;
                return res.json(res_do_util);
            }
            link = slug_convert(link);
            let tag = await TagModel.create({name:name, link:link, description:description});
            res_do_util.status = status_util.SUSCCESS;
            res_do_util.data={'id':tag.id,'name':tag.name,'link':tag.link,'description':tag.description};
            return res.json(res_do_util);   
        } catch (error) {
            console.log(error);
            res_do_util.status=status_util.BAD_REQ;
            res_do_util.error=error;
            return res.json(res_do_util);
        }
    }
    async post_delete(req, res){
        try {
            let {items}= req.body;
            await TagModel.destroy({where:{id:{[Op.in]:items}}});
            res_do_util.status = status_util.SUSCCESS;
            return res.redirect(constant_util.redirect.ADMIN_TAGS);
        } catch (error) {
            console.log('error',error);
            return res.redirect(constant_util.redirect.ADMIN_TAGS);
        }
    }
    async get_update(req, res){
        try {
            let id= req.query.id;
            let tag= await TagModel.findByPk(id);
            data.tag
            res_do_util.status = status_util.SUSCCESS;
            return res.redirect(constant_util.redirect.ADMIN_TAGS);
        } catch (error) {
            console.log('error',error);
            return res.redirect(constant_util.redirect.ADMIN_TAGS);
        }
    }
    async post_update(req, res){
        try {
            let id= req.query.id;
            let tag= await TagModel.findByPk(id);
            data.tag
            res_do_util.status = status_util.SUSCCESS;
            return res.redirect(constant_util.redirect.ADMIN_TAGS);
        } catch (error) {
            console.log('error',error);
            return res.redirect(constant_util.redirect.ADMIN_TAGS);
        }
    }
}
module.exports = new AdminTagController;
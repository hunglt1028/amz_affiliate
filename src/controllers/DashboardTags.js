const constants = require('../utils/Constants');
const dataRes= require('../utils/ResponseDO');
const STATUS = require('../utils/Status');
const MESSAGES = require('../utils/Messages');
const {slugConvert} = require('../utils/Common');
const { Op } = require('sequelize');
const Tag = require('../models/Tag');
class DashboardTags{
    static pageSize=15;
    async getIndex(req,res){
        try {
            let q= req.query.q ?? '';
            let paged = req.query.paged ?? 1;
            let tags= await Tag.getTags(paged,DashboardTags.pageSize,q);
            let listTag= tags.rows.map(tag=>tag.get({plain:true}));
            let totalCount = tags.count;
            let totalPage=Math.ceil(totalCount/DashboardTags.pageSize);
            let data={};
            data.tags=listTag;
            data.totalCount=totalCount;
            data.totalPage=totalPage;
            data.q= q;
            data.paged=paged;
            res.render(constants.page.DASHBOARD_TAG,{layout:constants.layout.DASHBOARD,data:data});   
        } catch (error) {
            console.log(error);
        }
    }
    async postAdd(req,res){
        try {
            let {name, link, description} =req.body;
            if(!name || !link){
                dataRes.status=STATUS.BAD_REQ;
                dataRes.error=MESSAGES.ERR_TAG_ADD_REQIRED;
                return res.json(dataRes);
            }
            link = slugConvert(link);
            let tag = await Tag.create({name:name, link:link, description:description});
            dataRes.status = STATUS.SUSCCESS;
            dataRes.data={'id':tag.id,'name':tag.name,'link':tag.link,'description':tag.description};
            return res.json(dataRes);   
        } catch (error) {
            dataRes.status=STATUS.BAD_REQ;
            dataRes.error=error;
            return res.json(dataRes);
        }
    }
    async postDel(req, res){
        try {
            let {items}= req.body;
            await Tag.destroy({where:{id:{[Op.in]:items}}});
            console.log('items',items);
            dataRes.status = STATUS.SUSCCESS;
            console.log('items',items);
            return res.redirect(constants.redirect.DASHBOARD_TAGS);
        } catch (error) {
            console.log('error',error);
            return res.redirect(constants.redirect.DASHBOARD_TAGS);
        }
    }
}
module.exports = new DashboardTags;
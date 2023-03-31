const constants = require('../utils/Constants');
const dataRes= require('../utils/ResponseDO');
const STATUS = require('../utils/Status');
const MESSAGES = require('../utils/Messages');
const {slugConvert} = require('../utils/Common');
const Tag = require('../models/Tag');
class DashboardTags{
    async getIndex(req,res){
        let total =await Tag.count();
        let listTag= await Tag.findAll({limit:15,offset:0});
        listTag= listTag.map(tag=>tag.get({plain:true}));
        res.render('dashboard/tags',{layout:constants.layout.DASHBOARD,tags:listTag,total:total});
    }
    async postAdd(req,res){
        let {name, link, description} =req.body;
        if(!name || !link){
            dataRes.status=STATUS.BAD_REQ;
            dataRes.error=MESSAGES.ERR_TAG_ADD_REQIRED;
            return res.json(dataRes);
        }
        try {
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
}
module.exports = new DashboardTags;
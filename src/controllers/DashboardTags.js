const constants = require('../utils/Constants');
const dataRes= require('../utils/ResponseDO');
const STATUS = require('../utils/Status');
const MESSAGES = require('../utils/Messages');
const {slugConvert} = require('../utils/Common');
const Tag = require('../models/Tag');
class DashboardTags{
    static pageSize=6;
    async getIndex(req,res){
        let pageIndex=1
        let tags= await Tag.getTags(pageIndex,DashboardTags.pageSize,null);
        let listTag= tags.rows.map(tag=>tag.get({plain:true}));
        let totalCount = tags.count;
        let totalPage=Math.ceil(totalCount/DashboardTags.pageSize);
        let data={};
        data.tags=listTag;
        data.totalCount=totalCount;
        data.totalPage=totalPage
        res.render(constants.page.DASHBOARD_TAG,{layout:constants.layout.DASHBOARD,data:data});
    }
    async search(req,res){
        try {
            let q= req.query.q ?? '';
            let index = req.query.index ?? 1;
            let tags = await Tag.getTags(index, DashboardTags.pageSize, q);    
            dataRes.status = STATUS.SUSCCESS;
            dataRes.data=tags;
            return res.json(dataRes);

        } catch (error) {
            console.log(error);
            dataRes.status = STATUS.ERROR_SERVER;
            dataRes.error = error;
            return res.json(dataRes);
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
            let {id}= req.body;
            await Tag.destroy({where:{id:id}});
            dataRes.status = STATUS.SUSCCESS;
            return res.json(dataRes);
        } catch (error) {
            dataRes.status=STATUS.BAD_REQ;
            dataRes.error=error;
            return res.json(dataRes);
        }
    }
}
module.exports = new DashboardTags;
let ArticleCont = {}

let artData = require('../mockdata/article.json')

const model = require('../model/model.js')
const {delsucc,delfail,exception,argsfail,addsucc,addfail,getsucc,getfail,updsucc,updfail}=require('../util/responseMessage.js');
ArticleCont.allArticle = async (req,res)=>{
    let {page,limit:pagesize} = req.query;
    let offset = (page - 1)*pagesize;
    let sql = `select * from article limit ${offset},${pagesize}`;
    let sql2 = `select count(*) as count from article`;
    let data = await model(sql)
    let datacount = await model(sql2)
    let response = {code:0,count:datacount[0].count,data:data,msg:""}
    // res.json(artData)
    res.json(response)
}
ArticleCont.delArticle = async (req,res)=>{
    let {art_id} = req.body;
    let sql = `delete from article where art_id = ${art_id}`;
    let result = await model(sql);
    if(result.affectedRows){
        res.json(delsucc)
    }else{
        res.json(delfail)
    }

}

module.exports = ArticleCont
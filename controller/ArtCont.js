let ArticleCont = {}
const fs = require('fs')

let artData = require('../mockdata/article.json')

const model = require('../model/model.js')
const {delsucc,delfail,exception,argsfail,addsucc,addfail,getsucc,getfail,updsucc,updfail}=require('../util/responseMessage.js');
ArticleCont.allArticle = async (req,res)=>{
    let {page,limit:pagesize} = req.query;
    let offset = (page - 1)*pagesize;
    let sql = `select t1.*,t2.name from article t1 left join category t2 on t1.cat_id = t2.cat_id order by art_id desc limit ${offset},${pagesize}`;
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

ArticleCont.artAdd = (req,res)=>{
    res.render('article-add.html')
}

ArticleCont.postArt =async (req,res)=>{
    let {title,cat_id,status,content} = req.body
    let sql = `insert into article(title,content,cat_id,status,cover,publish_date) value('${title}','${content}',${cat_id},${status},'${cover}',now())`;
    let result = await model(sql)
    if(result.affectedRows){
        res.json(addsucc)
    }else{
        res.json(addfail)
    }
    res.json(req.body)
}

ArticleCont.artEdit = (req,res)=>{
    res.render('article-edit.html')
}

ArticleCont.upload = (req,res)=>{
    if(req.file){
    // 进行文件的重命名即可 fs.rename
    let {originalname,destination,filename} = req.file;
    let dotIndex = originalname.lastIndexOf('.');
    let ext = originalname.substring(dotIndex);
    let oldPath = `${destination}${filename}`;
    let newPath = `${destination}${filename}${ext}`;
    fs.rename(oldPath,newPath,err=>{
    if(err){ throw err; }
    res.json({code:0,message:'上传文件成功','src':newPath})
    })
    }else{
    res.json({code:1,message:'没有上传文件'})
    }
    }



module.exports = ArticleCont
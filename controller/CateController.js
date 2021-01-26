let CateController = {}
const model = require('../model/model.js');
const {delsucc,delfail,exception,argsfail,addsucc,addfail,getsucc,getfail,updsucc,updfail}=require('../util/responseMessage.js');
CateController.artindex = (req,res)=>{
    res.render('article-index.html')
}
// 渲染后台分类列表页面
CateController.catindex = (req,res)=>{
    res.render('category-index.html')
}

CateController.data = (req,res)=>{
    res.render('cate-data.html')
    // res.sendFile(path.join(__dirname,'views/cate-data.html'))
}
//  获取分类数据的接口
CateController.getCate = async (req,res)=>{
    let sql = "select * from category order by sort desc"
    let data = await model(sql)
    res.json(data)
}
// 获取单条分类数据
CateController.getOneCate = async (req,res)=>{
    // 1.接收参数
   let {cat_id} = req.query;
   if(!cat_id){
       res.json(argsfail)
   }else{
       // 2.查询数据库
       let sql = `select * from category where cat_id = ${cat_id}`;
       let data = await model(sql);
       // 3.返回数据
       if(data.length){
            data[0].errcode = 0;
            res.json(data[0])
       }else{
           res.json(getfail)
       }
   }
}
// 实现分类的编辑入库
CateController.update = async (req,res)=>{
    //1.接收参数
    let {cat_id,name,sort,add_date} = req.body
    if(!cat_id){
        res.json(argsfail);
        return;
    }
    //2.编写sql
    let sql = `update category set name='${name}',sort=${sort},add_date='${add_date}' 
                where cat_id = ${cat_id}`;
    let result = await model(sql)
    //3.返回结果
    if(result.affectedRows){
        res.json(updsucc)
    }else{
        res.json(updfail)
    }  
}

// 删除分类
CateController.delCat = async (req,res)=>{
    let {cat_id} = req.body;
    // 判断参数
    if(!cat_id){
        res.json(argsfail)
    }else{
        cat_id = parseInt(cat_id);
        let sql = `delete from category where cat_id = ${cat_id}`
        let result;
        let response;
        try{
            // 成功
            result = await model(sql)
            if(result.affectedRows){
                response =  delsucc;
            }else{
                response =  delfail;
            }
        }catch(e){
            // 失败
            response =  exception;
        }
        res.json(response)
    }
}
// ===========
// 展示添加分类的页面
CateController.catadd = (req,res)=>{
    res.render('category-add.html')
}
// 展示编辑分类的页面
CateController.catedit = (req,res)=>{
    res.render('category-edit.html')
}
// 添加分类接口
CateController.catpost = async (req,res)=>{
    //接收参数
    let {name,sort,add_date} = req.body;
    let sql = `insert into category(name,sort,add_date) values('${name}',${sort},'${add_date}')`
    let result = await model(sql);
    if(result.affectedRows){
        res.json(addsucc)
    }else{
        res.json(addfail)
    }
}
module.exports = CateController;
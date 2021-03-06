let express = require('express');
var multer = require('multer')
var upload = multer({dest: 'uploads/'})
let router = express.Router();
let path = require('path')
const UserController = require('../controller/UserController.js');
const model = require('../model/model.js');
const CateController = require('../controller/CateController.js');
const ArtCont = require('../controller/ArtCont.js');
router.get('/cateCount',async (req,res)=>{
    let sql = `select count(*) total ,t2.name,t1.cat_id from article t1 
                left join category t2 
                on t1.cat_id = t2.cat_id 
                group by  t1.cat_id`;
    let data = await model(sql);
    res.json(data)
})
router.get(/^\/$|^\/admin$/,(req,res)=>{
    // let data = {
    //     userInfo:req.session.userInfo
    // }
    // res.render('index.html',data)
    res.render('index.html')
})
//文章列表
router.get('/artindex',CateController.artindex)
// 数据
router.get('/data',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/cate-data.html'))
})
//渲染后台分类列表页面
router.get('/catindex',CateController.catindex)
//渲染出添加分类的页面
router.get('/catadd',CateController.catadd)

//渲染出编辑分类的页面
router.get('/catedit',CateController.catedit)
//提交分类数据
router.post('/catpost',CateController.catpost)
router.get('/artadd',(req,res)=>{
    res.render('article-add.html')
})
//获取所有分类数据的接口
router.get('/getCate',CateController.getCate)
//获取所有分类数据的接口
router.get('/getOneCate',CateController.getOneCate)
//删除分类的接口
router.post('/delCat',CateController.delCat)
// //编辑分类的接口
router.post('/update',CateController.update)

router.get('/allarticle',ArtCont.allArticle)

//删除文章
router.post('/delArticle',ArtCont.delArticle)

router.get('/artedit',ArtCont.artEdit)

// router.get('/artadd',ArtCont.artAdd)

router.post('/postart',ArtCont.postArt)

router.post('/upload',upload.single('file'),ArtCont.upload)

router.post('/updArt',ArtCont.updArt)

router.get('/login',(req,res)=>{
    if(req.session.userInfo){
        res.redirect('/')
        return
    }
    res.render('login.html')
})

router.post('/signin',UserController.signin)
//退出登录
router.get('/logout',(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            throw err
        }
    })
    res.json({message:'退出成功'})
})

//安全设置
router.get('/anquan',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/anquan.html'))
})

router.post('/repsd',UserController.repsd)

router.get('/touxiang',(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/touxiang.html'))
})

router.get('/touxiangjiazai',UserController.touxiangjiazai)

router.post('/xiugaitouxiang',UserController.xiugaitouxiang)

router.all('*',(req,res)=>{
    res.json({errcode:10004,message:"请求错误"})
})
module.exports = router;
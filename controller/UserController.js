let UserController = {};
const model = require('../model/model.js');
let md5 = require('md5')
// let {secret:passSecret} = require('../config/app.json')
UserController.signin = async (req,res)=>{
   
    let {username,password} = req.body;
    //数据库查询,要把密码md5加密之后在判断
    // password = md5(`${password}${passSecret}`);
    let sql = `select * from users where username='${username}' and password = '${password}'`
    let data = await model(sql);
    if(data.length){
        let userInfo = data[0];
        req.session.userInfo = userInfo; 
        res.json({errcode:0,message:'登录成功'})
    }else{
        res.json({errcode:10008,message:'用户名或密码错误'})
    }

}


UserController.repsd = async (req,res)=>{
    let {username,password} = req.body
    console.log(username,password);
    let sql = `UPDATE users SET PASSWORD=${password} WHERE username='${username}';`
    console.log(sql);
    let data = await model(sql);
    console.log(data);
    console.log(data.length);
    console.log(data.affectedRows);
    if(data.affectedRows>0){
        
        res.json({errcode:0,message:'修改成功'})
    }else{
        res.json({errcode:10008,message:'修改失败'})
    }
}

UserController.touxiangjiazai = async (req,res)=>{
    let path = req.query
    
        // 2.查询数据库
        let sql = `SELECT avatar FROM users where username = 'admin'`;
        let data = await model(sql);
        console.log(data[0].avatar);
        // 3.返回数据
        if(data){
            //  data[0].errcode = 0;
             res.json({errcode:0,message:data[0].avatar})
        }else{
            res.json({errcode:10008,message:"获取错误"})
        }
    
}

UserController.xiugaitouxiang = async (req,res)=>{
    let {cover} = req.body
    console.log(cover);
    let sql = `UPDATE users SET avatar='${cover}' WHERE username='admin'`;
    console.log(sql);
    let data = await model(sql);
    console.log(data);
    console.log(data.length);
    console.log(data.affectedRows);
    if(data.affectedRows>0){
        
        res.json({errcode:0,message:'修改成功'})
    }else{
        res.json({errcode:10008,message:'修改失败'})
    }
}


module.exports = UserController;
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

module.exports = UserController;
const express = require('express');
const path = require('path');
const app = express();
let session =require('express-session')

// 初始化session,定义session一些配置
let options = {
    name:"SESSIONID", // 待会写入到cookie中标识
    secret: "FGVH$#E%&", // 用来加密会话，防止篡改。
    cookie: {
        httpOnly: true,
        secure: false, // false-http(默认), true-https
        maxAge:60000*24, // session在cookies存活24分钟，
        // 再次访问，时间重置为24分钟， 24分钟内只要不访问则会失效
    }
};
app.use( session(options) )
// 导入路由模块
const router = require('./router/router.js')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public',express.static(path.join(__dirname,'public')));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));
const artTemplate = require('art-template'); 
const express_template = require('express-art-template');
app.set('views', __dirname + '/views/');
app.engine('html', express_template); 
app.set('view engine', 'html');
app.use(router)
app.listen(4000,_=>console.log('http://127.0.0.1:4000'))
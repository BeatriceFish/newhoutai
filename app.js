const express = require('express');
const path = require('path');
const app = express();
// 导入路由模块
const router = require('./router/router.js')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public',express.static(path.join(__dirname,'public')));
const artTemplate = require('art-template'); 
const express_template = require('express-art-template');
app.set('views', __dirname + '/views/');
app.engine('html', express_template); 
app.set('view engine', 'html');
app.use(router)
app.listen(4000,_=>console.log('http://127.0.0.1:4000'))
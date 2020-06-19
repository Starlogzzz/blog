// 引入express框架
const express = require('express');

// 创建博客展示页面路由
const admin = express.Router();

// 渲染登陆界面
admin.get('/login', require('./admin/loginPage'));
// 登陆功能
admin.post('/login', require('./admin/login'));

// 创建用户列表路由
admin.get('/user', require('./admin/userPage'));

// 实现退出功能
admin.get('/logout', require('./admin/logout'));

// 创建用户编辑页面路由
admin.get('/user-edit', require('./admin/user-edit'));

// 创建实现用户添加功能路由
admin.post('/user-edit', require('./admin/user-edit-fn'));

admin.post('/user-modify', require('./admin/user-modify'));

// 删除用户功能路由
admin.get('/delete', require('./admin/user-delete'));

// 文章列表页面路由
admin.get('/article', require('./admin/article'));

// 文章编辑页面路由 
admin.get('/article-edit', require('./admin/article-edit'));

// 文章添加功能路由
admin.post('/article-add', require('./admin/article-add'));

// 将路由对象作为模块成员进行导出
module.exports = admin;
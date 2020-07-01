# blog
基于nodejs的简单博客管理系统

### 运行说明

1.运行需要依赖node环境
2.运行需要下载数据库mongodb，下载完成之后进行相关配置
3.登录数据库时，本系统将mongodb管理员密码存储在本地电脑环境变量中，在系统变量中添加环境变量，key为APP_PASSWORD，值为密码

运行前先 npm init 或者yarn init下载所需node包模块
全部完成之后在根目录下执行node app.js 即可运行

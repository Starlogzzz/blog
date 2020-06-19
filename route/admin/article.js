// 将文章集合的构造函数导入到页面中
const { Article } = require('../../model/article');
// 导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    // 接收客户端传递过来的页码
    const page = req.query.page;
    // 标识 表示当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';
    // 查询所有文章数据
    let articles = await pagination(Article).find().page(page).size(2).display(3).populate('author').exec();

    // res.send(articles);
    res.render('admin/article.art', {
        articles: articles
    });
}
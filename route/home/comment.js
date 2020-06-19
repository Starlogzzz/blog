// 将评论集合构造函数导入
const { Comment } = require('../../model/comment');

module.exports = async (req, res) => {
    // 接受客户端传递的请求参数
    const { content, uid, aid } = req.body;

    // 将评论数据存储在评论集合
    await Comment.create({
        content: content,
        uid: uid,
        aid: aid,
        time: new Date()
    });

    // 页面重定向到文章详情页面
    res.redirect('/home/article?id=' + aid);
}
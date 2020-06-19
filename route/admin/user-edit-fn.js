

const { User, validateUser } = require('../../model/user');
// 加密模块
const bcrypt = require('bcrypt');
module.exports = async (req, res, next) => {



    try {
        await validateUser(req.body)
    } catch (e) {
        // 验证没有通过
        // e.message
        // 重定向到用户添加页面
        // return res.redirect(`/admin/user-edit?message=${e.message}`)
        return next(JSON.stringify({ path: '/admin/user-edit', message: e.message }));
    }

    // 根据邮箱地址查询用户是否存在
    let user = await User.findOne({ email: req.body.email })
    // 如果用户存在 邮件地址已被占用
    if (user) {
        // 重定向到用户添加页面
        // return res.redirect(`/admin/user-edit?message=邮箱地址已经被占用了`)
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱地址已经被占用了' }));
    }

    // 加密密码
    // 生成随机字符串
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    // 替换密码
    req.body.password = password;
    // 添加到数据库
    await User.create(req.body);
    // 添加之后重定向到列表页
    res.redirect('/admin/user');
}
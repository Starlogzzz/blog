// 导入用户集合构造函数
const { User } = require('../../model/user');
// 导入bcrypt
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    // 接受请求参数
    const { email, password } = req.body;

    // if (email.trim().length == 0 || password.trim().length == 0) {
    //     return res.status(400).send('<h4>邮件地址或密码不正确</h4>');
    // }

    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/error', { msg: '邮件地址或密码不正确' });
    }
    // 根据邮箱地址查询用户信息
    // 查到了，user值为对象类型，对象中存储的是用户信息
    // 查不到，user为空
    let user = await User.findOne({ email })
    // 查询到了用户
    if (user) {
        // 比对密码
        let isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            // 将用户名存储在请求对象中
            req.session.username = user.username;
            // 将用户角色存储在请求对象中
            req.session.role = user.role;
            // res.send('登陆成功')
            req.app.locals.userInfo = user;
            // 对用户角色进行判断
            if (user.role == 'admin') {
                // 重定向到用户列表页面
                res.redirect('/admin/user');
            } else {
                // 跳转到博客首页
                res.redirect('/home/')
            }

        } else {
            res.status(400).render('admin/error', { msg: '邮件地址或密码错误' })
        }
    } else {
        // 没查询到
        res.status(400).render('admin/error', { msg: '邮件地址或密码错误' })
    }
}

module.exports = login;
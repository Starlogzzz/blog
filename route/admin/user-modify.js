const { User } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    // 接受客户端传递过来的请求参数
    const { username, email, role, state, password } = req.body;
    // 即将要修改的用户id
    const id = req.query.id;

    let user = await User.findOne({ _id: id });

    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
        // res.send('密码对比成功')
        // 更新用户数据
        await User.updateOne({ _id: id }, {
            username: username,
            email: email
        });

        // 重定向到用户列表页面
        res.redirect('/admin/user')
    } else {
        // 密码对比失败
        let obj = { path: '/admin/user-edit', message: '密码错误', id: id }
        next(JSON.stringify(obj));
    }
    // res.send(user)
}
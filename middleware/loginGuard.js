// import { model } from "mongoose";

const guard = (req, res, next) => {
    // 判断用户访问的是否是登陆界面
    // 判断用户的登陆状态
    // 如果用户是登陆的 将请求放行
    // 如果用户未登录，则跳转之登陆界面
    if (req.url != '/login' && !req.session.username) {
        res.redirect('/admin/login');
    } else {
        // 普通用户跳转到博客首页
        if (req.session.role == 'normal') {
            return res.redirect('/home/')
        }
        next();
    }
};

module.exports = guard;
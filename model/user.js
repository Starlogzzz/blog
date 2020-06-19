// 创建用户集合
// 引入mongoose
const mongoose = require('mongoose');
// 导入bcrypt
const bcrypt = require('bcrypt');
// 引入joi模块
const Joi = require('joi');
// 集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        // 保证邮箱不重复
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    // admin 管理员
    // normal 普通用户
    role: {
        type: String,
        required: true
    },
    // 0启用 1禁用
    state: {
        type: Number,
        default: 0
    }
});

// 创建集合
const User = mongoose.model('User', userSchema);

async function createUser() {
    const salt = await bcrypt.genSalt(10);
    const pass = await bcrypt.hash('123456', salt);
    const user = await User.create({
        username: 'Starlog',
        email: '785276471@qq.com',
        password: pass,
        role: 'admin',
        state: 0
    });
}

// createUser();

// 验证用户信息
const validateUser = user => {
    // 定义对象的验证规则
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
        email: Joi.string().email().required().error(new Error('邮箱格式错误')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,16}$/).required().error(new Error('密码格式不正确')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('非法值')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    };

    // 验证
    return Joi.validate(user, schema);
}

// 将用户集合作为模块成员导出
module.exports = {
    User,
    validateUser
}
// 导入bcrypt
const bcrypt = require('bcrypt');


async function run() {
    // 生成随机字符串

    // 返回生成的随机字符串
    const salt = await bcrypt.genSalt(10);
    // 对密码进行加密

    const result = await bcrypt.hash('123456', salt);
    console.log(salt);
    console.log(result);

}

run();
//引入express-jwt模块
const { expressjwt } = require('express-jwt');
//获取配置对象
const config = expressjwt({
    secret: 'xwg',
    algorithms: ['HS256'],
    credentialsRequired: false//是否对不带Token的请求进行鉴权验证,false:表示对请求头中不存在Token的请求，不进行校验(鉴权);true:无论请求头是否存在Token，都要校验(鉴权)，如果不存在，则响应401
}).unless({
    // path: ['/user/login', '/user/register']//配置白名单，不需要鉴权，可以是字符串类型:直接配置目标URL，也可以是正则:资源URL符合目标正则规则会作为白名单目标
    path: [/\/user\//]
});
module.exports = config;
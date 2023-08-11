const expressJwt=require('express-jwt');
const jwtAuth=expressJwt({
    secret:'PRIVATE_KEY', //为密码
    algorithms:['HS256'],//为jwt的算法
    credentialsRequired:false //如果为true，不管请求是否带token都要做验证，如果为false不做验证
}).unless({
    path:[
        /\/login/i, /\/register/i,/\/users\/add/
    ]
});
//unless表示的是要放行的配置
module.exports=jwtAuth;
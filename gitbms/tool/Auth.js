const expressJwt=require('express-jwt');
console.log(expressJwt)
const jwtAuth=expressJwt.expressjwt({
    secret:'PRIVATE_KEY', //为密码
    algorithms:['HS256'],//为jwt的算法
    credentialsRequired:true //如果为true，不管请求是否带token都要做验证，如果为false不做验证
}).unless({
    path:[
        '/api/login',
        '/api/wxLogin',
        '/api/chcsLogin',
        '/api/chcsWXLogin',
		'/api/wxCodeLogin',
        '/api/uploadImg',
        '/api/loginSys',
		// {url: /^\/api\/search.*$/, methods: ['POST','GET','OPTIONS']},
		// {url: /^\/api\/get.*$/, methods: ['POST','GET','OPTIONS']},
        {url: /^\/public\/upload\/.*$/, methods: ['POST','GET']},
        {url: /^\/public\/getAll\/.*$/, methods: ['POST','GET']},
        {url: /^\/public\/img\/.*$/, methods: ['POST','OPTIONS','GET']},
        {url: /^\/public\/.*$/, methods: ['POST','OPTIONS','GET']},
        // {url: /^\/api\/getAll.*$/, methods: ['POST','GET','OPTIONS']},
        
        {url:/^.*$/, methods: ['OPTIONS', 'POST','GET']}
        // {url:/^\/api\/search.*$/,methods:['GET','POST']},
        // {url:/^\/home\/.*/,methods:['GET','POST']}
    ]
});
//unless表示的是不需要验证权限的接口
module.exports=jwtAuth;
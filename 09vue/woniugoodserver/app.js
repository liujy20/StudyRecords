var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./utils/dbutils');
//导入jwt.js文件
const jwtAuth = require('./utils/jwt');



//引入一级路由
//后台
var goodsCategoryRouter = require('./routes/admin/goodsCategory');
var stockRouter = require('./routes/admin/stock');
var goodsRouter = require('./routes/admin/goods');
var groupGoodsRouter = require('./routes/admin/groupGoods');
var couponRouter = require('./routes/admin/coupon');
var orderManagementRouterAD = require('./routes/admin/orderManagement')
var groupOrderRouterAD = require("./routes/admin/groupOrder")
var couponLogRouter = require('./routes/admin/couponLog');
var usersRouterAD = require("./routes/admin/users") 
var tagRouterAD = require("./routes/admin/tag")
var userGroupAD = require("./routes/admin/userGroup")
var userLevelAD = require("./routes/admin/userLevel")
var couponLogRouter = require('./routes/admin/couponLog');
var systemRouter = require('./routes/admin/system');
var systemUserRouter = require('./routes/admin/systemUser');
var adminUserRouter = require('./routes/admin/adminUser');
//前端
var goodsCategoryHRouter = require('./routes/home/goodsCategory');
var goodsHRouter = require('./routes/home/goods');
var groupGoodsHRouter = require('./routes/home/groupGoods');
var orderManagementRouter = require('./routes/home/orderManagement')
var groupOrderRouter = require("./routes/home/groupOrder")
var couponLogHRouter = require('./routes/home/couponLog');
var couponHRouter = require('./routes/home/coupon');

var app = express();
// 设置 CORS 允许跨域
var allowCrossDomain = function (req, res, next) {
  // 设置允许跨域访问的请求源（* 表示接受任意域名的请求）   
  res.header("Access-Control-Allow-Origin", "*");
  // 设置允许跨域访问的请求头
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept,Authorization");
  // 设置允许跨域访问的请求类型
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // 同意 cookie 发送到服务器（如果要发送cookie，Access-Control-Allow-Origin 不能设置为星号）
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//设置jwtAuth必须要放在所有的一级路由之前
// app.use(jwtAuth);
// 设置跨域
app.use(allowCrossDomain); 

//订单管理接口
app.use("/orderManagement", orderManagementRouter);
app.use("/orderManagementAD", orderManagementRouterAD);
//拼团订单接口
app.use("/groupOrder", groupOrderRouter);
app.use("/groupOrderAD", groupOrderRouterAD);
//用户管理接口
app.use("/usersAD",usersRouterAD)
//用户标签接口
app.use("/tagAD",tagRouterAD)
//用户分组接口
app.use("/userGroupAD",userGroupAD)
//用户等级接口
app.use("/userLevelAD",userLevelAD)
//后台接口
app.use("/goodsCategory", goodsCategoryRouter);
app.use("/stock", stockRouter);
app.use("/goods", goodsRouter);
app.use("/groupGoods", groupGoodsRouter);
app.use("/coupon", couponRouter);
app.use("/couponLog", couponLogRouter);
app.use("/system",systemRouter);
app.use("/systemUser",systemUserRouter);
app.use("/admin",adminUserRouter);


//前端接口
app.use("/home/goodsCategory", goodsCategoryHRouter);
app.use("/home/goods", goodsHRouter);
app.use("/home/groupGoods", groupGoodsHRouter);
app.use("/home/couponLog", couponLogHRouter);
app.use("/home/coupon", couponHRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// 切换后台端口4001
app.listen(4001, () => { console.log('在线商城后台服务已启动，切勿关闭，关闭4001'); });

module.exports = app;

// 连接数据库
require('./util/dbConnect')
// 创建模型
require('./util/allModel')

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


// CORS 配置跨域
var allowCrossDomain = function (req, res, next) {
  // 设置允许跨域访问的请求源（* 表示接受任意域名的请求）   
  res.header("Access-Control-Allow-Origin", "*");
  // 设置允许跨域访问的请求头
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept");
  // 设置允许跨域访问的请求类型
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // 同意 cookie 发送到服务器（如果要发送cookie，Access-Control-Allow-Origin 不能设置为星号）
  res.header('Access-Control-Allow-Credentials', 'true');
  // 当请求头中携带了token之后，这里需要在配置允许该请求头的出现
  res.header("Access-Control-Allow-Headers", "Authorization");
  next();
};
app.use(allowCrossDomain);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// 导入一级路由
// --------------------------------------------------------
let stuClass=require('./routes/stuClass')
app.use('/class',stuClass)
// --------------------------------------------------------
let student=require('./routes/student')
app.use('/student',student)
// --------------------------------------------------------
let score=require('./routes/score')
app.use('/score',score)
// --------------------------------------------------------

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// module.exports = app;
app.listen(1234,()=>{
  console.log('http://127.0.0.1:1234 running');
})

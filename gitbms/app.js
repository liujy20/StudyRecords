var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var db = require('./tool/SqlLiteTool').DB;

var Utils = require('./tool/Utils');
var Auth = require('./tool/Auth');
const multer = require("multer");
console.log("__dirname", __dirname);

var app = express();
app.use(multer({dest: __dirname + "/temp"}).array("file"));
app.use(Auth);
// app.use((req, res, next) => {
// //访问接口前需要验证的部分,比如token校验
// console.log(44444,req.headers.authorization);
// next();
// })
//这是我写的注释, 2023-03-03 15:44
//我又写了一个注释，2023-03-03 15:48
//我在guoqiang分支下写了一个注释，哈哈  2023-03-03 15:52

// 设置 CORS 允许跨域
var allowCrossDomain = function (req, res, next) {
  // 设置允许跨域访问的请求源（* 表示接受任意域名的请求）   
  res.header("Access-Control-Allow-Origin", "*");
  // // // // 设置允许跨域访问的请求头
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept,Authorization");
  // // // 设置允许跨域访问的请求类型
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  // // // 同意 cookie 发送到服务器（如果要发送cookie，Access-Control-Allow-Origin 不能设置为星号）
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
};



// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(allowCrossDomain);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var router = express.Router();



var LoginController = require('./controller/LoginController');
var StudentController = require('./controller/StudentController');
var StockController = require('./controller/StockController');
var RoleController = require('./controller/RoleController');
var UserController = require('./controller/UserController');
var CommonController = require('./controller/CommonController');
var TabelController = require('./controller/TabelController');
var CXController = require('./controller/CXController');
var MeetingController = require('./controller/MeetingController');
var CHCSUserController = require('./controller/CHCSUserController');
var CHCSDoctorController = require('./controller/CHCSDoctorController');
var CHCSTeamController = require('./controller/CHCSTeamController');
var CHCSResidentController = require('./controller/CHCSResidentController');
var CHCSLabelController = require('./controller/CHCSLabelController');
var CHCSServiceItemController = require('./controller/CHCSServiceItemController');
var CHCSServiceDetailController = require('./controller/CHCSServiceDetailController');
var CHCSSignController = require('./controller/CHCSSignController');
var CHCSResidentWeightController = require('./controller/CHCSResidentWeightController');
var CHCSResidentBloodPressureController = require('./controller/CHCSResidentBloodPressureController');
var CHCSResidentBloodSugarController = require('./controller/CHCSResidentBloodSugarController');
var CHCSResidentHeartRateController = require('./controller/CHCSResidentHeartRateController');
var CHCSJoinTeamApplyController = require('./controller/CHCSJoinTeamApplyController');
var CHCSServiceController = require('./controller/CHCSServiceController');
var CHCSStatisticsController = require('./controller/CHCSStatisticsController');
var CHCSRoleController = require('./controller/CHCSRoleController');
var CHCSHealthFollowUpController = require('./controller/CHCSHealthFollowUpController');
var CHCSOrganController = require('./controller/CHCSOrganController');
/* GET home page. */
// app.get('/login', function (req, res, next) {
//   console.log("1111");
//   db.login(req, res);
// });



//DataV
var DataVController = require('./controller/DataVController');
router.get('/testa', DataVController.testa);
router.get('/testb', DataVController.testb);
//CHCS

//权限模块
//取得所有权限菜单及按钮
router.post('/getCHCSAllPower', CHCSUserController.getAllPower);
//取得用户拥有的权限
router.post('/getCHCSUserPower', CHCSUserController.getUserPower);
//对角色进行授权
router.post('/saveCHCSRolePrivilege', CHCSUserController.saveCHCSRolePrivilege);
//用户名密码登录
router.post('/chcsLogin', CHCSUserController.login);
//微信登录
router.post('/chcsWXLogin', CHCSUserController.wxLogin);
//用户
//修改密码
router.post('/updateUserPasswordById', CHCSUserController.updateUserPasswordById);
//医生
router.post('/getDoctorByUserId', CHCSDoctorController.getDoctorByUserId);
router.post('/updateDoctorMsgStatusByUserId', CHCSDoctorController.updateDoctorMsgStatusByUserId);
router.post('/getDoctorDefaultTeamOrgById', CHCSDoctorController.getDoctorDefaultTeamOrgById);
router.post('/getDoctorTeamOrgById', CHCSDoctorController.getDoctorTeamOrgById);
router.post('/updatePictureById', CHCSDoctorController.updatePictureById);
router.post('/updateTelById', CHCSDoctorController.updateTelById);
router.post('/updateRoleIdById', CHCSDoctorController.updateRoleIdById);
router.post('/updateDescriptionById', CHCSDoctorController.updateDescriptionById);
router.post('/updateAdeptById', CHCSDoctorController.updateAdeptById);
router.post('/getDoctorStatisticsByUserId', CHCSDoctorController.getDoctorStatisticsByUserId);
router.post('/getDoctorById', CHCSDoctorController.getDoctorById);
router.post('/getDoctorByPageSearch', CHCSDoctorController.getDoctorByPageSearch);
router.post('/delDoctorById', CHCSDoctorController.delDoctorById);
router.post('/updateDoctorFlagById', CHCSDoctorController.updateDoctorFlagById);
router.post('/saveDoctor', CHCSDoctorController.saveDoctor);
router.post('/updateDoctorById', CHCSDoctorController.updateDoctorById);
router.post('/getDoctorDetailById', CHCSDoctorController.getDoctorDetailById);
//团队
router.post('/saveTeam', CHCSTeamController.saveTeam);
router.post('/joinTeam', CHCSTeamController.joinTeam);
router.post('/searchTeamByNameNumber', CHCSTeamController.searchTeamByNameNumber);
router.post('/getDefaultTeamIdByDoctorId', CHCSTeamController.getDefaultTeamIdByDoctorId);
router.post('/getNotJoinTeamIdByDoctorId', CHCSTeamController.getNotJoinTeamIdByDoctorId);
router.post('/getDoctorByTeamId', CHCSTeamController.getDoctorByTeamId);
router.post('/getTOSSMLById', CHCSTeamController.getTOSSMLById);
router.post('/updateManageByTeamIdDoctorId', CHCSTeamController.updateManageByTeamIdDoctorId);
router.post('/delTeamById', CHCSTeamController.delTeamById);
router.post('/getTeamByOrganId', CHCSTeamController.getTeamByOrganId);
router.post('/getBasicDoctorByTeamId', CHCSTeamController.getBasicDoctorByTeamId);
router.post('/getTeamBySearchPage', CHCSTeamController.getTeamBySearchPage);
router.post('/updateFlagById', CHCSTeamController.updateFlagById);
router.post('/dissolveTeamById', CHCSTeamController.dissolveTeamById);
router.post('/getSearchNotJoinTeamIdByDoctorId', CHCSTeamController.getSearchNotJoinTeamIdByDoctorId);
router.post('/getDoctorBasicByTeamId', CHCSTeamController.getDoctorBasicByTeamId);
router.post('/getServiceBasicByTeamId', CHCSTeamController.getServiceBasicByTeamId);
router.post('/saveTeamService', CHCSTeamController.saveTeamService);
router.post('/getServiceByTeamIdPage', CHCSTeamController.getServiceByTeamIdPage);
router.post('/getTeamOrganLabelByTeamId', CHCSTeamController.getTeamOrganLabelByTeamId);
router.post('/updateTeamById', CHCSTeamController.updateTeamById);
router.post('/retreatTeamByTeamIdDoctorId', CHCSTeamController.retreatTeamByTeamIdDoctorId);

//居民
router.post('/saveResident', CHCSResidentController.saveResident);
router.post('/getResidentLabelHealthById', CHCSResidentController.getResidentLabelHealthById);
router.post('/getAllResidentLabel', CHCSResidentController.getAllResidentLabel);
router.post('/getNotSignResident', CHCSResidentController.getNotSignResident);
router.post('/updateRLHById', CHCSResidentController.updateRLHById);
router.post('/getAllBasicResidentBySearch', CHCSResidentController.getAllBasicResidentBySearch);
router.post('/saveLabelResidentRelation', CHCSResidentController.saveLabelResidentRelation);
router.post('/getResidentBySOTSLByPage', CHCSResidentController.getResidentBySOTSLByPage);
//标签
router.post('/getLabelAndResidentCount', CHCSLabelController.getLabelAndResidentCount);
router.post('/saveLabel', CHCSLabelController.saveLabel);
router.post('/getLabelByStatus', CHCSLabelController.getLabelByStatus);
router.post('/getResidentByLabelId', CHCSLabelController.getResidentByLabelId);
router.post('/getResidentByNotLabelId', CHCSLabelController.getResidentByNotLabelId);
router.post('/getLabelBySearchPage', CHCSLabelController.getLabelBySearchPage);
router.post('/updateStatusById', CHCSLabelController.updateStatusById);
router.post('/updateLabelNameById', CHCSLabelController.updateLabelNameById);
router.post('/delLabelById', CHCSLabelController.delLabelById);
//服务项
router.post('/getServiceItemByServiceId', CHCSServiceItemController.getServiceItemByServiceId);
//服务
router.post('/getServiceDetailByDoctorId', CHCSServiceDetailController.getServiceDetailByDoctorId);
router.post('/getServiceDetailByResidentId', CHCSServiceDetailController.getServiceDetailByResidentId);
router.post('/updateStatusByServiceDetailId', CHCSServiceDetailController.updateStatusByServiceDetailId);
router.post('/getServiceCountByRIdSId', CHCSServiceDetailController.getServiceCountByRIdSId);
router.post('/saveServiceDetail', CHCSServiceDetailController.saveServiceDetail);
router.post('/getSDRSSIBySOTSTSPage', CHCSServiceDetailController.getSDRSSIBySOTSTSPage);
router.post('/getServiceDetailById', CHCSServiceDetailController.getServiceDetailById);
router.post('/getSDOTDSSIByResidentId', CHCSServiceDetailController.getSDOTDSSIByResidentId);
//签约
router.post('/getServiceByDIdRidStatus', CHCSSignController.getServiceByDIdRidStatus);
router.post('/updateSignStatusById', CHCSSignController.updateSignStatusById);
router.post('/getServiceByRId', CHCSSignController.getServiceByRId);
router.post('/getServiceByDIdLimit', CHCSSignController.getServiceByDIdLimit);
router.post('/getResidentLabelByDId', CHCSSignController.getResidentLabelByDId);
router.post('/getStatisticsByDId', CHCSSignController.getStatisticsByDId);
router.post('/saveSign', CHCSSignController.saveSign);
router.post('/getSRTSBySTOSDPage', CHCSSignController.getSRTSBySTOSDPage);
router.post('/getSignById', CHCSSignController.getSignById);
router.post('/updateSignResidentBySid', CHCSSignController.updateSignResidentBySid);
router.post('/getOTDSByResidentId', CHCSSignController.getOTDSByResidentId);
//体重
router.post('/getWeightByResidentId', CHCSResidentWeightController.getWeightByResidentId);
//心率
router.post('/getHeartRateByResidentId', CHCSResidentHeartRateController.getHeartRateByResidentId);
//血压
router.post('/getBloodPressureByResidentId', CHCSResidentBloodPressureController.getBloodPressureByResidentId);
//血糖
router.post('/getBloodSugarByResidentId', CHCSResidentBloodSugarController.getBloodSugarByResidentId);
//加入团队申请
router.post('/getJoinTeamApplyByTeamId', CHCSJoinTeamApplyController.getJoinTeamApplyByTeamId);
//服务包
router.post('/getServiceLabelItem', CHCSServiceController.getServiceLabelItem);
router.post('/delServiceById', CHCSServiceController.delServiceById);
//数据统计
router.post('/getSTRSRSDSDed', CHCSStatisticsController.getS_TR_SR_SD_SDed);
router.post('/getSRSSByMonths', CHCSStatisticsController.getS_R_S_SByMonths);
router.post('/getToDealt', CHCSStatisticsController.getToDealt);
router.post('/getResidentLabelStatistics', CHCSStatisticsController.getResidentLabelStatistics);
router.post('/getResidentHealth', CHCSStatisticsController.getResidentHealth);
router.post('/getThisWeekSign', CHCSStatisticsController.getThisWeekSign);
//角色
router.post('/getAllRole', CHCSRoleController.getAllRole);
router.post('/delRoleById', CHCSRoleController.delRoleById);
router.post('/saveRole', CHCSRoleController.saveRole);
//健康随访
router.post('/getHealthFollowUpBySDId', CHCSHealthFollowUpController.getHealthFollowUpBySDId);
//机构
router.post('/getOrganBySearchPage', CHCSOrganController.getOrganBySearchPage);
router.post('/updateOrganStatusById', CHCSOrganController.updateOrganStatusById);
router.post('/delOrganById', CHCSOrganController.delOrganById);
router.post('/updateOrganById', CHCSOrganController.updateOrganById);
router.post('/saveOrgan', CHCSOrganController.saveOrgan);








//会议系统相关
router.post('/bookingMeetingRoom', MeetingController.bookingMeetingRoom);
router.post('/publishMeeting', MeetingController.publishMeeting);
router.post('/getJoinMeeting', MeetingController.getJoinMeeting);
router.post('/getGradeTemplate', MeetingController.getGradeTemplate);
router.post('/doGradeMeeting', MeetingController.doGradeMeeting);
router.post('/getMyBookingRoom', MeetingController.getMyBookingRoom);


//出行相关
router.post('/orderTraval', CXController.orderTraval);
router.post('/cancelTravelOrder', CXController.cancelTravelOrder);


//库存相关
router.post('/createStock', StockController.createStock);
router.post('/stockIn', StockController.stockIn);
router.post('/stockOut', StockController.stockOut);

router.post('/login', LoginController.login);
router.post('/loginSys', LoginController.loginSys);

router.post('/wxLogin', LoginController.wxLogin);
router.post('/wxCodeLogin', LoginController.wxCodeLogin);

router.post('/uploadImg', LoginController.uploadImg);
router.post('/getAllMenu', LoginController.getAllMenu);


router.get('/getStudents', StudentController.getStudents);
router.post('/saveStudents', StudentController.saveStudents);
router.post('/delStudents', StudentController.delStudents);
router.post('/getStudentById', StudentController.getStudentById);
router.post('/updateStudent', StudentController.updateStudent);

router.get('/searchRoles', RoleController.searchRoles);
router.post('/saveRole', RoleController.saveRole);
router.post('/delRole', RoleController.delRole);
router.post('/getRoleById', RoleController.getRoleById);
router.post('/updateRole', RoleController.updateRole);
router.post('/saveRolePrivilege', RoleController.saveRolePrivilege);


router.get('/searchUsers', UserController.searchUsers);
router.post('/saveUser', UserController.saveUser);
router.post('/delUser', UserController.delUser);
router.post('/getUserById', UserController.getUserById);
router.post('/updateUser', UserController.updateUser);
router.post('/saveVote', UserController.saveVote);
router.post('/searchPowerByUserId', LoginController.searchPowerByUserId);
router.post('/getOptions', CommonController.getOptions);

router.post('/searchTabel', TabelController.searchTabel);
router.post('/getTabelDoc', TabelController.getTabelDoc);
router.post('/updateTableSql', TabelController.updateTableSql);


db.query("SELECT * FROM sqlite_master where type='table'",[]).then(rows => {
  // console.log(rows);
  for (let table of rows) {
    let tableName = Utils.getUpperWord(table.tbl_name);
    router.post('/search' + tableName, CommonController.search);
    router.post('/save' + tableName, CommonController.save);
    router.post('/del' + tableName, CommonController.del);
    router.post('/get' + tableName + 'ById', CommonController.getById);
    router.post('/update' + tableName, CommonController.update);
    router.post('/getAll' + tableName, CommonController.getAll);
    
    // console.log(tableName);
  }
});

db.query("SELECT * FROM sys_restfull",[]).then(rows => {
  // console.log(rows);
  for (let table of rows) {
    let restfullKey = table.sqlKey;
    router.post('/restfull/' + restfullKey, CommonController.restfull);
    
    console.log('注册接口：/restfull/' + restfullKey);
  }
});


app.use('/api', router);
console.log("dirname", __dirname);
app.use('/public', express.static(path.join(__dirname, 'public')));


app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  console.log("error4444",  err);

  if (err.name === 'UnauthorizedError') {   
    res.status(401);
    res.send('invalid token');
  } else {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }

  
});




var debug = require('debug')('bms:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

let ip = "127.0.0.1";
console.log(`服务器接口已经启动，ip地址：${ip}, 端口：${port}`);
let serviceAddress = "http://127.0.0.1:3000";
console.log(`接口基础地址：${serviceAddress}`);
//module.exports = app;





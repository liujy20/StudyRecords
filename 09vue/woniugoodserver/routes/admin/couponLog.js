var express = require('express');
var router = express.Router();
const couponLog = require('../../controller/admin/couponLogController');



//查看优惠券 用户名称 优惠劵状态 优惠劵名称查询
router.post('/get',couponLog.get)

module.exports = router;
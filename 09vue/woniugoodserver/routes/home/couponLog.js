var express = require('express');
var router = express.Router();
const couponLog = require('../../controller/home/couponLogController');


//领取优惠券
router.post('/add',couponLog.add)

//查看优惠券 通过用户ID获取已领取的优惠劵
router.post('/get',couponLog.get)

module.exports = router;
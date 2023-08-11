var express = require('express');
var router = express.Router();
const coupon = require('../../controller/home/couponController');


//查询优惠券
router.get('/get', coupon.get);

module.exports = router;
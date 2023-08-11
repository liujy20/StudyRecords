var express = require('express');
var router = express.Router();
const coupon = require('../../controller/admin/couponController');

//添加优惠券
router.post('/add', coupon.add);

//查询优惠券
router.post('/get', coupon.get);

//修改优惠券
router.post('/set', coupon.set);

//删除优惠券
router.post('/delete', coupon.delete);

module.exports = router;
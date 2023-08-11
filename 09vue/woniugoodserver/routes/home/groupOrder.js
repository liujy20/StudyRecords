var express = require('express');
var router = express.Router();
const {add,join,searchGroupOrder,searchOne} = require('../../controller/home/groupOrderController');

//新增拼团订单
router.post('/add', add);
router.post('/join', join);
router.get('/searchGroupOrder', searchGroupOrder);
router.get('/searchOne', searchOne);

module.exports = router;
var express = require('express');
var router = express.Router();
const {add,getClassifyCount,getClassify,getOne,updateOne,deleteOne} = require('../../controller/home/orderManagementController');

//新增订单
router.post('/add', add);
//获取用户所有订单分类数量
router.get('/getClassifyCount', getClassifyCount);
//获取用户订单单类
router.get('/getClassifyOne', getClassify);
//获取用户单个订单
router.get('/getOne', getOne);
//修改订单状态
router.post('/updateOne', updateOne);
//删除子订单
router.post('/deleteOne', deleteOne);
module.exports = router;
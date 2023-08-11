var express = require('express');
var router = express.Router();
const groupGoods = require('../../controller/admin/groupGoodsController');

//添加拼团商品
router.post('/add', groupGoods.add);

//编辑拼团商品
router.post('/set', groupGoods.set);

//获取拼团商品
router.post('/get', groupGoods.get);

//删除拼团商品
router.post('/delete', groupGoods.delete);

module.exports = router;
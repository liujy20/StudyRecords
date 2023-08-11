var express = require('express');
var router = express.Router();
const goods = require('../../controller/admin/goodsController');

//新增商品
router.post('/add', goods.add);

//查询商品所有商品一级
router.post('/getGoods',goods.getGoods)

//修改商品信息
router.post('/set',goods.set)

//删除商品信息
router.post('/delete',goods.delete)

module.exports = router;
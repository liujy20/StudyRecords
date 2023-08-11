var express = require('express');
var router = express.Router();
const goods = require('../../controller/home/goodsController');


//查询商品所有商品一级
router.post('/getGoods',goods.getGoods)

module.exports = router;
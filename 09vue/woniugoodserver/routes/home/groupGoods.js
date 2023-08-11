var express = require('express');
var router = express.Router();
const groupGoods = require('../../controller/home/groupGoodsController');



//获取拼团商品 
router.post('/get', groupGoods.get);



module.exports = router;
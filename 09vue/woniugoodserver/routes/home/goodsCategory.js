var express = require('express');
var router = express.Router();
const goodsCategory = require('../../controller/home/goodsCategoryController');


//查询所有商品分类
router.get('/getAll', goodsCategory.getAll);

//查询一级商品分类
router.get('/getOne', goodsCategory.getOne);

//查询一级商品分类
router.post('/getTwo', goodsCategory.getTwo);

module.exports = router;

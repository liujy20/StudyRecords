var express = require('express');
var router = express.Router();
const goodsCategory = require('../../controller/admin/goodsCategoryController');

//新增商品分类
router.post('/add', goodsCategory.add);

//查询所有商品分类
router.post('/getAll', goodsCategory.getAll);

//查询一级商品分类
router.get('/getOne', goodsCategory.getOne);

//条件查询一级商品分类
router.post('/getCategory', goodsCategory.getCategory);

//条件查询商品分类
router.post('/set', goodsCategory.set);

//删除商品分类（软删除 show改为false）
router.post('/delete', goodsCategory.delete);

module.exports = router;

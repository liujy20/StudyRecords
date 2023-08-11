var express = require('express');
var router = express.Router();
const stock = require('../../controller/admin/stockController');

//删除商品分类（软删除 show改为false）
router.post('/delete', stock.delete);


module.exports = router;
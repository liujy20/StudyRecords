var express = require('express');
var router = express.Router();
const {getSearch,getOne} = require('../../controller/admin/groupOrderController');

router.get('/getSearch',getSearch)
router.get('/getOne',getOne)


module.exports = router;
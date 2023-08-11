var express = require('express');
var router = express.Router();
const {add,del,find,findOne,update} = require('../../controller/admin/tagController');

router.post("/add",add)
router.post("/del",del)
router.get("/find",find)
router.get("/findOne",findOne)
router.post("/update",update)


module.exports = router;
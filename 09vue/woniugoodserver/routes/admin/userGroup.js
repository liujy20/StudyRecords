var express = require('express');
var router = express.Router();
const {add,del,update,find} = require('../../controller/admin/userGroupController');

router.post("/add",add)
router.post("/del",del)
router.post("/update",update)
router.get("/find",find)


module.exports = router;
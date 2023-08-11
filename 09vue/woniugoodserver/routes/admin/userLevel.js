var express = require('express');
var router = express.Router();
const {addLevel,find,del,update} = require('../../controller/admin/userLevelController');


router.post("/addLevel",addLevel)
router.get("/find",find)
router.post("/del",del)
router.post("/update",update)



module.exports = router;
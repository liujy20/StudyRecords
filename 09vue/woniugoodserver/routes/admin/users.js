var express = require('express');
var router = express.Router();
const {getSearch,addUser} = require('../../controller/admin/usersController');

router.get('/getSearch',getSearch)
router.post("/addUser",addUser)




module.exports = router;
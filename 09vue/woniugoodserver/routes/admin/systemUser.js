var express = require('express');
var router = express.Router();
const systemUser = require('../../controller/admin/systemUserController');

//新增角色
router.post('/add', systemUser.add);

router.post('/get', systemUser.get);

router.post('/getbyId', systemUser.getbyId);

router.post('/set', systemUser.set);

router.post('/delete', systemUser.delete);

module.exports = router;
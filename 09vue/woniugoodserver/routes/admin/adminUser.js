var express = require('express');
var router = express.Router();
const systemUser = require('../../controller/admin/adminUserController');

//新增管理员
router.post('/add', systemUser.add);

router.post('/login', systemUser.login);

router.get('/getUserInfo', systemUser.getUserInfo);

router.post('/get', systemUser.get);


router.post('/set', systemUser.set);

router.post('/delete', systemUser.delete);

module.exports = router;
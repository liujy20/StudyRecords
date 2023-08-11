var express = require('express');
var router = express.Router();
const system = require('../../controller/admin/systemController');

//新增规则
router.post('/add', system.add);

router.post('/get', system.get);

router.post('/set', system.set);

router.post('/delete', system.delete);

module.exports = router;
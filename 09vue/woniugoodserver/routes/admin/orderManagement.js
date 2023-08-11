var express = require('express');
var router = express.Router();
const {getOne,getSearch,deleteOne,getCash,getAfterOrder,getAfterOrderOne,updateAfterOrder,getUpdate,getHistory} = require('../../controller/admin/orderManagementController');

router.get('/getSearch',getSearch)
router.get('/getOne',getOne)
router.get('/getCash',getCash)
router.get('/getAfterOrder',getAfterOrder)
router.get('/getAfterOrderOne',getAfterOrderOne)
router.post('/getUpdate',getUpdate)
router.post('/deleteOne',deleteOne)
router.get('/getHistory',getHistory)
router.post('/updateAfterOrder',updateAfterOrder)




module.exports = router;
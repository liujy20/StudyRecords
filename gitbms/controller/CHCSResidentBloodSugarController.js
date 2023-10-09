
var common = require('../tool/Common');
var db = require('../tool/SqlLiteTool').DB;
var UUID = require('uuid');

//根据居民详情id查询居民指定条数血糖数据
module.exports.getBloodSugarByResidentId =async function (req, res) {
    let {residentId,limit}=req.body;
    let re=await db.query('SELECT * FROM chcs_residentBloodSugar WHERE flag=0 AND residentId=? LIMIT ?',[residentId,limit])
    common.sendResponse(res, 200, {
        code: 200,
        msg: '查询成功!',
        data:re
    });
}
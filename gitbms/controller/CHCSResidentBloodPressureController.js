
var common = require('../tool/Common');
var db = require('../tool/SqlLiteTool').DB;
var UUID = require('uuid');

//根据居民详情id查询居民指定条数血压数据
module.exports.getBloodPressureByResidentId =async function (req, res) {
    let {residentId,limit}=req.body;
    let re=await db.query('SELECT * FROM chcs_residentBloodPressure WHERE flag=0 AND residentId=? LIMIT ?',[residentId,limit]);
    if(re.length>0){
        common.sendResponse(res, 200, {
            code: 200,
            msg: '查询成功!',
            data:re
        });
    }else{
        common.sendResponse(res, 200, {
            code: 500,
            msg: '查询失败!无查询结果!'
        });
    }
}

var common = require('../tool/Common');
var db = require('../tool/SqlLiteTool').DB;
var UUID = require('uuid');
const { toOneArray } = require('../tool/Utils');

//根据服务id查询健康随访信息
module.exports.getHealthFollowUpBySDId = async function (req, res) {
    let healthFollowUp = await db.query('SELECT * FROM chcs_healthFollowUp WHERE flag=0 AND serviceDetailId=?', [req.body.serviceDetailId]);

    common.sendResponse(res, 200, {
        code: 200,
        msg: '查询成功!',
        data: healthFollowUp
    });
}
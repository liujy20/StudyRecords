
var common = require('../tool/Common');
var db = require('../tool/SqlLiteTool').DB;
var UUID = require('uuid');

//根据服务包id查询服务项信息
module.exports.getServiceItemByServiceId = async function (req, res) {
    let { serviceId } = req.body;
    let re=await db.query('SELECT * FROM chcs_serviceItem WHERE id IN(SELECT serviceItemId FROM chcs_serviceServiceItem_relation WHERE flag=0 AND serviceId=?)', [serviceId]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '查询成功!',
        data:re
    });

}
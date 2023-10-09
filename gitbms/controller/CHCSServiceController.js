
var common = require('../tool/Common');
var db = require('../tool/SqlLiteTool').DB;
var UUID = require('uuid');
const { toOneArray } = require('../tool/Utils');

//查询所有服务包以及对应标签以及服务项信息
module.exports.getServiceLabelItem =async function (req, res) {
    let service=await db.query('SELECT * FROM chcs_service WHERE flag=0');
    let pList=service.map(async s=>{
        let p1=db.query('SELECT * FROM chcs_label WHERE id IN(SELECT labelId FROM chcs_serviceLabel_relation WHERE flag=0 AND serviceId=?)',[s.id]);
        let p2=db.query('SELECT * FROM chcs_serviceItem WHERE flag=0 AND id IN(SELECT serviceItemId FROM chcs_serviceServiceItem_relation WHERE flag=0 AND serviceId=?)',[s.id]);
        let labelArr=await p1;
        let si=await p2;
        s['labelArr']=labelArr;
        s['serviceItem']=si;
        return [p1,p2];
    });
    Promise.all(toOneArray(pList)).then(function(){
        common.sendResponse(res, 200, {
            code: 200,
            msg: '查询成功!',
            data:service
        });
    })
}
// 根据id删除服务包信息
module.exports.delServiceById =async function (req, res) {
    let {id}=req.body;
    await db.update('UPDATE chcs_service SET flag=1 WHERE id=?',[id]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '删除成功!'
    });
}
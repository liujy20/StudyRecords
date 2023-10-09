
var common = require('../tool/Common');
var db = require('../tool/SqlLiteTool').DB;
var UUID = require('uuid');

//根据团队id查询团队申请消息
module.exports.getJoinTeamApplyByTeamId =async function (req, res) {
    let {teamId}=req.body;
    let re=await db.query('SELECT * FROM chcs_joinTeamApply WHERE flag=0 AND teamId=?',[teamId]);
    if(re.length>0){
        let pList=re.map(async d=>{
            let p1=db.query('SELECT * FROM chcs_doctor WHERE flag=0 AND id=?',[d.doctorId]);
            let doc=await p1;
            d['doctor']=doc;
            return p1;
        })
        Promise.all(pList).then(function(){
            common.sendResponse(res, 200, {
                code: 200,
                msg: '查询成功!',
                data:re
            });
        })
        
    }else{
        common.sendResponse(res, 200, {
            code: 500,
            msg: '查询失败!无查询结果!'
        });
    }
}
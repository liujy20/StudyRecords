
var common = require('../tool/Common');
var db = require('../tool/SqlLiteTool').DB;
var UUID = require('uuid');
let { toOneArray,createNumberStr,getCurDate } = require("../tool/Utils");
//根据登录id查询医生详情以及角色信息
module.exports.getDoctorByUserId = async function (req, res) {
    db.get('SELECT * FROM chcs_doctor WHERE flag=0 AND userId=?', [req.body.userId]).then(dparam => {
        db.get('SELECT * FROM chcs_role WHERE flag=0 AND id=?', [dparam.roleId]).then(rparam => {
            dparam['role'] = rparam;
            common.sendResponse(res, 200, {
                code: 200,
                msg: '查询成功!',
                data: dparam
            });
        }).catch(err => {
            common.sendResponse(res, 200, {
                code: 500,
                msg: '角色查询失败！'
            });
        });
    }).catch(err => {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '医生查询失败！'
        });
    });

}
//根据用户登录id更新消息状态
module.exports.updateDoctorMsgStatusByUserId = async function (req, res) {
    await db.update('UPDATE chcs_doctor SET msgStatus=? WHERE flag=0 AND userId=?', [req.body.msgStatus, req.body.userId]).then(data => {
        common.sendResponse(res, 200, {
            code: 200,
            msg: '修改成功！'
        });
    }).catch(err => {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '修改失败！',
            data: err
        });
    });
}
//根据id查询医生以及默认团队和所属机构信息
module.exports.getDoctorDefaultTeamOrgById = async function (req, res) {
    let dparam = await db.get('SELECT * FROM chcs_doctor WHERE flag=0 AND id=?', [req.body.id]);
    let rparam = await db.get('SELECT * FROM chcs_teamDoctor_relation WHERE flag=0 AND doctorId=? ORDER BY status DESC', [dparam.id]);
    let tparam = await db.get('SELECT * FROM chcs_team WHERE flag=0 AND id=? ', [rparam.teamId]);
    dparam['team'] = tparam;
    let oparam = await db.get('SELECT * FROM chcs_organ WHERE flag=0 AND id=?', [tparam.organId]);
    dparam['organ'] = oparam;
    common.sendResponse(res, 200, {
        code: 200,
        msg: '查询成功!',
        data: dparam
    });
}
//根据id查询医生相关团队以及所属机构
module.exports.getDoctorTeamOrgById = async function (req, res) {
    let dparam = await db.get('SELECT * FROM chcs_doctor WHERE flag=0 AND id=?', [req.body.id]);
    if (dparam === undefined) {
        common.sendResponse(res, 200, {
            code: 200,
            msg: '查询失败!未查询到目标数据!'
        });
        return;
    }
    let rparam = await db.query('SELECT * FROM chcs_teamDoctor_relation WHERE flag=0 AND doctorId=?', [dparam.id]);
    let teamArr = [];
    let pList = rparam.map(async r => {
        let p1 = db.get('SELECT * FROM chcs_team WHERE flag=0 AND id=? ', [r.teamId]);
        let tparam = await p1;
        let p2 = db.get('SELECT * FROM chcs_organ WHERE flag=0 AND id=?', [tparam.organId]);
        let oparam = await p2;
        tparam['organ'] = oparam;
        teamArr.push(tparam);
        return [p1, p2];
    });
    Promise.all(toOneArray(pList)).then(function () {
        dparam['teamList'] = teamArr;
        common.sendResponse(res, 200, {
            code: 200,
            msg: '查询成功!',
            data: dparam
        });
    })
}
//根据id更新医生头像
module.exports.updatePictureById = async function (req, res) {
    await db.update('UPDATE chcs_doctor SET picture=? WHERE flag=0 AND id=?', [req.body.picture, req.body.id]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '更新成功!'
    });
}

// 根据id更新医生联系电话
module.exports.updateTelById = async function (req, res) {
    await db.update('UPDATE chcs_doctor SET tel=? WHERE flag=0 AND id=?', [req.body.tel, req.body.id]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '更新成功!'
    });
}
// 根据id更新医生角色(职位)
module.exports.updateRoleIdById = async function (req, res) {
    await db.update('UPDATE chcs_doctor SET roleId=? WHERE flag=0 AND id=?', [req.body.roleId, req.body.id]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '更新成功!'
    });
}
// 根据id更新医生简介
module.exports.updateDescriptionById = async function (req, res) {
    await db.update('UPDATE chcs_doctor SET description=? WHERE flag=0 AND id=?', [req.body.description, req.body.id]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '更新成功!'
    });
}
// 根据id更新医生擅长
module.exports.updateAdeptById = async function (req, res) {
    await db.update('UPDATE chcs_doctor SET adept=? WHERE flag=0 AND id=?', [req.body.adept, req.body.id]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '更新成功!'
    });
}
//根据id查询医生,签约人数，评分，评分人数
module.exports.getDoctorStatisticsByUserId = async function (req, res) {
    let { id } = req.body;
    let d = await db.get('SELECT * FROM chcs_doctor WHERE flag=0 AND id=?', [id]);
    let r = await db.get('SELECT * FROM chcs_role WHERE flag=0 AND id=?', [d.roleId]);
    let signCount = await db.get('SELECT COUNT(DISTINCT residentId) signCount FROM chcs_sign WHERE flag=0 AND doctorId=?', [id]);
    let score = await db.get('SELECT IFNULL(avg(score),0) score FROM chcs_serviceDetail WHERE flag=0 AND doctorId=? AND status=2', id);
    let scoreCount = await db.get('SELECT COUNT(*) scoreCount FROM chcs_serviceDetail WHERE flag=0 AND doctorId=? AND status=2', id);
    d['role'] = r;
    d['signCount'] = signCount;
    d['score'] = score;
    d['scoreCount'] = scoreCount;
    common.sendResponse(res, 200, {
        code: 200,
        msg: '查询成功!',
        data: d
    });

}
//根据医生id查询医生信息，账号，角色
module.exports.getDoctorById = async function (req, res) {
    let { id } = req.body;
    let doctor=await db.get('SELECT * FROM chcs_doctor WHERE flag=0 AND id=?', [id]);
    let user=await db.get('SELECT account,password FROM chcs_user WHERE flag=0 AND id=?', [doctor.userId]);
    let role=await db.get('SELECT * FROM chcs_role WHERE flag=0 AND id=?', [doctor.roleId]);
    doctor['role'] = role;
    doctor['user']=(user?user:null);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '查询成功!',
        data: doctor
    });

}
//分页搜索查询医生
module.exports.getDoctorByPageSearch = async function (req, res) {
    let {oragnId,teamId,labelIdStr,searchKey,page,count}=req.body;
    let sql='SELECT * FROM chcs_doctor d INNER JOIN chcs_teamDoctor_relation tdr ON d.id=tdr.doctorId INNER JOIN chcs_role r ON d.roleId=r.id INNER JOIN chcs_team t ON t.id=tdr.teamId INNER JOIN chcs_organ o ON o.id=t.organId INNER JOIN chcs_doctorLabel_relation dlr ON dlr.doctorId=d.id  WHERE d.flag!=2';
    let param=[];
    if(oragnId){
        sql+=' AND o.id=?';
        param.push(oragnId);
    }
    if(teamId){
        sql+=' AND t.id=?';
        param.push(teamId);
    }
    if(labelIdStr){
        let labelIdArr=JSON.parse(labelIdStr);
        let r=labelIdArr.reduce(function(t,c,i){
            if(i!=labelIdArr.length-1){
                return t+'?,';
            }else{
                return t+'?';
            }
        },'');
        sql+=' AND dlr.labelId IN ('+r+')';
        param=param.concat(labelIdArr);
    }
    if(searchKey){
        sql+=' AND (d.name LIKE ? OR d.name LIKE ? OR o.name LIKE ? OR d.number LIKE ?)';
        param.push('%'+searchKey+'%');
        param.push('%'+searchKey+'%');
        param.push('%'+searchKey+'%');
        param.push('%'+searchKey+'%');
    }
    let totalPage=1;
    let total=0;
    if(page && count){
        let newSql=sql.replace('*','COUNT(*) count');
        let totalCount=await db.get(newSql,param);
        if(totalCount){
            totalPage=Math.ceil(totalCount.count/count);
            total=totalCount.count;
        }
        sql += ' LIMIT ?,?';
        param.push((page - 1) * count);
        param.push(count);
    }
    sql=sql.replace('*','DISTINCT d.id id,d.number number,d.picture picture,d.name dname,d.tel tel,r.id rid,r.name rname,t.id tid,t.name tname,o.id oid,o.name oname,d.flag flag')
    console.log(sql);
    console.log(param);
    let re=await db.query(sql,param);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '查询成功!',
        data:re
    });

}
//删除根据id医生
module.exports.delDoctorById = async function (req, res) {
    let {id}=req.body;
    await db.update('UPDATE chcs_doctor SET flag=2 WHERE id=?',[id]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '删除成功!'
    });
}
//根据id软删除医生
module.exports.updateDoctorFlagById = async function (req, res) {
    let {id,flag}=req.body;
    await db.update('UPDATE chcs_doctor SET flag=? WHERE id=?',[flag,id]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '更新成功!'
    });
}
//新增医生
module.exports.saveDoctor = async function (req, res) {
    let {account,name,roleId,picture,password,gender,description,adept,creatorId,msgStatus=0,status=0}=req.body;
    let userId=await db.get('SELECT id FROM chcs_user WHERE account=?',[account]);
    if(userId){
        userId=userId.id;
        await db.update('UPDATE chcs_user SET userTypeId="67e98bc0-ee1b-11ed-8459-c76f227ca877",password=? WHERE id=?',[password,userId]);
    }else{
        userId=UUID.v1();
        await db.insert('INSERT INTO chcs_user VALUES(?,?,?,?,?,?,?,?)',[userId,createNumberStr(),account,password,'67e98bc0-ee1b-11ed-8459-c76f227ca877',0,null,null]);
    }
    let id=UUID.v1();
    let number=createNumberStr();
    await db.insert('INSERT INTO chcs_doctor VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[id,number,userId,name,roleId,picture,account,gender,description,adept,getCurDate(),creatorId,msgStatus,status,0]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '新增成功!',
        data:id
    });
}
//根据id修改医生
module.exports.updateDoctorById = async function (req, res) {
    let {id,account,name,roleId,picture,gender,description,adept,password}=req.body;
    let userId=await db.get('SELECT userId FROM chcs_doctor WHERE id=?',[id]);
    if(userId){
        await db.update('UPDATE chcs_user SET account=?,password=? WHERE id=?',[account,password,userId.userId]);
        let sql='UPDATE chcs_doctor SET name=?,roleId=?';
        let param=[name,roleId];
        if(picture){
            sql+=',picture=?';
            param.push(picture);
        }
        if(gender){
            sql+=',gender=?';
            param.push(gender);
        }
        if(description){
            sql+=',description=?';
            param.push(description);
        }
        if(adept){
            sql+=',adept=?';
            param.push(adept);
        }
        sql+=' WHERE id=?';
        param.push(id);
        await db.update(sql,param);
        common.sendResponse(res, 200, {
            code: 200,
            msg: '修改成功!'
        });
    }else{
        common.sendResponse(res, 200, {
            code: 200,
            msg: '账号修改失败!'
        });
    }
}
//根据id查询医生详情
module.exports.getDoctorDetailById = async function (req, res) {
    let { id } = req.body;
    let doctor=await db.get('SELECT id,number,name,picture,tel,gender,adept,description,createTime,creatorId,roleId,flag FROM chcs_doctor WHERE flag=0 AND id=?', [id]);
    let creatorName=await db.get('SELECT name FROM chcs_doctor WHERE userId=?',[doctor.creatorId]);
    let role=await db.get('SELECT name FROM chcs_role WHERE flag=0 AND id=?', [doctor.roleId]);
    let team=await db.query('SELECT o.name oname,t.name tname FROM chcs_teamDoctor_relation tdr INNER JOIN chcs_team t ON tdr.teamId=t.id INNER JOIN chcs_organ o ON o.id=t.organId WHERE tdr.doctorId=?', [id]);
    doctor['role'] = role?role.name:null;
    doctor['creatorName']=creatorName?creatorName.name:null;
    doctor['team']=team;
    let signCount = await db.get('SELECT COUNT(DISTINCT residentId) signCount FROM chcs_sign WHERE flag=0 AND doctorId=?', [id]);
    let score = await db.get('SELECT IFNULL(avg(score),0) score FROM chcs_serviceDetail WHERE flag=0 AND doctorId=? AND status=2', [id]);
    let scoreCount = await db.get('SELECT COUNT(*) scoreCount FROM chcs_serviceDetail WHERE flag=0 AND doctorId=? AND status=2', [id]);
    doctor['signCount'] = signCount;
    doctor['score'] = score;
    doctor['scoreCount'] = scoreCount;

    common.sendResponse(res, 200, {
        code: 200,
        msg: '查询成功!',
        data: doctor
    });
}


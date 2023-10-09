
var common = require('../tool/Common');
var db = require('../tool/SqlLiteTool').DB;
var UUID = require('uuid');
var { createNumberStr, toOneArray,getCurDate } = require("../tool/Utils");
//新建团队
module.exports.saveTeam = async function (req, res) {
    let { name, picture, organId, labelIdStr,doctorId,serviceIdStr } = req.body;
    
    let id = UUID.v1();
    let number = createNumberStr();
    await db.insert('INSERT INTO chcs_team VALUES(?,?,?,?,?,?,?,?,?,?)', [id, number, name, picture, organId, 5, 0, 0, 0,getCurDate()]);
    if(labelIdStr){
        let labelIdArray = JSON.parse(labelIdStr);
        labelIdArray.forEach(async (lid) => {
            let rid = UUID.v1();
            await db.insert('INSERT INTO chcs_teamLabel_relation VALUES(?,?,?,?)', [rid, id, lid, 0]);
        });
    }
    if(doctorId){
        let did = UUID.v1();
        await db.insert('INSERT INTO chcs_teamDoctor_relation VALUES(?,?,?,?,?)', [did, id, doctorId,1, 0]);
    }
    if(serviceIdStr){
        let serviceIdArray = JSON.parse(serviceIdStr);
        serviceIdArray.forEach(async (sid) => {
            let tsid = UUID.v1();
            await db.insert('INSERT INTO chcs_teamService_relation VALUES(?,?,?,?)', [tsid, id, sid, 0]);
        });
    }
    common.sendResponse(res, 200, {
        code: 200,
        msg: '添加成功！',
        data:id
    });
}
//加入团队(同一个医生不能重复加入同一个团队)
module.exports.joinTeam = async function (req, res) {
    let { teamId, doctorId, status = 0 } = req.body;
    let id = UUID.v1();
    let re = await db.get('SELECT * FROM chcs_teamDoctor_relation WHERE flag=0 AND teamId=? AND doctorId=?', [teamId, doctorId]);
    if (re != undefined) {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '加入失败！不能重复加入同一个团队！'
        });
    } else {
        await db.insert('INSERT INTO chcs_teamDoctor_relation VALUES(?,?,?,?,?)', [id, teamId, doctorId, status, 0]);
        common.sendResponse(res, 200, {
            code: 200,
            msg: '加入成功！'
        });
    }
}
//根据团队名称和编号模糊查询团队以及对应机构信息
module.exports.searchTeamByNameNumber = async function (req, res) {
    let { name, number } = req.body;
    if (number != undefined) {
        let re = await db.query('SELECT * FROM chcs_team WHERE flag=0 AND number LIKE ?', [`%${number}%`]);
        if (re.length > 0) {
            re.forEach(async (r, index) => {
                let organ = await db.query('SELECT * FROM chcs_organ WHERE flag=0 AND id=?', [r.organId]);
                r['organ'] = organ;
                if (index == re.length - 1) {
                    common.sendResponse(res, 200, {
                        code: 200,
                        msg: '搜索成功！',
                        data: re
                    });
                }
            });
        } else {
            common.sendResponse(res, 200, {
                code: 500,
                msg: '搜索失败！无搜索结果!'
            });
        }
    } else if (name != undefined) {
        let re = await db.query('SELECT * FROM chcs_team WHERE flag=0 AND name LIKE ?', [`%${name}%`]);
        if (re.length > 0) {
            re.forEach(async (r, index) => {
                let organ = await db.query('SELECT * FROM chcs_organ WHERE flag=0 AND id=?', [r.organId]);
                r['organ'] = organ;
                if (index == re.length - 1) {
                    common.sendResponse(res, 200, {
                        code: 200,
                        msg: '搜索成功！',
                        data: re
                    });
                }
            });
        } else {
            common.sendResponse(res, 200, {
                code: 500,
                msg: '搜索失败！无搜索结果!'
            });
        }
    } else {
        let re = await db.query('SELECT * FROM chcs_team WHERE flag=0');
        if (re.length > 0) {
            re.forEach(async (r, index) => {
                let organ = await db.query('SELECT * FROM chcs_organ WHERE flag=0 AND id=?', [r.organId]);
                r['organ'] = organ;
                if (index == re.length - 1) {
                    common.sendResponse(res, 200, {
                        code: 200,
                        msg: '搜索成功！',
                        data: re
                    });
                }
            });
        } else {
            common.sendResponse(res, 200, {
                code: 500,
                msg: '搜索失败！无搜索结果!'
            });
        }
    }
}
//根据医生详情id查询默认团队id
module.exports.getDefaultTeamIdByDoctorId = async function (req, res) {
    let teamId = await db.get('SELECT teamId FROM chcs_teamDoctor_relation WHERE flag=0 AND doctorId=? ORDER BY status DESC LIMIT 1', [req.body.doctorId]);
    if (teamId != undefined) {
        common.sendResponse(res, 200, {
            code: 200,
            msg: '查询成功！',
            data: teamId
        });
    } else {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '查询失败！'
        });
    }
}
//根据医生详情id查询未加入的团队信息以及对应机构信息
module.exports.getNotJoinTeamIdByDoctorId = async function (req, res) {
    let teamArr = await db.query('SELECT * FROM chcs_team WHERE flag=0 AND id NOT IN(SELECT teamId FROM chcs_teamDoctor_relation WHERE flag=0 AND doctorId=?)', req.body.doctorId);
    if (teamArr.length > 0) {
        teamArr.forEach(async (t, index) => {
            let organ = await db.get('SELECT * FROM chcs_organ WHERE flag=0 AND id=?', [t.organId]);
            t['organ'] = organ;
            if (index == teamArr.length - 1) {
                common.sendResponse(res, 200, {
                    code: 200,
                    msg: '查询成功！',
                    data: teamArr
                });
            }
        });
    } else {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '未查询到没加入的团队信息！'
        });
    }
}
//根据团队id查询该团队下的所有医生以及对应角色信息以及签约人数
module.exports.getDoctorByTeamId = async function (req, res) {
    let doctorArr = await db.query('SELECT * FROM chcs_doctor WHERE flag=0 AND id IN(SELECT doctorId FROM chcs_teamDoctor_relation WHERE flag=0 AND teamId=?)', [req.body.teamId]);
    if (doctorArr.length > 0) {
        let pList = doctorArr.map(async (d, index) => {
            let p1 = db.get('SELECT * FROM chcs_role WHERE flag=0 AND id=?', [d.roleId]);
            let p2 = db.get('SELECT COUNT(*) count FROM chcs_sign WHERE flag=0 AND status=3 AND teamId=? AND doctorId=?', [req.body.teamId, d.id]);
            let role = await p1;
            let count = await p2;
            d['role'] = role;
            d['signCount'] = count.count;
            return [p1, p2];
        });
        Promise.all(toOneArray(pList)).then(function () {
            common.sendResponse(res, 200, {
                code: 200,
                msg: '查询成功！',
                data: doctorArr
            });
        })
    } else {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '查询失败！未查询到医生信息!'
        });
    }
}
// 根据id查询团队，机构，签约人数，团队长，团队标签
module.exports.getTOSSMLById = async function (req, res) {
    let { id } = req.body;
    let team = await db.get('SELECT * FROM chcs_team WHERE flag=0 AND id=?', [id]);
    let organ = await db.get('SELECT * FROM chcs_organ WHERE flag=0 AND id=?', [team.organId]);
    let signCount = await db.get('SELECT COUNT(*) count FROM chcs_sign WHERE flag=0 AND status=3 AND teamId=?', [id]);
    let manage = await db.get('SELECT * FROM chcs_doctor WHERE id=(SELECT doctorId FROM chcs_teamDoctor_relation WHERE flag=0 AND teamId=? AND status=1)', [id]);
    let labelArr = await db.query('SELECT * FROM chcs_label WHERE id IN(SELECT labelId FROM chcs_teamLabel_relation WHERE flag=0 AND teamId=?)', [id]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '查询成功！',
        data: {
            team,
            organ,
            signCount:signCount?signCount.count:0,
            manage,
            labelArr
        }
    });
}
//根据id以及医生id更新团队长
module.exports.updateManageByTeamIdDoctorId = async function (req, res) {
    let { teamId, doctorId } = req.body;
    await db.update('UPDATE chcs_teamDoctor_relation SET status=0 WHERE flag=0 AND teamId=? AND status=1', [teamId]);
    await db.update('UPDATE chcs_teamDoctor_relation SET status=1 WHERE flag=0 AND teamId=? AND doctorId=?', [teamId, doctorId]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '更新成功！'
    });
}
//根据id删除团队
module.exports.delTeamById = async function (req, res) {
    await db.update('UPDATE chcs_team SET flag=1 WHERE id=?', [req.body.id]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '删除成功！'
    });
}
//根据机构id查询团队信息
module.exports.getTeamByOrganId = async function (req, res) {
    let { organId } = req.body;
    let oList = await db.query('SELECT * FROM chcs_team WHERE flag=0 AND organId=?', [organId]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '查询成功！',
        data: oList
    });
}
//根据团队id查询医生简单信息
module.exports.getBasicDoctorByTeamId = async function (req, res) {
    let doctorArr = await db.query('SELECT id,name FROM chcs_doctor WHERE flag=0 AND id IN(SELECT doctorId FROM chcs_teamDoctor_relation WHERE flag=0 AND teamId=?)', [req.body.teamId]);
    if (doctorArr.length > 0) {
        common.sendResponse(res, 200, {
            code: 200,
            msg: '查询成功！',
            data: doctorArr
        });
    } else {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '查询失败！未查询到医生信息!'
        });
    }
}
//分页搜索查询团队信息
module.exports.getTeamBySearchPage = async function (req, res) {
    let {organId,searchKey,page,count,status,doctorId}=req.body;
    let sql="SELECT * FROM chcs_team t INNER JOIN chcs_teamDoctor_relation td ON t.id=td.teamId INNER JOIN chcs_organ o ON t.organId=o.id INNER JOIN (SELECT teamId,name FROM chcs_teamDoctor_relation td INNER JOIN chcs_doctor d ON td.doctorId=d.id WHERE td.status=1) m ON m.teamId=t.id INNER JOIN chcs_doctor d ON td.doctorId=d.id WHERE t.flag=0 AND d.id=?";
    let param=[doctorId];
    if(status){
        if(status==0){
            sql+=' AND (td.status=0 OR td.status=2)';
        }else{
            sql+=' AND (td.status=1)';
        }
    }
    if(organId){
        sql+=' AND organId=?';
        param.push(organId);
    }
    if(searchKey){
        sql+=' AND number LIKE ? OR name LIKE ?';
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
    sql=sql.replace('*','t.id id,t.number number,t.picture picture,t.name tname,m.name dname,o.name oname,t.score score,t.flag flag');
    let result=await db.query(sql,param);
    let pList=result.map(async t=>{
        let count=await db.get('SELECT COUNT(*) count FROM chcs_sign WHERE flag=0 AND status!=2 AND teamId=?',[t.id]);
        t['signCount']=count?count.count:0;
        let labelArr=await db.query('SELECT l.name name FROM chcs_label l INNER JOIN chcs_teamLabel_relation tl ON tl.labelId=l.id WHERE tl.flag=0 AND tl.teamId=?',[t.id]);
        t['labelArr']=labelArr;
    });
    Promise.all(pList).then(()=>{
        common.sendResponse(res, 200, {
            code: 200,
            msg: '查询成功!',
            data:{
                totalPage,
                total,
                result
            }
        });
    })
}
//根据id更新启用状态
module.exports.updateFlagById = async function (req, res) {
    await db.update('UPDATE chcs_team SET flag=? WHERE id=?', [req.body.flag,req.body.id]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '更新成功！'
    });
}
//根据团队id解散团队
module.exports.dissolveTeamById = async function (req, res) {
    let {id}=req.body;
    await db.update('UPDATE chcs_team SET flag=1 WHERE id=?', [id]);
    await db.update('UPDATE chcs_teamDoctor_relation SET flag=1 WHERE teamId=?', [id]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '解散成功！'
    });
}
//根据医生详情id模糊查询未加入的团队信息以及对应机构信息
module.exports.getSearchNotJoinTeamIdByDoctorId = async function (req, res) {
    let {doctorId,searchKey}=req.body;
    let sql='SELECT * FROM chcs_team WHERE flag=0 AND id NOT IN(SELECT teamId FROM chcs_teamDoctor_relation WHERE flag=0 AND doctorId=?)';
    let param=[doctorId];
    if(searchKey){
        sql+=' AND name LIKE ? OR number LIKE ?';
        param.push(`%${searchKey}%`);
        param.push(`%${searchKey}%`);
    }
    let teamArr = await db.query(sql,param);
    if (teamArr.length > 0) {
        teamArr.forEach(async (t, index) => {
            let organ = await db.get('SELECT * FROM chcs_organ WHERE flag=0 AND id=?', [t.organId]);
            t['organ'] = organ;
            if (index == teamArr.length - 1) {
                common.sendResponse(res, 200, {
                    code: 200,
                    msg: '查询成功！',
                    data: teamArr
                });
            }
        });
    } else {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '未查询到没加入的团队信息！'
        });
    }
}

//根据团队id查询医生信息(签约人数，评分，评分人数)
module.exports.getDoctorBasicByTeamId = async function (req, res) {
    let {teamId}=req.body;
    let doctorArr=await db.query('SELECT d.id id,d.number number,d.userId userId,d.picture picture,d.tel tel,d.gender gender,d.description description,d.adept adept,d.createTime createTime,d.creatorId creatorId,d.msgStatus msStatus,d.status,d.flag,t.status tstatus,r.name roleName FROM chcs_doctor d INNER JOIN chcs_teamDoctor_relation t ON d.id=t.doctorId INNER JOIN chcs_role r ON d.roleId=r.id WHERE d.flag=0 AND t.flag=0 AND t.teamId=?',[teamId]);
    let re=doctorArr.map(async(d)=>{
        //查询签约人数
        let p1=db.get('SELECT COUNT(*) count FROM chcs_sign WHERE doctorId=? AND flag=0 AND status!=2',[d.id]);
        //查询评分和评分人数
        let p2=db.get('SELECT COUNT(*) count,AVG(score) score FROM chcs_serviceDetail WHERE doctorId=? AND flag=0',[d.id]);
        let sign=await p1;
        let score=await p2;
        d['signCount']=sign?sign.count:0;
        d['score']=score.score!=null?score.score:0;
        d['scoreCount']=score.count;
        d['role']=d.tstatus==1?'团队长':'成员';
        return [p1,p2];
    });
    Promise.all(toOneArray(re)).then(function(){
        common.sendResponse(res, 200, {
            code: 200,
            msg: '查询成功！',
            data: doctorArr
        });
    });
}

//根据团队id查询服务包和标签信息
module.exports.getServiceBasicByTeamId = async function (req, res) {
    let {teamId}=req.body;
    let serviceArr=await db.query('SELECT s.id id,s.name name,s.targetAudience targetAudience,s.picture picture FROM chcs_service s INNER JOIN chcs_teamService_relation r ON s.id=r.serviceId WHERE s.flag=0 AND r.flag=0 AND r.teamId=?',[teamId]);
    let pList=serviceArr.map(async s=>{
        let p1=db.query('SELECT name FROM chcs_serviceLabel_relation r INNER JOIN chcs_Label l ON r.labelId=l.id WHERE r.serviceId=?',[s.id]);
        s['labelArr']=await p1;
        return p1;
    });
    Promise.all(pList).then(()=>{
        common.sendResponse(res, 200, {
            code: 200,
            msg: '查询成功！',
            data: serviceArr
        });
    })
}
//新增团队服务包
module.exports.saveTeamService = async function (req, res) {
    let {teamId,serviceId}=req.body;
    let id=UUID.v1();
    await db.insert('INSERT INTO chcs_teamService_relation VALUES(?,?,?,?)',[id,teamId,serviceId,0]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '查询成功！',
        data: id
    });
}
//分页查询团队未加入的服务包
module.exports.getServiceByTeamIdPage = async function (req, res) {
    let {teamId,page,count}=req.body;
    let sql='SELECT * FROM chcs_service s WHERE id NOT IN(SELECT serviceId FROM chcs_teamService_relation WHERE teamId=?) AND s.flag=0';
    let param=[teamId];
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
    sql=sql.replace('*','id,name,picture,targetAudience');
    let serviceArr=await db.query(sql,param);
    let pList=serviceArr.map(async s=>{
        let p1=db.query('SELECT name FROM chcs_serviceLabel_relation r INNER JOIN chcs_Label l ON r.labelId=l.id WHERE r.serviceId=?',[s.id]);
        s['labelArr']=await p1;
        return p1;
    });
    Promise.all(pList).then(()=>{
        common.sendResponse(res, 200, {
            code: 200,
            msg: '查询成功！',
            data: {
                serviceArr,
                totalPage,
                total
            }
        });
    })
    
}
//根据团队id查询团队标签信息
module.exports.getTeamOrganLabelByTeamId = async function (req, res) {
    let {teamId}=req.body;
    let team=await db.get('SELECT id,name,picture,organId FROM chcs_team WHERE flag=0');
    team['labelArr']=await db.query('SELECT id,name FROM chcs_label WHERE id IN(SELECT labelId FROM chcs_teamLabel_relation WHERE flag=0 AND teamId=?)',[teamId]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '查询成功！',
        data: team
    });
}
//更新团队信息
module.exports.updateTeamById = async function (req, res) {
    let {id,name,picture,organId,labelIdStr}=req.body;
    await db.update('UPDATE chcs_team SET name=?,picture=?,organId=? WHERE flag=0 AND id=?',[name,picture,organId,id]);
    if(labelIdStr){
        await db.update('UPDATE chcs_teamLabel_relation SET flag=1 WHERE teamId=?',[id]);
        let labelIdArr=JSON.parse(labelIdStr);
        let pList=labelIdArr.map(async l=>{
            let p=db.insert('INSERT INTO chcs_teamLabel_relation VALUES(?,?,?,?)',[UUID.v1(),id,l,0]);
            return p;
        })
        Promise.all(pList).then(()=>{
            common.sendResponse(res, 200, {
                code: 200,
                msg: '更新成功！'
            });
        })
    }else{
        common.sendResponse(res, 200, {
            code: 200,
            msg: '更新成功！'
        });
    }
}
//退出团队
module.exports.retreatTeamByTeamIdDoctorId = async function (req, res) {
    let {teamId,doctorId}=req.body;
    let re=await db.get('SELECT status FROM chcs_teamDoctor_relation WHERE teamId=? AND doctorId=?',[teamId,doctorId]);
    if(re){
        if(re.status==1){
            common.sendResponse(res, 200, {
                code: 500,
                msg: '团长不能退出队伍！只能解散队伍!'
            });
        }else{

            await db.update('UPDATE chcs_teamDoctor_relation SET flag=1 WHERE teamId=? AND doctorId=?',[teamId,doctorId]);
            common.sendResponse(res, 200, {
                code: 200,
                msg: '退出成功！'
            });
        }
    }else{
        common.sendResponse(res, 200, {
            code: 500,
            msg: '未加入该团队！'
        });
    }
}
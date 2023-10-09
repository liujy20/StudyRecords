
var common = require('../tool/Common');
var db = require('../tool/SqlLiteTool').DB;
var UUID = require('uuid');
var { createNumberStr, getFirstCase, toOneArray, getCurDate } = require("../tool/Utils");
//新建居民基本信息以及标签关联信息
module.exports.saveResident = async function (req, res) {
    let { id = UUID.v1(), number = createNumberStr(), name, picture, IDCard, tel, address, district, gender, birthday, residenceId, nativePlace, residenceAddress, nationId, educationId, maritalStatusId, career, workUnit, emergencyContact, emergencyNumber, expenseTypeId, designatedMedicalUnits, origin, status = 0, flag = 0, password } = req.body;
    let userId = UUID.v1();
    await db.insert('INSERT INTO chcs_user VALUES(?,?,?,?,?,?,?,?,?)', [userId, createNumberStr(), tel, password, '67e98bc0-ee1b-11ed-8459-c76f227ca321', 0, null, null, null]);
    await db.insert('INSERT INTO chcs_resident VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [id, number, userId, name, picture, IDCard, tel, address, district, gender, birthday, residenceId, nativePlace, residenceAddress, nationId, educationId, maritalStatusId, career, workUnit, emergencyContact, emergencyNumber, expenseTypeId, designatedMedicalUnits, origin, status, flag, getCurDate()])
    if (req.body.labelArrStr != undefined) {
        let labelArr = JSON.parse(req.body.labelArrStr);
        let proList = labelArr.map(async (l, index) => {
            let p = db.insert('INSERT INTO chcs_residentLabel_relation VALUES(?,?,?,?)', [UUID.v1(), id, l, 0]);
            await p;
            return p;
        })
        Promise.all(proList).then(function () {
            common.sendResponse(res, 200, {
                code: 200,
                msg: '新增成功!',
                data: {
                    rid: id
                }
            });
        })
    } else {
        common.sendResponse(res, 200, {
            code: 200,
            msg: '新增成功!',
            data: {
                rid: id
            }
        });
    }

}
//根据id查询居民基本信息，标签以及健康档案
module.exports.getResidentLabelHealthById = async function (req, res) {
    let residentId = req.body.residentId;
    let resident = await db.get('SELECT * FROM chcs_resident WHERE flag=0 AND id=?', [residentId]);
    if (resident != undefined) {
        let labelArr = await db.query('SELECT * FROM chcs_label WHERE flag=0 AND id IN(SELECT labelId FROM chcs_residentLabel_relation WHERE flag=0 AND residentId=?)', [residentId]);
        let health = await db.get('SELECT * FROM chcs_healthRecords WHERE flag=0 AND residentId=?', [residentId]);
        resident['labelArr'] = labelArr;
        resident['health'] = health;
        common.sendResponse(res, 200, {
            code: 200,
            msg: '查询成功!',
            data: resident
        });
    } else {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '查询失败!'
        });
    }

}

//根据id更新居民基本信息，标签以及健康档案信息
module.exports.updateRLHById = async function (req, res) {
    let { rid, name, picture, IDCard, tel, address, district, gender, birthday, residenceId, nativePlace, residenceAddress, nationId, educationId, maritalStatusId, career, workUnit, emergencyContact, emergencyNumber, expenseTypeId, designatedMedicalUnits } = req.body;
    await db.update('UPDATE chcs_resident SET name=?,picture=?,IDCard=?,tel=?,address=?,district=?,gender=?,birthday=?,residenceId=?,nativePlace=?,residenceAddress=?,nationId=?,educationId=?,maritalStatusId=?,career=?,workUnit=?,emergencyContact=?,emergencyNumber=?,expenseTypeId=?,designatedMedicalUnits=? WHERE id=? AND flag=0', [name, picture, IDCard, tel, address, district, gender, birthday, residenceId, nativePlace, residenceAddress, nationId, educationId, maritalStatusId, career, workUnit, emergencyContact, emergencyNumber, expenseTypeId, designatedMedicalUnits, rid]);
    let h = await db.get('SELECT * FROM chcs_healthRecords WHERE flag=0 AND residentId=?', [rid]);
    if (h != undefined) {
        let { hid, height, weight, bloodTypeId, rh, allergyHistory, pastHistory, medicalHistory, familyHistory } = req.body;
        await db.update('UPDATE chcs_healthRecords SET height=?,weight=?,bloodTypeId=?,rh=?,allergyHistory=?,pastHistory=?,medicalHistory=?,familyHistory=? WHERE flag=0 AND id=?', [height, weight, bloodTypeId, rh, allergyHistory, pastHistory, medicalHistory, familyHistory, hid])
    } else {
        let { hid = UUID.v1(), height, weight, bloodTypeId, rh, allergyHistory, pastHistory, medicalHistory, familyHistory } = req.body;
        await db.insert('INSERT INTO chcs_healthRecords VALUES(?,?,?,?,?,?,?,?,?,?,?)', [hid, rid, height, weight, bloodTypeId, rh, allergyHistory, pastHistory, medicalHistory, familyHistory, 0]);
    }
    let labelArr = JSON.parse(req.body.labelArrStr);
    //软删除
    let p1 = db.update('UPDATE chcs_residentLabel_relation SET flag=1 WHERE residentId=?', [rid]);
    let arr = labelArr.map(async (l, index) => {
        //插入
        let p2 = db.insert('INSERT INTO chcs_residentLabel_relation VALUES(?,?,?,?)', [UUID.v1(), rid, l, 0]);
        await p1;
        await p2;
        return [p1, p2];
    });
    Promise.all(toOneArray(arr)).then(function () {
        common.sendResponse(res, 200, {
            code: 200,
            msg: '修改成功!'
        });
    })
    // if (labelArr.length == 0) {
    //     common.sendResponse(res, 200, {
    //         code: 200,
    //         msg: '修改成功!'
    //     });
    // }
}
//查询所有居民信息(基本信息和标签，按姓名首字母分类组织)
module.exports.getAllResidentLabel = async function (req, res) {
    let map = {};
    let rList = await db.query('SELECT * FROM chcs_resident WHERE flag=0');
    const proList = rList.map(async (rid, index) => {
        let p1 = db.query('SELECT residentId,name FROM chcs_residentLabel_relation INNER JOIN chcs_label ON chcs_residentLabel_relation.labelId=chcs_label.id WHERE residentId=?', [rid.id]);
        let labelArr = await p1;
        rid['labelArr'] = labelArr;
        let ca = getFirstCase(rid.name.charAt(0))[0];
        if (map.hasOwnProperty(ca)) {
            map[ca].push(rid);
        } else {
            map[ca] = [rid];
        }
        return p1;
    });
    Promise.all(proList).then(function () {
        common.sendResponse(res, 200, {
            code: 200,
            msg: '查询成功!',
            data: map
        });
    });
    if (rList.length < 1) {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '未查询到目标数据!'
        });
    }

}

//查询未签约居民信息
module.exports.getNotSignResident = async function (req, res) {
    let re = await db.query('SELECT * FROM chcs_resident as t WHERE flag=0 AND NOT exists (SELECT residentId FROM chcs_sign WHERE flag=0 and t.id = chcs_sign.residentId)');
    if (re.length > 0) {
        common.sendResponse(res, 200, {
            code: 200,
            msg: '查询成功!',
            data: re
        });
    } else {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '查询失败!未查询到结果!'
        });
    }
}
//查询居民基本信息
module.exports.getAllBasicResidentBySearch = async function (req, res) {
    let { searchKey, limit } = req.body;
    let result;
    let sql = 'SELECT id,name,gender,birthday,IDCard,tel,address FROM chcs_resident WHERE flag=0';
    let param = [];
    if (searchKey != undefined) {
        sql += ' AND name LIKE ?';
        param.push(`${searchKey}%`);
    }
    if (limit != undefined) {
        sql += ` LIMIT ?`;
        param.push(limit);
    }
    result = await db.query(sql, param);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '查询成功!',
        data: result
    });
}
//建立标签与居民的关联关系
module.exports.saveLabelResidentRelation = async function (req, res) {
    let { labelId, residentIdStr } = req.body;
    let residentArr = JSON.parse(residentIdStr);
    let proList = residentArr.map(async (r, index) => {
        let p = db.insert('INSERT INTO chcs_residentLabel_relation VALUES(?,?,?,?)', [UUID.v1(), r, labelId, 0]);
        await p;
        return p;
    })
    Promise.all(proList).then(function () {
        common.sendResponse(res, 200, {
            code: 200,
            msg: '新增成功!'
        });
    })
}

//分页搜索查询居民信息
module.exports.getResidentBySOTSLByPage = async function (req, res) {
    let { status, organId, teamId, serviceId, labelIdStr, searchKey, page, count } = req.body;
    let sql = 'SELECT id,number,name,IDCard,tel,birthday,gender,picture,flag FROM chcs_resident WHERE flag=0';
    let param = [];
    if (status == '1' || status=='2' || status=='3') {
        //待签约:0,签约中:1,签约生效中:2,待续约:3
        //待审核为0，待支付为1，已驳回为2，生效中为3，已过期为4
        switch(status){
            case '1':
                sql += ' AND id IN(SELECT residentId FROM chcs_sign WHERE (status=0 OR status=1)';
                break;
            case '2':
                sql += ' AND id IN(SELECT residentId FROM chcs_sign WHERE status=3';
                break;
            case '3':
                sql += ' AND id IN(SELECT residentId FROM chcs_sign WHERE status=4';
                break;
        }
        if (organId != undefined) {
            sql += ' AND organId=?';
            param.push(organId);
        }
        if (teamId != undefined) {
            sql += ' AND teamId=?';
            param.push(teamId);
        }
        if (serviceId != undefined) {
            sql += ' AND serviceId=?';
            param.push(serviceId);
        }
        sql+=')';
    }else{
        if(status=='0'){
            sql += ' AND id NOT IN(SELECT residentId FROM chcs_sign WHERE status!=2)'
        }
    }
    if(labelIdStr!=undefined){
        let labelIdArr=JSON.parse(labelIdStr);
        sql+=' AND id IN (SELECT residentId FROM chcs_residentLabel_relation WHERE labelId IN ('
        labelIdArr.forEach((l,i)=>{
            if(i<labelIdArr.length-1){
                sql+='?,';
            }else{
                sql+='?';
            }
            param.push(l);
        });
        sql+='))';
    }
    if (searchKey != undefined) {
        sql += ' AND name LIKE ? OR tel LIKE ?';
        param.push('%'+searchKey+'%');
        param.push('%'+searchKey+'%');
    }
    let totalPage=1;
    let total=0;
    if (page != undefined && count != undefined) {
        let totalCount=await db.query(sql,param);
        if(totalCount){
            totalPage=Math.ceil(totalCount.length/count);
            total=totalCount.length;
        }
        sql += ' LIMIT ?,?';
        param.push((page - 1) * count);
        param.push(count);
    }
    let result = await db.query(sql, param);
    let pList=result.map(async r=>{
        //查询居民状态
        //待签约:0,签约中:1,签约生效中:2,待续约:3
        //待审核为0，待支付为1，已驳回为2，生效中为3，已过期为4
        let p1=db.get('SELECT status FROM chcs_sign WHERE residentId=? AND status!=2',[r.id]);
        let statusRe=await p1;
        if(statusRe){
            if(statusRe.status==0 || statusRe.status==1){
                r['statusMsg']='签约中';
            }else if(statusRe.status==3){
                r['statusMsg']='签约生效中';
            }else if(statusRe.status==4){
                r['statusMsg']='待续约';
            }
        }else{
            r['statusMsg']='待签约';
        }
        //查询居民标签
        let p2=db.query('SELECT id,name FROM chcs_label WHERE flag=0 AND id IN(SELECT labelId FROM chcs_residentLabel_relation WHERE flag=0 AND residentId=?)', [r.id]);
        let labelArr = await p2;
        r['labelArr']=labelArr;
        return [p1,p2];
    });
    
    Promise.all(toOneArray(pList)).then(()=>{
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
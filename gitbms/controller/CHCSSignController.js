
var common = require('../tool/Common');
var db = require('../tool/SqlLiteTool').DB;
var UUID = require('uuid');
let { createNumberStr, getCurDate, getFirstCase, toOneArray } = require("../tool/Utils");
const { Promise } = require('mongoose');

//根据医生详情id和居民id查询指定状态的签约服务包信息(不指定状态查询所有状态)
module.exports.getServiceByDIdRidStatus = async function (req, res) {
    let { doctorId, residentId, status } = req.body;
    let re;
    if (status != undefined) {
        re = await db.query('SELECT * FROM chcs_sign WHERE flag=0 AND doctorId=? AND residentId=? AND status=?', [doctorId, residentId, status]);
    } else {
        re = await db.query('SELECT * FROM chcs_sign WHERE flag=0 AND doctorId=? AND residentId=?', [doctorId, residentId]);
    }
    if (re.length > 0) {
        let pList = re.map(async (s, index) => {
            let p1 = db.get('SELECT * FROM chcs_resident WHERE flag=0 AND id=?', [residentId]);
            let p2 = db.get('SELECT * FROM chcs_team WHERE flag=0 AND id=?', [s.teamId]);
            let p3 = db.get('SELECT * FROM chcs_service WHERE flag=0 AND id=?', [s.serviceId]);
            let r = await p1;
            let t = await p2;
            let se = await p3;
            s['resident'] = r;
            s['team'] = t;
            s['service'] = se;
            return [p1, p2, p3];
        })
        Promise.all(toOneArray(pList)).then(function () {
            common.sendResponse(res, 200, {
                code: 200,
                msg: '查询成功!',
                data: re
            });
        })
    } else {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '查询失败!无数据可查!'
        });
    }
}

//根据id更新签约状态信息
module.exports.updateSignStatusById = async function (req, res) {
    let { id, status } = req.body;
    await db.update('UPDATE chcs_sign SET status=? WHERE flag=0 AND id=?', [status, id]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '更新成功!'
    });
}
//根据居民详情id查询签约信息
module.exports.getServiceByRId = async function (req, res) {
    let { residentId } = req.body;
    let re = await db.query('SELECT * FROM chcs_sign WHERE flag=0 AND residentId=? ORDER BY subscribeTime DESC', [residentId]);
    if (re.length > 0) {
        let pList = re.map(async (s, index) => {
            let p1 = db.get('SELECT * FROM chcs_resident WHERE flag=0 AND id=?', [s.residentId]);
            let p2 = db.get('SELECT * FROM chcs_team WHERE flag=0 AND id=?', [s.teamId]);
            let p3 = db.get('SELECT * FROM chcs_service WHERE flag=0 AND id=?', [s.serviceId]);
            let r = await p1;
            let t = await p2;
            let se = await p3;
            s['resident'] = r;
            s['team'] = t;
            s['service'] = se;
            return [p1, p2, p3];
        })
        Promise.all(toOneArray(pList)).then(function () {
            common.sendResponse(res, 200, {
                code: 200,
                msg: '查询成功!',
                data: re
            });
        })
    } else {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '查询失败!无数据可查!'
        });
    }
}

//根据医生详情id和状态(可省)查询指定个数(可省)签约信息
module.exports.getServiceByDIdLimit = async function (req, res) {
    let { doctorId, status, limit } = req.body;
    let re;
    if (status != undefined) {
        if (limit != undefined) {
            re = await db.query('SELECT * FROM chcs_sign WHERE flag=0 AND doctorId=? AND status=? LIMIT ?', [doctorId, status, limit]);
        } else {
            re = await db.query('SELECT * FROM chcs_sign WHERE flag=0 AND doctorId=? AND status=?', [doctorId, status]);
        }
    } else {
        if (limit != undefined) {
            re = await db.query('SELECT * FROM chcs_sign WHERE flag=0 AND doctorId=? LIMIT ?', [doctorId, limit]);
        } else {
            re = await db.query('SELECT * FROM chcs_sign WHERE flag=0 AND doctorId=?', [doctorId]);
        }

    }
    if (re.length > 0) {
        let pList = re.map(async (s, index) => {
            let p1 = db.get('SELECT * FROM chcs_resident WHERE flag=0 AND id=?', [s.residentId]);
            let p2 = db.get('SELECT * FROM chcs_team WHERE flag=0 AND id=?', [s.teamId]);
            let p3 = db.get('SELECT * FROM chcs_service WHERE flag=0 AND id=?', [s.serviceId]);
            let r = await p1;
            let t = await p2;
            let se = await p3;
            s['resident'] = r;
            s['team'] = t;
            s['service'] = se;
        })
        Promise.all(toOneArray(pList)).then(function () {
            common.sendResponse(res, 200, {
                code: 200,
                msg: '查询成功!',
                data: re
            });
        })
    } else {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '查询失败!无数据可查!'
        });
    }
}
//新建签约信息
module.exports.saveSign = async function (req, res) {
    let { residentId, status, organId, teamId, doctorId, serviceId, type, takingEffectTime, notes } = req.body;
    let id = UUID.v1();
    await db.insert('INSERT INTO chcs_sign VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)', [id, residentId, createNumberStr(), status, organId, teamId, doctorId, serviceId, type, getCurDate(), takingEffectTime, notes, 0])
    common.sendResponse(res, 200, {
        code: 200,
        msg: '新增成功!',
        data: id
    });
}
//根据医生详情id查询居民信息(基本信息和标签，按姓名首字母分类组织)
module.exports.getResidentLabelByDId = async function (req, res) {
    let { doctorId } = req.body;
    let re = await db.query('SELECT residentId FROM chcs_sign WHERE flag=0 AND doctorId=?', [doctorId]);
    let map = {};
    const proList = re.map(async (rid, index) => {
        let p1 = db.get('SELECT * FROM chcs_resident WHERE flag=0 AND id=?', [rid.residentId]);
        let p2 = db.query('SELECT residentId,name FROM chcs_residentLabel_relation INNER JOIN chcs_label ON chcs_residentLabel_relation.labelId=chcs_label.id WHERE residentId=?', [rid.residentId]);
        let r = await p1;
        let labelArr = await p2;
        r['labelArr'] = labelArr;
        let ca = getFirstCase(r.name.charAt(0))[0];
        if (map.hasOwnProperty(ca)) {
            map[ca].push(r);
        } else {
            map[ca] = [r];
        }
        return [p1, p2];
    });
    let pArr = toOneArray(proList)
    Promise.all(pArr).then(function () {
        common.sendResponse(res, 200, {
            code: 200,
            msg: '查询成功!',
            data: map
        });
    });
    if (re.length < 1) {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '未查询到目标数据!'
        });
    }

}

//医生详情id查询已签约，待签约人数，居民总人数，待处理服务数，服务总数，服务评分
module.exports.getStatisticsByDId = async function (req, res) {
    let { doctorId } = req.body;
    let signCount = await db.get('SELECT COUNT(DISTINCT residentId) signCount FROM chcs_sign WHERE flag=0 AND doctorId=?', doctorId);
    let totalCount = await db.get('SELECT COUNT(*) totalCount FROM chcs_resident WHERE flag=0');
    let notSignCount = totalCount.totalCount - signCount.signCount;
    let serviceCount = await db.get('SELECT COUNT(*)serviceCount  FROM chcs_serviceDetail WHERE flag=0 AND doctorId=? AND status=0 OR status=1', doctorId);
    let totalServiceCount = await db.get('SELECT COUNT(*) totalServiceCount FROM chcs_serviceDetail WHERE flag=0 AND doctorId=?', doctorId);
    let score = await db.get('SELECT IFNULL(avg(score),0) score FROM chcs_serviceDetail WHERE flag=0 AND doctorId=? AND status=2', doctorId);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '查询成功!',
        data: {
            signCount,
            totalCount,
            notSignCount,
            serviceCount: serviceCount.serviceCount,
            totalServiceCount: totalServiceCount.totalServiceCount,
            score
        }
    });
}

//分页查询搜索签约信息
module.exports.getSRTSBySTOSDPage = async function (req, res) {
    let { page, count, status, organId, teamId, serviceId, startTime, endTime, searchKey } = req.body;
    // let result=await db.query('SELECT s.number number,r.name rname,r.IDCard IDCard,r.tel tel,s.status status,t.name tname,ss.name sname,s.subscribeTime subscribeTime FROM chcs_resident r INNER JOIN chcs_sign s ON r.id=s.residentId INNER JOIN chcs_team t ON t.id=s.teamId INNER JOIN chcs_service ss ON ss.id=s.serviceId WHERE s.flag=0 LIMIT ?,?',[(page-1)*count,count]);
    let sql = 'SELECT s.id id,s.number number,r.name rname,r.IDCard IDCard,r.tel tel,s.status status,t.name tname,d.name dname,ss.name sname,s.takingEffectTime takingEffectTime,ss.period period FROM chcs_resident r INNER JOIN chcs_sign s ON r.id=s.residentId INNER JOIN chcs_team t ON t.id=s.teamId INNER JOIN chcs_service ss ON ss.id=s.serviceId INNER JOIN chcs_doctor d ON s.doctorId=d.id WHERE s.flag=0';
    let param = [];
    if (status != undefined) {
        sql += ' AND s.status=?';
        param.push(status);
    }
    if (organId != undefined) {
        sql += ' AND s.organId=?';
        param.push(organId);
    }
    if (teamId != undefined) {
        sql += ' AND s.teamId=?';
        param.push(teamId);
    }
    if (serviceId != undefined) {
        sql += ' AND s.serviceId=?';
        param.push(serviceId);
    }
    if (startTime != undefined) {
        sql += ' AND s.subscribeTime>=?';
        param.push(startTime);
    }
    if (endTime != undefined) {
        sql += ' AND s.subscribeTime<?';
        param.push(endTime);
    }
    if (searchKey != undefined) {
        sql += ' AND tname LIKE ? OR rname LIKE ? OR sname LIKE ?';
        param.push(searchKey);
        param.push(searchKey);
        param.push(searchKey);
    }
    let totalPage = 1;
    let total = 0;
    if (page != undefined && count != undefined) {
        let totalCount = await db.query(sql, param);
        if (totalCount) {
            totalPage = Math.ceil(totalCount.length / count);
            total = totalCount.length;
        }
        sql += ' LIMIT ?,?';
        param.push((page - 1) * count);
        param.push(count);
    }
    let result = await db.query(sql, param);

    common.sendResponse(res, 200, {
        code: 200,
        msg: '查询成功!',
        data: {
            totalPage,
            total,
            result
        }
    });
}

//根据id查询签约信息
module.exports.getSignById = async function (req, res) {
    let { id } = req.body;
    let sign = await db.get('SELECT * FROM chcs_sign WHERE flag=0 AND id=?', [id]);
    if (sign != undefined) {
        let resident = await db.get('SELECT id,name,IDCard,gender,birthday,tel,address FROM chcs_resident WHERE flag=0 AND id=?', [sign.residentId]);
        let organ = await db.get('SELECT id,name FROM chcs_organ WHERE flag=0 AND id=?', [sign.organId]);
        let team = await db.get('SELECT id,name FROM chcs_team WHERE flag=0 AND id=?', [sign.teamId]);
        let service = await db.get('SELECT id,name,price,period FROM chcs_service WHERE flag=0 AND id=?', [sign.serviceId]);
        let doctor = await db.get('SELECT id,name FROM chcs_doctor WHERE flag=0 AND id=?', [sign.doctorId]);
        let labelArr = await db.query('SELECT chcs_label.name name FROM chcs_residentLabel_relation INNER JOIN chcs_label ON chcs_residentLabel_relation.labelId=chcs_label.id WHERE chcs_label.flag=0 AND chcs_residentLabel_relation.flag=0 AND residentId=?', [sign.residentId]);
        sign['resident'] = resident;
        sign['organ'] = organ;
        sign['team'] = team;
        sign['service'] = service;
        sign['doctor'] = doctor;
        sign['labelArr'] = labelArr;
    }

    common.sendResponse(res, 200, {
        code: 200,
        msg: '查询成功!',
        data: sign
    });
}

//编辑签约信息
module.exports.updateSignResidentBySid = async function (req, res) {
    let { id, residentId, name, IDCard, gender, birthday, tel, address, labelArrStr, organId, teamId, doctorId, serviceId, takingEffectTime, notes } = req.body;
    if (address != undefined) {
        await db.update('UPDATE chcs_resident SET name=?,IDCard=?,gender=?,birthday=?,tel=?,address=? WHERE id=?', [name, IDCard, gender, birthday, tel, address, residentId]);
    } else {
        await db.update('UPDATE chcs_resident SET name=?,IDCard=?,gender=?,birthday=?,tel=? WHERE id=?', [name, IDCard, gender, birthday, tel, residentId]);

    }
    let arr;
    if (labelArrStr != undefined) {
        let labelArr = JSON.parse(labelArrStr);
        //软删除
        let p1 = db.update('UPDATE chcs_residentLabel_relation SET flag=1 WHERE residentId=?', [residentId]);
        arr = labelArr.map(async (l, index) => {
            //插入
            let p2 = db.insert('INSERT INTO chcs_residentLabel_relation VALUES(?,?,?,?)', [UUID.v1(), residentId, l, 0]);
            await p1;
            await p2;
            return [p1, p2];
        });
    }
    if (notes == undefined) {
        await db.update('UPDATE chcs_sign SET organId=?,teamId=?,doctorId=?,serviceId=?,takingEffectTime=? WHERE id=?', [organId, teamId, doctorId, serviceId, takingEffectTime, id])
    } else {
        await db.update('UPDATE chcs_sign SET organId=?,teamId=?,doctorId=?,serviceId=?,takingEffectTime=?,notes=? WHERE id=?', [organId, teamId, doctorId, serviceId, takingEffectTime, notes, id])
    }
    if (arr != undefined) {
        Promise.all(toOneArray(arr)).then(async function () {
            common.sendResponse(res, 200, {
                code: 200,
                msg: '修改成功!'
            });
        })
    } else {
        common.sendResponse(res, 200, {
            code: 200,
            msg: '修改成功!'
        });
    }
}
//根据居民id查询生效签约的机构团队医生服务包
module.exports.getOTDSByResidentId = async function (req, res) {
    let { residentId } = req.body;
    let re = await db.query('SELECT id,number,organId,teamId,serviceId,doctorId FROM chcs_sign WHERE flag=0 AND residentId=? AND status=3', [residentId]);
    if (re.length > 0) {
        let pList = re.map(async (s, index) => {
            let p1 = db.get('SELECT id,name FROM chcs_organ WHERE flag=0 AND id=?', [s.organId]);
            let p2 = db.get('SELECT id,name FROM chcs_team WHERE flag=0 AND id=?', [s.teamId]);
            let p3 = db.get('SELECT id,name FROM chcs_service WHERE flag=0 AND id=?', [s.serviceId]);
            let p4 = db.get('SELECT id,name FROM chcs_doctor WHERE flag=0 AND id=?', [s.doctorId]);
            let o = await p1;
            let t = await p2;
            let se = await p3;
            let d = await p4;
            s['organ'] = o;
            s['team'] = t;
            s['service'] = se;
            s['doctor'] = d;
            return [p1, p2, p3, p4];
        })
        Promise.all(toOneArray(pList)).then(function () {
            common.sendResponse(res, 200, {
                code: 200,
                msg: '查询成功!',
                data: re
            });
        })
    } else {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '查询失败!无数据可查!'
        });
    }
}
//根据服务包id查询服务项目以及剩余次数
//根据团队id查询医生信息
//新增服务信息


var common = require('../tool/Common');
var db = require('../tool/SqlLiteTool').DB;
var UUID = require('uuid');
const { toOneArray, createNumberStr, getCurDate } = require('../tool/Utils');

//根据医生详情id以及状态(可省)查询指定个数(可省)相关服务信息(居民，服务包，服务项目)
module.exports.getServiceDetailByDoctorId = async function (req, res) {
    let { doctorId, status, limit } = req.body;
    let sda;
    if (limit != undefined) {
        if (status != undefined) {
            sda = await db.query('SELECT * FROM chcs_serviceDetail WHERE flag=0 AND doctorId=? AND status=? LIMIT ?', [doctorId, status, limit]);
        } else {
            sda = await db.query('SELECT * FROM chcs_serviceDetail WHERE flag=0 AND doctorId=? LIMIT ?', [doctorId, limit]);
        }
    } else {
        if (status != undefined) {
            sda = await db.query('SELECT * FROM chcs_serviceDetail WHERE flag=0 AND doctorId=? AND status=?', [doctorId, status]);
        } else {
            sda = await db.query('SELECT * FROM chcs_serviceDetail WHERE flag=0 AND doctorId=?', [doctorId]);
        }
    }
    if (sda.length > 0) {
        let re = sda.map(async (sd, index) => {
            let p1 = db.get('SELECT * FROM chcs_resident WHERE flag=0 AND id=?', [sd.residentId]);
            let p2 = db.get('SELECT * FROM chcs_service WHERE flag=0 AND id=?', [sd.serviceId]);
            let p3 = db.get('SELECT * FROM chcs_serviceItem WHERE flag=0 AND id=?', [sd.serviceItemId]);
            let r = await p1;
            let s = await p2;
            let si = await p3;
            sd['resident'] = r;
            sd['service'] = s;
            sd['serviceItem'] = si;
            return [p1, p2, p3];
        })
        Promise.all(toOneArray(re)).then(function () {
            common.sendResponse(res, 200, {
                code: 200,
                msg: '查询成功!',
                data: sda
            });
        })
    } else {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '查询失败!未查到相关数据!'
        });
    }

}
//根据居民详情id查询居民服务记录
module.exports.getServiceDetailByResidentId = async function (req, res) {
    let { residentId } = req.body;
    let sda = await db.query('SELECT * FROM chcs_serviceDetail WHERE flag=0 AND residentId=?', [residentId]);
    if (sda.length > 0) {
        let pList = sda.map(async (sd, index) => {
            let p1 = db.get('SELECT * FROM chcs_resident WHERE flag=0 AND id=?', [sd.residentId]);
            let p2 = db.get('SELECT * FROM chcs_service WHERE flag=0 AND id=?', [sd.serviceId]);
            let p3 = db.get('SELECT * FROM chcs_serviceItem WHERE flag=0 AND id=?', [sd.serviceItemId]);
            let r = await p1;
            let s = await p2;
            let si = await p3;
            sd['resident'] = r;
            sd['service'] = s;
            sd['serviceItem'] = si;
            return [p1, p2, p3];
        });
        Promise.all(toOneArray(pList)).then(function () {
            common.sendResponse(res, 200, {
                code: 200,
                msg: '查询成功!',
                data: sda
            });
        })
    } else {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '查询失败!未查到相关数据!'
        });
    }
}
//根据服务详情id更新服务状态
module.exports.updateStatusByServiceDetailId = async function (req, res) {
    let { status, id, checkerId } = req.body;
    if (status == 1 && checkerId) {
        await db.update('UPDATE chcs_serviceDetail SET status=?,auditTime=?,checkerId=? WHERE flag=0 AND id=?', [status, getCurDate(), checkerId, id]);
    } else {
        await db.update('UPDATE chcs_serviceDetail SET status=?,finishTime=? WHERE flag=0 AND id=?', [status, getCurDate(), id]);
    }
    common.sendResponse(res, 200, {
        code: 200,
        msg: '修改成功!'
    });
}
//根据居民详情id，服务包id查询各服务项目总共次数以及已使用的服务次数
module.exports.getServiceCountByRIdSId = async function (req, res) {
    let { residentId, serviceId } = req.body;
    let re = await db.query('SELECT id,name,count totalCount,c residueCount FROM chcs_serviceItem INNER JOIN (SELECT serviceItemId,COUNT(*) c FROM chcs_serviceDetail WHERE flag=0 AND residentId=? AND serviceId=? GROUP BY serviceItemId) a ON chcs_serviceItem.id=a.serviceItemId', [residentId, serviceId])
    if (re.length > 0) {
        common.sendResponse(res, 200, {
            code: 200,
            msg: '查询成功!',
            data: re
        });
    } else {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '查询失败!无数据可查!'
        });
    }
}


//分页搜索服务信息
module.exports.getSDRSSIBySOTSTSPage = async function (req, res) {
    let { status, organId, teamId, serviceId, startTime, endTime, searchKey, page, count } = req.body;
    let sql = 'SELECT csd.id id,csd.number number,cr.name rname,cr.IDCard rIDCard,cr.tel rtel,csd.status status,s.name sname,si.name iname,csd.submissionTime submissionTime,d.name dname FROM chcs_serviceDetail csd INNER JOIN chcs_resident cr ON csd.residentId=cr.id INNER JOIN chcs_service s ON s.id=csd.serviceId INNER JOIN chcs_serviceItem si ON csd.serviceItemId=si.id INNER JOIN chcs_doctor d ON d.id=csd.doctorId WHERE csd.flag=0';
    let param = [];
    if (status != undefined) {
        sql += ' AND csd.status=?';
        param.push(status);
    }
    if (organId != undefined) {
        sql += ' AND csd.organId=?';
        param.push(organId);
    }
    if (teamId != undefined) {
        sql += ' AND csd.teamId=?';
        param.push(teamId);
    }
    if (serviceId != undefined) {
        sql += ' AND csd.serviceId=?';
        param.push(serviceId);
    }
    if (startTime != undefined) {
        sql += ' AND csd.appointmentTime>=?';
        param.push(startTime);
    }
    if (endTime != undefined) {
        sql += ' AND csd.appointmentTime<?';
        param.push(endTime);
    }
    if (searchKey != undefined) {
        sql += ' AND si.name LIKE ? OR s.name LIKE ? OR cr.name LIKE ?';
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
//根据服务详情id查询服务信息
module.exports.getServiceDetailById = async function (req, res) {
    let { id } = req.body;
    let sd = await db.get('SELECT * FROM chcs_serviceDetail WHERE flag=0 AND id=?', [id]);
    let resident = await db.get('SELECT * FROM chcs_resident WHERE flag=0 AND id=?', [sd.residentId]);
    let labelArr = await db.query('SELECT id,name FROM chcs_label WHERE flag=0 AND id IN(SELECT labelId FROM chcs_residentLabel_relation WHERE flag=0 AND residentId=?)', [sd.residentId]);
    resident['labelArr'] = labelArr;
    let checker = await db.get('SELECT name FROM chcs_doctor WHERE flag=0 AND userId=?', [sd.checkerId]);
    sd['checker'] = (checker == undefined ? '无' : checker.name);
    sd['resident'] = resident;
    let r = await db.get('SELECT co.name oname,ct.name tname,cd.name dname,cs.name sname,csi.name siname,csi.count totalCount FROM chcs_serviceDetail csd INNER JOIN chcs_organ co ON csd.organId=co.id INNER JOIN chcs_team ct ON ct.id=csd.teamId INNER JOIN chcs_doctor cd ON csd.doctorId=cd.id INNER JOIN chcs_service cs ON csd.serviceId=cs.id INNER JOIN chcs_serviceItem csi ON csi.id=csd.serviceItemId  WHERE csd.id=?', [id]);
    let c = await db.get('SELECT COUNT(*) c FROM chcs_serviceDetail sd WHERE sd.residentId=? AND sd.serviceId=? AND sd.serviceItemId=? AND status!=3', [sd.residentId, sd.serviceId, sd.serviceItemId]);
    r['count'] = (c == undefined ? 0 : c.c);
    sd['other'] = r;
    common.sendResponse(res, 200, {
        code: 200,
        msg: '查询成功!',
        data: sd
    });
}
//新增服务
module.exports.saveServiceDetail = async function (req, res) {
    let { residentId, organId, teamId, doctorId, serviceId, serviceItemId, address, appointmentTime, notes } = req.body;
    let id = UUID.v1();
    await db.insert('INSERT INTO chcs_serviceDetail VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [id, createNumberStr(), residentId, organId, teamId, doctorId, serviceId, serviceItemId, address,
            appointmentTime, notes, getCurDate(), 0, 5, 0, null, null, 0]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '新增成功!',
        data: id
    });
}
//根据居民id查询服务机构团队医生服务包服务项
module.exports.getSDOTDSSIByResidentId = async function (req, res) {
    let { residentId } = req.body;
    let sda = await db.query('SELECT * FROM chcs_serviceDetail WHERE flag=0 AND residentId=? AND status!=3 ORDER BY submissionTime DESC', [residentId]);
    if (sda.length > 0) {
        let pList = sda.map(async (sd, index) => {
            let p1 = db.get('SELECT id,name FROM chcs_organ WHERE flag=0 AND id=?', [sd.organId]);
            let p2 = db.get('SELECT id,name FROM chcs_team WHERE flag=0 AND id=?', [sd.teamId]);
            let p3 = db.get('SELECT id,name FROM chcs_doctor WHERE flag=0 AND id=?', [sd.doctorId]);
            let p4 = db.get('SELECT id,name FROM chcs_service WHERE flag=0 AND id=?', [sd.serviceId]);
            let p5 = db.get('SELECT id,name,count totalCount FROM chcs_serviceItem WHERE flag=0 AND id=?', [sd.serviceItemId]);
            let o = await p1;
            let t = await p2;
            let d = await p3;
            let s = await p4;
            let si = await p5;
            sd['organ'] = o;
            sd['team'] = t;
            sd['doctor'] = d;
            sd['service'] = s;
            sd['serviceItem'] = si;
            let c = await db.get('SELECT COUNT(*) c FROM chcs_serviceDetail sd WHERE sd.residentId=? AND sd.serviceId=? AND sd.serviceItemId=? AND status!=3', [sd.residentId, sd.serviceId, sd.serviceItemId]);
            si['count'] = (c == undefined ? 0 : c.c);
            return [p1, p2, p3, p4, p5];
        });
        Promise.all(toOneArray(pList)).then(function () {
            common.sendResponse(res, 200, {
                code: 200,
                msg: '查询成功!',
                data: sda
            });
        })
    } else {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '查询失败!未查到相关数据!'
        });
    }
}


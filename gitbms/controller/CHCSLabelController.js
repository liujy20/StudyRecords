
var common = require('../tool/Common');
var db = require('../tool/SqlLiteTool').DB;
var UUID = require('uuid');
let {getCurDate,getFirstCase}=require("../tool/Utils");
//根据状态查询标签
module.exports.getLabelByStatus=async function(req,res){
    let {status}=req.body;
    let labelArr=await db.query('SELECT * FROM chcs_label WHERE flag=0 AND status=? OR status=0',[status]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '查询成功!',
        data:labelArr
    });
}
//查询所有标签以及标签相关居民人数
module.exports.getLabelAndResidentCount=async function(req,res){
    let re=await db.query('SELECT chcs_label.id id,chcs_label.name as  name, \
    (select count(0) from chcs_residentLabel_relation where \
    chcs_residentLabel_relation.labelId = chcs_label.id and chcs_residentLabel_relation.flag = 0) as count \
    FROM chcs_label \
    WHERE chcs_label.flag=0');
    if(re.length>0){
        common.sendResponse(res, 200, {
            code: 200,
            msg: '查询成功!',
            data:re
        });
    }else{
        common.sendResponse(res, 200, {
            code: 500,
            msg: '查询失败！未查询到结果!'
        });
    }
}
//新增标签
module.exports.saveLabel=async function(req,res){
    let {id=UUID.v1(),name,creatorId,lastModifyTime=getCurDate(),status=0,flag=0}=req.body;
    await db.insert('INSERT INTO chcs_label VALUES(?,?,?,?,?,?)',[id,name,creatorId,lastModifyTime,status,flag]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '新增成功!'
    });
}

//根据标签查询居民信息，按首字母组织数据
module.exports.getResidentByLabelId=async function(req,res){
    let {labelId}=req.body;
    let map = {};
    let re=await db.query('SELECT id,name,gender,picture,birthday FROM chcs_resident WHERE flag=0 AND id IN(SELECT residentId FROM chcs_residentLabel_relation WHERE flag=0 AND labelId=?)',[labelId]);
    let pList=re.map(async r=>{
        let p1=db.query('SELECT id,name FROM chcs_label WHERE flag=0 AND id IN(SELECT labelId FROM chcs_residentLabel_relation WHERE flag=0 AND residentId=?)',[r.id]);
        let labelArr=await p1;
        r['labelArr']=labelArr;


        let ca = getFirstCase(r.name.charAt(0))[0];
        if (map.hasOwnProperty(ca)) {
            map[ca].push(r);
        } else {
            map[ca] = [r];
        }
        return p1;
    });
    Promise.all(pList).then(()=>{
        common.sendResponse(res, 200, {
            code: 200,
            msg: '查询成功!',
            data:map
        });
    })
}
//查询非指定标签的居民信息
module.exports.getResidentByNotLabelId=async function(req,res){
    let {labelId}=req.body;
    let map = {};
    let re=await db.query('SELECT id,name,gender,picture,birthday FROM chcs_resident WHERE flag=0 AND id NOT IN(SELECT residentId FROM chcs_residentLabel_relation WHERE flag=0 AND labelId=?)',[labelId]);
    let pList=re.map(async r=>{
        let p1=db.query('SELECT id,name FROM chcs_label WHERE flag=0 AND id IN(SELECT labelId FROM chcs_residentLabel_relation WHERE flag=0 AND residentId=?)',[r.id]);
        let labelArr=await p1;
        r['labelArr']=labelArr;


        let ca = getFirstCase(r.name.charAt(0))[0];
        if (map.hasOwnProperty(ca)) {
            map[ca].push(r);
        } else {
            map[ca] = [r];
        }
        return p1;
    });
    Promise.all(pList).then(()=>{
        common.sendResponse(res, 200, {
            code: 200,
            msg: '查询成功!',
            data:map
        });
    })
}
//分页搜索查询标签信息
module.exports.getLabelBySearchPage=async function(req,res){
    let {searchKey,page,count}=req.body;
    let sql='SELECT l.id id,l.name name,d.name cname,l.lastModifyTime lastModifyTime,l.flag flag FROM chcs_label l INNER JOIN chcs_doctor d ON l.creatorId=d.userId WHERE l.flag!=2';
    let param=[];
    if(searchKey){
        sql+=' AND l.name LIKE ? OR d.name LIKE ?';
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
    let result=await db.query(sql,param);
    result.forEach((l,i)=>{
        l['number']=(i+1);
    });
    common.sendResponse(res, 200, {
        code: 200,
        msg: '查询成功!',
        data:{
            totalPage,
            total,
            result
        }
    });
}
//根据id更新标签状态
module.exports.updateStatusById=async function(req,res){
    let {flag,id}=req.body;
    await db.update('UPDATE chcs_label SET flag=? WHERE id=?',[flag,id]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '修改成功!'
    });
}
//根据id更新标签名称
module.exports.updateLabelNameById=async function(req,res){
    let {name,id}=req.body;
    await db.update('UPDATE chcs_label SET name=?,lastModifyTime=? WHERE id=?',[name,getCurDate(),id]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '修改成功!'
    });
}
//根据id删除标签
module.exports.delLabelById=async function(req,res){
    let {id}=req.body;
    // await db.delete('DELETE FROM chcs_label WHERE id=?',[id]);
    await db.update('UPDATE chcs_label SET flag=2 WHERE id=?',[id]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '删除成功!'
    });
}


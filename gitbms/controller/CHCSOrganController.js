
var common = require('../tool/Common');
var db = require('../tool/SqlLiteTool').DB;
var UUID = require('uuid');
const { createNumberStr } = require('../tool/Utils');

//查询分页搜索查询机构
module.exports.getOrganBySearchPage =async function (req, res) {
    let {searchKey,page,count}=req.body;
    let sql='SELECT * FROM chcs_organ WHERE flag!=2';
    let param=[];
    if(searchKey){
        sql+=' AND name LIKE ? OR number LIKE ? OR contactName LIKE ? OR contactTel LIKE ? OR address LIKE ? OR description LIKE ?';
        param.push('%'+searchKey+'%');
        param.push('%'+searchKey+'%');
        param.push('%'+searchKey+'%');
        param.push('%'+searchKey+'%');
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

//根据id更改机构启用状态
module.exports.updateOrganStatusById=async function(req,res){
    let {flag,id}=req.body;
    await db.update('UPDATE chcs_organ SET flag=? WHERE id=?',[flag,id]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '修改成功!'
    });
}

//根据id删除机构
module.exports.delOrganById=async function(req,res){
    let {id}=req.body;
    // await db.delete('DELETE FROM chcs_organ WHERE id=?',[id]);
    await db.update('UPDATE chcs_organ SET flag=2 WHERE id=?',[id]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '删除成功!'
    });
}
//根据id更新机构信息
module.exports.updateOrganById=async function(req,res){
    let {id,name,picture,contactName,contactTel,address,description}=req.body;
    await db.update('UPDATE chcs_organ SET name=?,picture=?,contactName=?,contactTel=?,address=?,description=? WHERE id=?',[name,picture,contactName,contactTel,address,description,id]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '修改成功!'
    });
}
//新增机构信息
module.exports.saveOrgan=async function(req,res){
    let {name,picture,contactName,contactTel,address,description}=req.body;
    let id=UUID.v1();
    await db.insert('INSERT INTO chcs_organ VALUES(?,?,?,?,?,?,?,?,?)',[id,createNumberStr(),name,picture,contactName,contactTel,address,description,0]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '新增成功!',
        data:{
            id
        }
    });
}
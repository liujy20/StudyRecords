
var common = require('../tool/Common');
var db = require('../tool/SqlLiteTool').DB;
var UUID = require('uuid');

module.exports.searchRoles = function (req, res) {

    let curPage = req.body.id;
    let pageSize = req.body.pageSize;
    if (!curPage || curPage <= 0) {
        curPage = 1;
    }
    
    if (!pageSize || pageSize <= 0) {
        pageSize = 20;
    }

    let params = [];
    let start = (curPage - 1) * pageSize;
    let sql = "select * from ums_role limit ? offset ?";
    
    params.push(pageSize);
    params.push(start);

    //取得总记录数
    db.get("select count(0) as total from ums_role").then(rowCount => {

        db.query(sql, params).then(rows => {
            console.log(333,params, rows);
            common.sendResponse(res, 200, {
                code: 200,
                msg: '',
                data: {
                    rows: rows,
                    total: rowCount.total,
                    pageSize: pageSize,
                    curPage: curPage
                }
            });
        }).catch(err => {
            common.sendResponse(res, 500, {
                code: 500,
                msg: '查询出错',
                data: []
            });
        });
    }).catch(err => {
        common.sendResponse(res, 500, {
            code: 500,
            msg: '查询出错',
            data: []
        });
    });

    
}

module.exports.getRoleById = function (req, res) {
    let id = req.body.id;

    db.get("select * from ums_role where id = ?", [id]).then(row => {
        common.sendResponse(res, 200, {
            code: 200,
            msg: '',
            data: row
        });
    }).catch(err => {
        common.sendResponse(res, 500, {
            code: 500,
            msg: '查询出错',
            data: []
        });
    });
}

module.exports.delRole = function (req, res) {
    let id = req.body.id
    db.delete("delete from ums_role where id=?", [id]).then(data => {
        common.sendResponse(res, 200, {
            code: 200,
            msg: '删除成功',
            data: data
        });
    }).catch(err => {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '删除失败',
            data: err
        });
    });
}

module.exports.updateRole = function (req, res) {
    
    let params = [];
    params.push(req.body.code);
    params.push(req.body.name);
    params.push(req.body.status);
    params.push(req.body.id);
    
    db.update("update ums_role set code=? name = ?, status= ? where id = ?", 
        params).then(data => {
        common.sendResponse(res, 200, {
            code: 200,
            msg: '修改成功',
            data: data
        });
    }).catch( err => {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '修改失败',
            data: err
        });
    });
}


module.exports.saveRolePrivilege = function (req, res) {
    let roleId = req.body.roleId;
    let listVote = req.body.listVote;
    if (!roleId) {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '授权失败,roleId未传',
            data: err
        });
        return;
    }
    if (!listVote || listVote.length <= 0) {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '授权失败,listVote未传',
            data: err
        });
        return;
    }

    //先删除角色下所有的权限
    let delSql = "delete from sys_role_privilege where fkRoleId = ?";
    db.delete(delSql, [roleId]).then(data => {
    }).catch(err => {
    });

    //循环添加权限
    let sql = "insert into sys_role_privilege(id, fkRoleId, fkPrivilegeId) values(?, ?, ?)";
    for (let voteId of listVote) {
        let params = [UUID.v1(), roleId, voteId];
        db.insert(sql, params).then(data => {
            
        }).catch(err => {
            
        });
    }
    common.sendResponse(res, 200, {code: 200, msg: "保存成功"});
}

module.exports.saveRole = function (req, res) {
    let params = [];
    params.push(UUID.v1());
    params.push(req.body.code);
    params.push(req.body.name);
    params.push(req.body.status);
    
    db.insert("insert into ums_role(id, code, name, status) values(?,?,?,?)", params).then(data => {
        common.sendResponse(res, 200, {code: 200, msg: "保存成功", data});
    }).catch(err => {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '保存失败',
            data: err
        });
    });

    // common.sendResponse(res, 200, {id:"1"});
}
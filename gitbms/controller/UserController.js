
var common = require('../tool/Common');
var db = require('../tool/SqlLiteTool').DB;
var UUID = require('uuid');

module.exports.saveVote = function (req, res) {
    let selectedVote = req.body.selectedVote;
    let userid = req.body.userid;

    //先把该用户的权限清空掉
    db.delete("delete from ums_user_power where userid=?", [userid]).then(data => {
    }).catch(err => {
    });

    //重新授权给用户
    let insertSQL = "insert into ums_user_power values(?,?,?)";
    for (let vote of selectedVote) {
        let params = [];
        params.push(UUID.v1());
        params.push(userid);
        params.push(vote);

        db.insert(insertSQL, params).then(data => {

        }).catch(err => {
            
        });
    }
    console.log(selectedVote);
    console.log(userid);

    common.sendResponse(res, 200, {
        code: 200,
        msg: '授权成功'
    });
}
module.exports.searchUsers = function (req, res) {
// console.log(req)
    let url = req.originalUrl;
    let tableName = url.split("/");
    console.log(tableName);
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
    let sql = "select * from ums_user limit ? offset ?";
    
    params.push(pageSize);
    params.push(start);

    //取得总记录数
    db.get("select count(0) as total from ums_user").then(rowCount => {

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

module.exports.getUserById = function (req, res) {
    let id = req.body.id;

    db.get("select * from ums_user where id = ?", [id]).then(row => {
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

module.exports.delUser = function (req, res) {
    let id = req.body.id
    db.delete("delete from ums_user where id=?", [id]).then(data => {
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

module.exports.updateUser = function (req, res) {
    
    let params = [];
    params.push(req.body.fkRoleId);
    params.push(req.body.name);
    params.push(req.body.pwd);
    params.push(req.body.headImg);
    params.push(req.body.dept);
    params.push(req.body.status);
    params.push(req.body.dr);
    params.push(req.body.id);
    
    db.update("update ums_user set fkRoleId=?, name = ?, pwd = ?, headImg = ?, dept=?, status= ?, dr=? where id = ?", 
        params).then(data => {
        console.log(222,data);
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

module.exports.saveUser = function (req, res) {
    let params = [];
    params.push(UUID.v1());
    params.push(req.body.fkRoleId);
    params.push(req.body.name);
    params.push(req.body.pwd);
    params.push(req.body.headImg);
    params.push(req.body.dept);
    params.push(req.body.status);
    params.push(0);
    
    db.insert("insert into ums_user(id, fkRoleId, name, pwd, headImg, dept, status, dr) values(?,?,?,?,?,?,?)", params).then(data => {
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
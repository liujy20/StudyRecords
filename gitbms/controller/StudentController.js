
var common = require('../tool/Common');
var db = require('../tool/SqlLiteTool').DB;
var UUID = require('uuid');

module.exports.getStudents = function (req, res) {
    let curPage = req.body.curPage;
    let pageSize = req.body.pageSize;
    if (!curPage || curPage <= 0) {
        curPage = 1;
    }
    
    if (!pageSize || pageSize <= 0) {
        pageSize = 20;
    }

    let params = [];
    let start = (curPage - 1) * pageSize;
    let sql = "select * from ums_student limit ? offset ?";
    
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

module.exports.getStudentById = function (req, res) {
    let id = req.body.id;

    db.get("select * from ums_student where id = ?", [id]).then(row => {
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

module.exports.delStudents = function (req, res) {
    let id = req.body.id
    db.delete("delete from ums_student where id=?", [id]).then(data => {
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

module.exports.updateStudent = function (req, res) {
    
    let params = [];
    params.push(req.body.name);
    params.push(req.body.sex);
    params.push(req.body.age);
    params.push(req.body.pwd);
    params.push(req.body.status);
    params.push(req.body.id);
    
    db.update("update ums_student set name = ?, sex = ?, age = ?, pwd=?, status= ? where id = ?", 
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

module.exports.saveStudents = function (req, res) {
    let params = [];
    params.push(UUID.v1());
    params.push(req.body.name);
    params.push(req.body.pwd);
    params.push(req.body.headImg);
    params.push(req.body.sex);
    params.push(req.body.age);
    params.push(req.body.status);
    
    db.insert("insert into ums_student(id, name, pwd, headImg, sex, age, status) values(?,?,?,?,?,?,?)", params).then(data => {
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
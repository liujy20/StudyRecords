
var common = require('../tool/Common');
var db = require('../tool/SqlLiteTool').DB;
var UUID = require('uuid');
var Utils = require('../tool/Utils');

module.exports.search = async function (req, res) {
    let reqBody = req.body;
    console.log("reqBody", reqBody);
    let url = req._parsedUrl.pathname.split("/");
    let tableName = url[url.length -1].replace("search", "");
    tableName = Utils.getTableName(tableName);
    let curPage = reqBody.curPage;
    let pageSize = reqBody.pageSize;
    if (!curPage || curPage <= 0) {
        curPage = 1;
    }
    if (!pageSize || pageSize <= 0) {
        pageSize = 20;
    }

    let params = [];
    let countParams = [];
    let start = (curPage - 1) * pageSize;

    let customSql = `select * from sys_restfull where sqlType='commonQuery' and sqlKey='${tableName}'`;

    let tempResult = await db.get(customSql, []);

    let sql = `select * from ${tableName}`;
    let countSql = `select count(0) as total from ${tableName}`;
    let columnPrefix = "";
    if (tempResult) {
        sql = tempResult.sqlContent;
        countSql = tempResult.countSql;
        columnPrefix = tableName + ".";
    }
    
    if (reqBody.condition != undefined) {
        
        sql = sql + " where ";
        countSql = countSql + " where ";
        for (let propName in reqBody.condition) {
            let conditionVal = reqBody.condition[propName];

            if (null === conditionVal || "" === conditionVal || undefined === conditionVal) {
                continue;
            }
            
            sql = sql + `${columnPrefix}${propName} = ? and `;
            countSql = countSql + `${columnPrefix}${propName} = ? and `;
            params.push(conditionVal);
            countParams.push(reqBody.condition[propName]);
        }
        if (params.length > 0) {
            sql = sql.slice(0, sql.length - 4);
            countSql = countSql.slice(0, countSql.length - 4);
        } else {
            sql = sql.slice(0, sql.length - 6);
            countSql = countSql.slice(0, countSql.length - 6);
        }
    } 
    sql = sql + " limit ? offset ?";
    params.push(pageSize);
    params.push(start);
    console.log("countSql", countSql);
    //取得总记录数
    try{
        let countRes = await db.get(countSql, countParams);
        let listRes = await db.query(sql, params);
        common.sendResponse(res, 200, {
            code: 200,
            msg: '',
            data: {
                rows: listRes,
                total: countRes.total,
                pageSize: pageSize,
                curPage: curPage
            }
        });
    } catch(e) {
        common.sendResponse(res, 500, {
            code: 500,
            msg: '查询出错'
        });
    }
}

module.exports.getAll = async function (req, res) {
    let reqBody = req.body;
    console.log("reqBody", reqBody);
    let url = req._parsedUrl.pathname.split("/");
    let tableName = url[url.length -1].replace("getAll", "");
    tableName = Utils.getTableName(tableName);

    let params = [];

    let customSql = `select * from sys_restfull where sqlType='queryAll' and sqlKey='${tableName}'`;

    let tempResult = await db.get(customSql, []);

    let sql = `select * from ${tableName}`;
    if (tempResult) {
        sql = tempResult.sqlContent;
    }

    if (reqBody.condition != undefined) {
        sql = sql + " where ";
        for (let propName in reqBody.condition) {
            sql = sql + `${propName} = ? and `;
            params.push(reqBody.condition[propName]);
        }
        sql = sql.slice(0, sql.length - 4);
    } 
    console.log(sql);
    //取得总记录数
    db.query(sql, params).then(rows => {
        common.sendResponse(res, 200, {
            code: 200,
            msg: '',
            data: {
                rows: rows
            }
        });
    }).catch(err => {
        common.sendResponse(res, 500, {
            code: 500,
            msg: '查询出错',
            data: []
        });
    });
}

module.exports.getById = function (req, res) {

    let reqBody = req.body;
    let id = req.body.id;
    if (!id) {
        common.sendResponse(res, 500, {
            code: 500,
            msg: '请输入id'
        });
        return;
    }
    
    let url = req._parsedUrl.pathname.split("/");
    let tableName = url[url.length -1].replace("get", "").replace("ById", "");
    tableName = Utils.getTableName(tableName);
    
    
    console.log(`select * from ${tableName} where id = ?`, id);

    db.get(`select * from ${tableName} where id = ?`, [id]).then(row => {
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

module.exports.del = function (req, res) {
    let id = req.body.id
    if (!id) {
        common.sendResponse(res, 500, {
            code: 500,
            msg: '请输入id'
        });
        return;
    }
    

    let url = req._parsedUrl.pathname.split("/");
    let tableName = url[url.length -1].replace("del", "");
    tableName = Utils.getTableName(tableName);

    
    db.delete(`delete from ${tableName} where id=?`, [id]).then(data => {
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

module.exports.update = function (req, res) {
    let url = req._parsedUrl.pathname.split("/");
    let tableName = url[url.length -1].replace("update", "");
    tableName = Utils.getTableName(tableName);

    let reqBody = req.body;
    let params = [];

    let sql = `update ${tableName} set `;
    if (reqBody != undefined) {
        for (let propName in reqBody) {
            if (propName == "id") {
                if (!reqBody[propName]) {
                    common.sendResponse(res, 200, {
                        code: 500,
                        msg: '请输入id'
                    });
                    return;
                } else {
                    continue;
                }
            }
            sql = sql + `${propName}=?,`;
            params.push(reqBody[propName]);
        }
        sql = sql.slice(0, sql.length - 1);
    } 
    sql = sql + " where id = ?"
    params.push(reqBody.id);
    console.log(sql, params);
    db.update(sql, params).then(data => {
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

module.exports.save = function (req, res) {
    let url = req._parsedUrl.pathname.split("/");
    let tableName = url[url.length -1].replace("save", "");
    tableName = Utils.getTableName(tableName);

    let params = [];

    let reqBody = req.body;
    params.push(UUID.v1());
    let sql = `insert into ${tableName}(id,`;
    let valuesSql = " values(?,";
    if (reqBody != undefined) {
        for (let propName in reqBody) {
            if (propName == "id") {
                continue;
            }
            sql = sql + `${propName},`;
            valuesSql = valuesSql + `?,`;
            params.push(reqBody[propName]);
        }
        sql = sql.slice(0, sql.length - 1) + ")";
        valuesSql = valuesSql.slice(0, valuesSql.length - 1) + ")";
    } 
    sql = sql + valuesSql;
    db.insert(sql, params).then(data => {
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

module.exports.restfull = function (req, res) {
    let url = req._parsedUrl.pathname.split("/");
    let sqlKey = url[url.length -1].replace("restfull", "");
    db.get(`select * from sys_restfull where sqlKey = ?`, [sqlKey]).then(row => {
        if(!row) {
            common.sendResponse(res, 500, {
                code: 500,
                msg: '接口地址错误，请检查',
                data: []
            });
        } else {
            let sql = row.sqlContent;
            let sqlType = row.sqlType;
            if (sqlType == "query") {
                let reqBody = req.body;
                let params = [];
                if (reqBody != undefined) {
                    for (let propName in reqBody) {
                        params.push(reqBody[propName]);
                    }
                } 
                console.log(sql, params);
                db.query(sql, params).then(rows => {
                    common.sendResponse(res, 200, {
                        code: 200,
                        msg: '',
                        data: {
                            rows: rows
                        }
                    });
                }).catch(errQuery => {
                    common.sendResponse(res, 500, {
                        code: 500,
                        msg: '查询出错',
                        data: []
                    });
                });
            } else if (sqlType == "save") {
                let reqBody = req.body;
                console.log(reqBody);
                let params = [];
                params.push(UUID.v1());
                
                let columnBuffer = "id";
                let valusBuffer = "?";
                if (reqBody != undefined) {
                    for (let propName in reqBody) {
                        if (propName == "id") {
                            continue;
                        }
                        params.push(reqBody[propName]);
                        columnBuffer = columnBuffer + "," + propName;
                        valusBuffer = valusBuffer + ",?";
                    }
                } 

                sql = sql.replace("columnBuffer", columnBuffer);
                sql = sql.replace("valuesSql", valusBuffer);
                console.log(sql, params);
                db.insert(sql, params).then(data => {
                    common.sendResponse(res, 200, {code: 200, msg: "保存成功", data});
                }).catch(errInsert => {
                    common.sendResponse(res, 200, {
                        code: 500,
                        msg: '保存失败',
                        data: errInsert
                    });
                });
            } else if (sqlType == "get") {
                let id = req.body.id;
                if (!id) {
                    common.sendResponse(res, 500, {
                        code: 500,
                        msg: '请输入id'
                    });
                    return;
                }
                console.log(sql, id);
                db.get(sql, [id]).then(rowGet => {
                    common.sendResponse(res, 200, {
                        code: 200,
                        msg: '',
                        data: rowGet
                    });
                }).catch(errGet => {
                    common.sendResponse(res, 500, {
                        code: 500,
                        msg: '查询出错',
                        data: []
                    });
                });
            }
        }
    }).catch(err => {
        common.sendResponse(res, 500, {
            code: 500,
            msg: '查询出错',
            data: []
        });
    });

}

module.exports.getOptions = async function (req, res) {
    let reqBody = req.body;
    let opType = reqBody.opType;
    if (opType.startsWith("def_")) {
        //取字典
        let sql = "select id as value, name as label from sys_def where codeType=? order by id desc";
        db.query(sql, [opType.replace("def_","")]).then(rows => {
            common.sendResponse(res, 200, {
                code: 200,
                msg: '',
                data: {
                    rows: rows
                }
            });
        })
    } else {
        //取sql执行
        let sql = "select * from sys_restfull where sqlKey=? and sqlType='optionQuery'";
        let row = await db.get(sql, [opType]);
        if (row) {
            let sqlData = row.sqlContent;
            db.query(sqlData, []).then(rows => {
                common.sendResponse(res, 200, {
                    code: 200,
                    msg: '',
                    data: {
                        rows: rows
                    }
                });
            })
        }
    }
}
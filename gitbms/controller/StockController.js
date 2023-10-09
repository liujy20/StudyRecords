
var common = require('../tool/Common');
var db = require('../tool/SqlLiteTool').DB;
var UUID = require('uuid');

module.exports.createStock = function (req, res) {
    let counterId = req.body.counterId;
    
    //先把该用户的权限清空掉
    db.query("select * from pms_stock where fkCounterId=?", [counterId]).then(rows => {
        console.log("rows",counterId, rows);
        if (rows && rows.length > 0) {
            console.log("rows,1111")
            //已创建
            common.sendResponse(res, 500, {
                code: 500,
                msg: '仓库已创建',
                data: []
            });
            return;
        } else {
            //创建仓库
            let counterSql = "select * from pms_counter where id = ?";
            console.log("sql", counterSql);
            db.get(counterSql, [counterId]).then(counterRow => {
                if (counterRow) {
                    let maxSaveNum = counterRow.maxSaveNum;
                    let counterNo = counterRow.counterNo;
                    
                    
                    for (let i = 0; i < maxSaveNum; i++) {
                        let stockInsertSql = "insert into pms_stock values(?,?,?,?,?)";
                        let params = [];
                        params.push(UUID.v1());
                        params.push(counterId);
                        params.push(counterNo + (i + 1));
                        params.push("");
                        params.push("empty");
                        console.log(stockInsertSql, params);
                        db.insert(stockInsertSql, params).then(data => {
                        }).catch(err => {
                        });
                    }
                }
            }).catch(err => {
            });
        }
    }).catch(err => {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '创建失败'
        });
        return;
    });

    common.sendResponse(res, 200, {
        code: 200,
        msg: '创建成功'
    });
}

module.exports.stockOut = async function (req, res) {
    let waybillId = req.body.waybillId;
    
    let getStockSql = "select * from pms_stock where fkWaybillId = ?";
    let res1 = await db.get(getStockSql, [stockId]);
    console.log(res1);
    
    // .then(async (row) => {
    //     if (row && row.status == 'empty') {
    //         common.sendResponse(res, 200, {
    //             code: 500,
    //             msg: '货架已出库，出库失败',
    //             data: err
    //         });
    //         return;
    //     } else {
            
    //     }
    // }).catch( err => {
    //     common.sendResponse(res, 200, {
    //         code: 500,
    //         msg: '出库失败',
    //         data: err
    //     });
    //     return;
    // });

    let stockSql = "update pms_stock set status = 'empty' where id = ?";
    await db.update(stockSql, [row.id]);

    let waybillSql = "update pms_waybill set status = '5',stockOutTime = ? where id = ?";
    let curDate = common.getCurDate(); 
    
    await db.update(waybillSql, [curDate, waybillId]);

    common.sendResponse(res, 200, {
        code: 200,
        msg: '出库成功',
        data: data
    });
}

module.exports.stockIn = function (req, res) {
    let stockId = req.body.stockId;
    let waybillId = req.body.waybillId;

    let isSuccess = true;
    let getStockSql = "select * from pms_stock where id = ?";
    db.get(getStockSql, [stockId]).then(row => {
        console.log(555, row)
        if (row && row.status == 'full') {
            common.sendResponse(res, 200, {
                code: 500,
                msg: '货架已占用，入库失败'
            });
            isSuccess = false;
        }
    }).catch( err => {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '入库失败',
            data: err
        });
        isSuccess = false;
    }); 

    let getStockSql2 = "select * from pms_stock where fkWaybillId = ?";
    db.get(getStockSql2, [waybillId]).then(row => {
        console.log("222", row);
        if (row) {
            console.log("3333");
            common.sendResponse(res, 200, {
                code: 500,
                msg: '运单已入库，请重新选择'
            });
            isSuccess = false;
        }
    }).catch( err => {
        console.log("4444", err);
        common.sendResponse(res, 200, {
            code: 500,
            msg: '入库失败'
        });
        isSuccess = false;
    }); 

    let stockSql = "update pms_stock set status = 'full',fkWaybillId=? where id = ?";
    db.update(stockSql, [waybillId, stockId]).then(data => {
    }).catch( err => {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '入库失败'
        });
        isSuccess = false;
    });

    let waybillSql = "update pms_waybill set status = '4',stockInTime = ? where id = ?";
    let curDate = common.getCurDate(); 
    
    db.update(waybillSql, [curDate, waybillId]).then(data => {
        if (isSuccess) {
            common.sendResponse(res, 200, {
                code: 200,
                msg: '入库成功'
            });
        }
        
    }).catch( err => {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '入库失败'
        });
        isSuccess = false;
    });

    
}
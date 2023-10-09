
var common = require('../tool/Common');
var db = require('../tool/SqlLiteTool').DB;
var UUID = require('uuid');
var Utils = require('../tool/Utils');


module.exports.cancelTravelOrder = async function (req, res) {
    let {orderId, cancelReson, cancelType, cancelUserId} = req.body;
    if (!orderId) {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '订单id未传'
        });
        return;
    }
    if (!cancelUserId) {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '用户id未传'
        });
        return;
    }
    if (!cancelReson) {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '请输入取消原因'
        });
        return;
    }
    if (cancelType != 0 && cancelType != 1) {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '取消类型未传'
        });
        return;
    }

    

    let status = 6;
    if (cancelType == 1) {
        //司机取消
        status = 7;
    }

    let params = [];

    let cancelSql = "update cx_travel_order set status = ?, cancelType=?, cancelReson = ?, cancelUserId = ? where id = ? and dr=0";

    params.push(status);
    params.push(cancelType);
    params.push(cancelReson);
    params.push(cancelUserId);
    params.push(orderId)

    db.update(cancelSql, params).then(count => {
        common.sendResponse(res, 200, {
            code: 200,
            msg: '取消成功'
        });
    }).catch(err => {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '取消失败，sql出错'
        });
    })
}
module.exports.orderTraval = async function (req, res) {
    let {fkUserId, fkCarUserId, fkCarId, couponCode, startAddress, endAddress, startLon, startLat, startTime} = req.body;

    //查询车型
    let carSql = "select * from cx_car where id = ?";
    let carResult = await db.get(carSql, [fkCarId]);
    if (!carResult) {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '下单失败, 请选择车型'
        });
        return;
    }

    //查优惠券
    let fkCouponId = "";
    let couponPrice = 0;
    if (couponCode) {
        let couponSql = "select * from cx_user_coupon where couponCode = ?";
        let couponResult = await db.get(couponSql, [couponCode]);
        if (couponResult) {
            fkCouponId = couponResult.id;
            couponPrice = couponResult.couponPrice;
        } else {
            common.sendResponse(res, 200, {
                code: 500,
                msg: '优惠券码不正确，请检查'
            });
            return;
        }
    }

    if (fkUserId) {
        let userSQL = "select * from ums_member where id = ?";
        let userResult = await db.get(userSQL, [fkUserId]);
        if (!userResult) {
            common.sendResponse(res, 200, {
                code: 500,
                msg: '下单用户不存在，请检查'
            });
            return;
        }
    } else {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '下单用户不存在，请检查'
        });
        return;
    }

    if (fkCarUserId) {
        let userSQL = "select * from ums_member where id = ?";
        let userResult = await db.get(userSQL, [fkCarUserId]);
        if (!userResult) {
            common.sendResponse(res, 200, {
                code: 500,
                msg: '车主用户不存在，请检查'
            });
            return;
        }
    } else {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '车主用户不存在，请检查'
        });
        return;
    }

    let insertSql = "insert into cx_travel_order(id, orderNo, fkUserId,fkCarUserId, orderTime, fkCarId, carType, price, fkCouponId,couponMonety,startAddress,endAddress,startLon,startLat,startTime) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    let params = [];
    params.push(UUID.v1());
    params.push(Utils.genOrderNo());
    params.push(fkUserId);
    params.push(fkCarUserId);
    params.push(Utils.getCurDate());
    params.push(fkCarId);
    params.push(carResult.carTypeName);
    params.push(carResult.price);
    params.push(fkCouponId);
    params.push(couponPrice);
    params.push(startAddress);
    params.push(endAddress);
    params.push(startLon);
    params.push(startLat);
    params.push(startTime);

    db.insert(insertSql, params).then(row => {
        common.sendResponse(res, 200, {
            code: 200,
            msg: '下单成功'
        });
        return;
    }).catch(err => {
        console.log(err)
        common.sendResponse(res, 200, {
            code: 500,
            msg: '下单失败，请稍候重试',
            data: err
        });
        return;
    });

    



}
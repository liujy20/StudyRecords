const orderManagementModel = require('../../model/orderManagementModel')
const childOrderModel = require('../../model/childOrderModel')
const historyModel = require('../../model/historyModel')
require('../../model/stockModel')

// const usersModel = require('../../model/usersModel')
//引入util文件
const { getFormatDate, addFormatDate } = require('../../utils/dataUtils')
const { check_id, check_string, check_number, check_pay } = require('../../utils/checkType')

// 新增订单
async function add(req, res, next) {
    let { status, pay, goods, user_id, order_type, address_id, order_note } = req.body
    if (check_number(status) && check_pay(pay) && check_id(user_id) && check_number(order_type) && check_id(address_id) && goods) {
        //创建时间 2022-07-28 15:01:53
        let create_time = getFormatDate()
        //子订单id数组
        let child_array = []

        if (status == 2) {
            pay.pay_time = create_time
        }
        let num = goods.length
        goods.forEach(async (item, index) => {
            let { stock_id, goods_count } = item
            if (status == 2) {
                pay.pay_time = create_time
                item.pay.pay_time = create_time
            }
            let child = await childOrderModel.create({ user_id, stock_id, status, goods_count, create_time, address_id, pay: item.pay, order_type })
            pushHistory(child._id, status)
            child_array.push(child._id)
            num--
            if (num == 0 && child_array) {
                let data = await orderManagementModel.create({ user_id, status, goods: child_array, order_type, address_id, order_note, create_time, pay, show: 1 })
                if (data) {
                    pushHistory(data._id, status)
                    res.send({
                        meta: {
                            msg: '添加成功',
                            status: 200
                        }
                    });
                } else {
                    res.send({
                        meta: {
                            msg: '添加失败',
                            status: 201
                        }
                    });
                }
            }
        })
    } else {
        res.send({
            meta: {
                msg: '参数有误',
                status: 202
            }
        });
    }


}
//获取用户所有订单分类数量
async function getClassifyCount(req, res, next) {
    let { user_id } = req.body
    if (check_id(user_id)) {
        let data = await childOrderModel.find({ user_id });
        // 状态分类 1:未支付、2:未发货、3:待收货、4:待评价、5:交易完成、6:待核销、7:已核销、-1:仅退款、-2:退货退款、-3:拒绝退款、-4:商品待退货、-5:退货待收货、-6:已退款、-7:已删除
        let classify = [
            { name: "wait_pay", status: 1, count: 0 },
            { name: "wait_deliver", status: 2, count: 0 },
            { name: "wait_receive", status: 3, count: 0 },
            { name: "wait_comment", status: 4, count: 0 },
            { name: "deal_done", status: 5, count: 0 },
            { name: "wait_cancel", status: 6, count: 0 },
            { name: "cancel_done", status: 7, count: 0 },
            { name: "only_refund", status: -1, count: 0 },
            { name: "return_refund", status: -2, count: 0 },
            { name: "refuse_refund", status: -3, count: 0 },
            { name: "wait_return", status: -4, count: 0 },
            { name: "return_wait_receive", status: -5, count: 0 },
            { name: "refund_done", status: -6, count: 0 },
            { name: "delete_done", status: -7, count: 0 },
        ]
        let obj = {}
        data.map((item) => {
            let one = classify.find(i => i.status == item.status)
            one.count++
        })
        let data2 = await orderManagementModel.find({ user_id, status: 1 });
        classify[0].count = data2.length
        classify.map(item => obj[item.name] = item.count)
        res.send({
            data: [obj],
            meta: {
                msg: '获取成功',
                status: 200,
            }
        });
    } else {
        res.send({
            meta: {
                msg: '参数有误',
                status: 202
            }
        });
    }
}
//获取用户单类订单
async function getClassify(req, res, next) {
    let { user_id, status } = req.body
    if (check_id(user_id) && check_number(status)) {
        let data
        if (status == 1) {
            data = await orderManagementModel.find({ user_id, status });
        } else {
            data = await childOrderModel.find({ user_id, status });
        }
        res.send({
            data,
            meta: {
                msg: '获取成功',
                status: 200,
            }
        });
    } else {
        res.send({
            meta: {
                msg: '参数有误',
                status: 202
            }
        });
    }
}
//获取用户单个订单
async function getOne(req, res, next) {
    const { _id } = req.body
    if (check_id(_id)) {
        let data = await childOrderModel.find({ _id }).populate("stock_id");
        if (data.length > 0) {
            res.send({
                data,
                meta: {
                    msg: '获取成功',
                    status: 200,
                }
            });
        } else {
            res.send({
                data,
                meta: {
                    msg: '获取失败',
                    status: 201
                }
            });
        }
    } else {
        res.send({
            meta: {
                msg: '参数有误',
                status: 202
            }
        });
    }
}
//修改订单状态
async function updateOne(req, res, next) {
    // 状态分类 1:未支付、2:未发货、3:待收货、4:待评价、5:交易完成、6:待核销、7:已核销、-1:仅退款、-2:退货退款、-3:拒绝退款、-4:商品待退货、-5:退货待收货、-6:已退款、-7:已删除
    const { _id, status } = req.body
    let data
    if (check_id(_id) && check_number(status)) {
        //支付
        if (status == 2) {
            let pay_time = getFormatDate()
            data = await orderManagementModel.updateMany({ _id }, { status, "pay.pay_time": pay_time });
            if (data) {
                let result = await orderManagementModel.find({ _id });
                result[0].goods.forEach(async _id => {
                    await childOrderModel.updateMany({ _id }, { status, "pay.pay_time": pay_time });
                    pushHistory(_id, status)
                })
            }
            if (data.nModified) {
                res.send({
                    meta: {
                        msg: '订单状态更新成功',
                        status: 200,
                    }
                });
            } else {
                res.send({
                    meta: {
                        msg: '订单状态更新失败',
                        status: 201
                    }
                });
            }
        } else if (status == 4 || status == 5 || status == -7) {
            //确认收货 、评价完成
            data = await childOrderModel.updateMany({ _id }, { status });
            let mainOrder = await orderManagementModel.find({ goods: { $elemMatch: { $eq: _id } } })
            mainOrder = mainOrder[0]
            let ress = mainOrder.goods.every(async item => {
                let result = await childOrderModel.find({ _id: item })
                return result.status == status
            })
            ress ? await orderManagementModel.updateMany({ _id: mainOrder._id }, { status }) : null
            if (data.n) {
                pushHistory(_id, status)
                res.send({
                    meta: {
                        msg: '订单状态更新成功',
                        status: 200,
                    }
                });
            } else {
                res.send({
                    meta: {
                        msg: '订单状态更新失败',
                        status: 201
                    }
                });
            }
        } else if (status == -1 || status == -2) {
            //refund_count, refund_reason, refund_note, refund_imgs
            const { refund } = req.body
            refund.refund_time = new Date().toLocaleString().split(' ')[0].split('/').map(i => i.padStart(2, '0')).join('-') + " " + new Date().toLocaleString().split(' ')[1]
            data = await childOrderModel.updateMany({ _id }, { status, refund });
            if (data.n) {
                pushHistory(_id, status)
                res.send({
                    meta: {
                        msg: '订单状态更新成功',
                        status: 200,
                    }
                });
            } else {
                res.send({
                    meta: {
                        msg: '订单状态更新失败',
                        status: 201
                    }
                });
            }
        } else {
            res.send({
                meta: {
                    msg: '参数错误,无法修改为该类订单状态',
                    status: 202
                }
            });
        }
    } else {
        res.send({
            meta: {
                msg: '参数错误',
                status: 202
            }
        });
    }
}
async function deleteOne(req, res, next) {
    const { _id } = req.body
    let status = -7
    if (check_id(_id)) {
        let data = await childOrderModel.updateMany({ _id }, { status: -7 });
        let mainOrder = await orderManagementModel.find({ goods: { $elemMatch: { $eq: _id } } })
        mainOrder = mainOrder[0]
        let ress = mainOrder.goods.every(async item => {
            let result = await childOrderModel.find({ _id: item })
            return result.status == -7
        })
        ress ? await orderManagementModel.updateMany({ _id: mainOrder._id }, { status: -7 }) : null
        if (data.n) {
            pushHistory(_id, status)
            res.send({
                meta: {
                    msg: '订单已删除',
                    status: 200,
                }
            });
        } else {
            res.send({
                meta: {
                    msg: '删除失败',
                    status: 201
                }
            });
        }
    }else{
        res.send({
            meta: {
                msg: '参数有误,订单号有误',
                status: 202
            }
        });
    }
}
//订单记录
async function pushHistory(order_id, status) {
    let message
    let time = new Date().toLocaleString().split(' ')[0].split('/').map(i => i.padStart(2, '0')).join('-') + " " + new Date().toLocaleString().split(' ')[1]
    switch (status) {
        case 1:
            message = "订单生成"
            break;
        case 2:
            message = "用户付款成功"
            break;
        case 3:
            message = "已发货"
            break;
        case 4:
            message = "已确认收货"
            break;
        case 5:
            message = "已评价"
            break;
        case -1:
            message = "已申请退款"
            break;
        case -2:
            message = "已申请退货退款"
            break;
        case -3:
            message = "已拒绝该用户退款"
            break;
        case -4:
            message = "同意售后申请"
            break;
        case -5:
            message = "退货待收货"
            break;
        case -6:
            message = "退款成功"
            break;
        case -7:
            message = "用户删除该订单"
            break;
        default:
            message = "执行其他操作"
            break;
    }
    await historyModel.create({ order_id, message, time })
}
module.exports = {
    add,
    getClassifyCount,
    getClassify,
    getOne,
    updateOne,
    deleteOne
}
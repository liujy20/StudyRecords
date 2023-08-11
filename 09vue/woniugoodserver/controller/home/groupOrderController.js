const groupModel = require('../../model/groupOrderModel')
const orderManagementModel = require('../../model/orderManagementModel')
const childOrderModel = require('../../model/childOrderModel')
const historyModel = require('../../model/historyModel')
const stockModel = require('../../model/stockModel')
const groupGoods = require('../../model/groupGoodsModel')

//引入util文件
const { getFormatDate, addFormatDate } = require('../../utils/dataUtils')
const { check_id, check_string, check_number, check_pay } = require('../../utils/checkType')

// 新增拼团订单
async function add(req, res, next) {
    let { pay, user_id, stock_id, address_id, order_note, goods_count } = req.body
    if (check_pay(pay) && check_id(user_id) && check_id(stock_id) && check_id(address_id) && check_string(order_note) && check_number(goods_count)) {
        //获取商品数据
        let stockData = await stockModel.find({ _id: stock_id }).populate("groupId");
        stockData = stockData[0]
        if (stockData) {
            //价格
            let price = stockData.groupPrice
            //结束时间
            let end_time = addFormatDate(stockData.groupId.aging)
            //拼团人数
            let several = stockData.groupId.peopleNum
            //拼团人数 虚拟人数+1
            let part = stockData.groupId.peopleNumMoke + 1
            //创建时间 2022-07-28 15:01:53
            let create_time = getFormatDate()
            //状态 待发货
            let status = 2
            //拼团订单
            let order_type = 1
            pay.pay_time = create_time
            let child = await childOrderModel.create({ user_id, stock_id, status, goods_count, create_time, address_id,pay, order_type })
            pushHistory(child._id, status)
            let data = await orderManagementModel.create({ user_id, status, goods: [child._id], order_type, address_id, order_note, create_time, pay,show:1 })
            pushHistory(data._id, status)
            status = part == several ? 1 : 0
            let newGroupOrder = await groupModel.create({ users: [user_id], price, create_time, several, part, end_time, stock_id, status, order_array: [data._id] })
            if (newGroupOrder) {
                res.send({
                    meta: {
                        msg: '添加拼团订单成功',
                        status: 200
                    }
                });
            } else {
                res.send({
                    meta: {
                        msg: '添加拼团订单失败',
                        status: 201
                    }
                });
            }
        } else {
            res.send({
                meta: {
                    msg: '参数有误,库存id有误',
                    status: 202
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
//加入拼团
async function join(req, res, next) {
    let { groupOrder_id, pay, user_id, stock_id, address_id, order_note, goods_count } = req.body
    if (check_id(groupOrder_id) && check_id(user_id) && check_id(stock_id) && check_id(address_id) && check_pay(pay) && check_string(order_note) && check_number(goods_count)) {
        //获取拼团订单信息
        let data2 = await groupModel.find({ _id: groupOrder_id });
        data2 = data2[0]
        if (data2) {
            //创建时间 2022-07-28 15:01:53
            let create_time = getFormatDate()
            let status = 2
            let order_type = 1
            pay.pay_time = create_time
            let child = await childOrderModel.create({ user_id, stock_id, status, goods_count, address_id,create_time, pay, order_type })
            pushHistory(child._id, status)
            let data = await orderManagementModel.create({ user_id, status, goods: [child._id], order_type, address_id, order_note, create_time, pay,show:1 })
            pushHistory(data._id, status)
            data2.users.push(user_id)
            data2.order_array.push(data._id)
            ++data2.part == data2.several ? data2.status = 1 : null
            let updateGroupOrder = await groupModel.updateMany({ _id: groupOrder_id }, data2)
            if (updateGroupOrder.n) {
                res.send({
                    meta: {
                        msg: '拼团成功',
                        status: 200,
                    }
                });
            } else {
                res.send({
                    meta: {
                        msg: '拼团失败',
                        status: 201
                    }
                });
            }
        } else {
            res.send({
                meta: {
                    msg: '参数有误,拼团订单id有误',
                    status: 202
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
//查找 通过拼团商品id
async function searchGroupOrder(req, res, next) {
    const { groupGoods_id } = req.body
    if (check_id(groupGoods_id)) {
        let data = await groupModel.find().populate({ path: 'stock_id', match: { groupId: groupGoods_id } }).populate({ path: "users",select: "nickname avatar -_id" }).exec()
        data = data.filter(item => item.stock_id)
        res.send({
            data,
            meta: {
                msg: '获取成功',
                status: 200
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
//查找 通过拼团订单id
async function searchOne(req, res, next) {
    const { _id } = req.body
    if (check_id(_id)) {
        let data = await groupModel.find({ _id }).populate({ path: 'stock_id' }).populate({ path: "users",select: "nickname avatar -_id" }).exec()
        if(data.length){
            res.send({
                data,
                meta: {
                    msg: '获取成功',
                    status: 200
                }
            });
        }else{
            res.send({
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
    join,
    searchGroupOrder,
    searchOne
}
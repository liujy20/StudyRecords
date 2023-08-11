require('../../model/usersModel')
require('../../model/stockModel')
require('../../model/goodsModel')
require('../../model/addressModel')
require('../../model/historyModel')


const orderManagementModel = require('../../model/orderManagementModel')
const childOrderModel = require('../../model/childOrderModel')
const historyModel = require('../../model/historyModel')
//util工具
const { check_string, check_number, check_array, check_id } = require('../../utils/checkType')
const { getTimeArray } = require('../../utils/dataUtils')

//获取全部&按条件搜索订单管理
async function getSearch(req, res, next) {
    let { order_type, status, pay_type, _id, user_id, dateLimit, limit, page } = req.query
    let code
    let data = await orderManagementModel.find({ show: 1 }, "status pay.pay_type pay.pay_actual pay.pay_time order_type create_time").populate('user_id', "nickname").populate({ path: 'goods', select: "goods_count -_id", populate: { path: "stock_id", select: "price img -_id", populate: { path: "goodsId", select: "title -_id" } } }).exec();
    if (data.length) {
        //修改返回数据的格式
        data = data.map(item => {
            let goods = item.goods.map(ele => {
                return {
                    img: ele.stock_id.img,
                    price: ele.stock_id.price,
                    title: ele.stock_id.goodsId.title,
                    goods_count: ele.goods_count
                }
            })
            return {
                pay: item.pay,
                goods,
                _id: item._id,
                user: item.user_id,
                status: item.status,
                order_type: item.order_type,
                create_time: item.create_time
            }
        })
        // //订单类型查询
        // if (order_type!="undefined") {
        //     check_number(order_type) ? data = data.filter(item => item.order_type == order_type) : code = 202
        // }
        // //订单状态查询
        // if (status!="undefined") {
        //     check_number(status) ? data = data.filter(item => item.status == status) : code = 202
        // }
        // //支付方式查询
        // if (pay_type!="undefined") {
        //     check_number(pay_type) ? data = data.filter(item => item.pay.pay_type == pay_type) : code = 202
        // }
        // //订单id查询
        // if (_id) {
        //     check_id(_id) ? data = data.filter(item => item._id == _id) : code = 202
        // }
        // //用户id查询
        // if (user_id) {
        //     check_id(user_id) ? data = data.filter(item => item.user._id == user_id) : code = 202
        // }
        // //时间查询
        // if (dateLimit) {
        //     if (check_string(dateLimit) || check_array(dateLimit)) {
        //         check_string(dateLimit) ? dateLimit = getTimeArray(dateLimit) : null
        //         check_array(dateLimit) ? data = data.filter(item => (+new Date(item.create_time)) >= (+new Date(dateLimit[0])) && (+new Date(item.create_time)) <= (+new Date(dateLimit[1]))) : code = 202
        //     } else {
        //         code = 202
        //     }
        // }
        // //分页
        page = page ? parseInt(page) : 1
        limit = limit ? parseInt(limit) : 20
        if (check_number(limit) && check_number(page)) {
            data = data.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        } else {
            code = 202
        }
        if (code == 202) {
            res.send({
                meta: {
                    msg: '参数错误',
                    status: 202
                }
            });
        } else {
            res.send({
                data,
                meta: {
                    msg: '获取成功',
                    status: 200
                }
            });
        }
    } else {
        res.send({
            meta: {
                msg: '获取失败',
                status: 201
            }
        });
    }
}
//获取订单管理单个订单
async function getOne(req, res, next) {
    const { _id } = req.query;
    if (check_id(_id)) {
        let data = await orderManagementModel.find({ _id }, "status pay create_time").populate('user_id', "nickname -_id").populate("goods", "goods_count -_id").populate("address_id", "-_id").exec()
        if (data.length) {
            data = data.map(item => {
                let address = { phone: item.address_id.phone, name: item.address_id.name, site: item.address_id.site, nickname: item.user_id.nickname }
                let goods_count = 0
                item.goods.map(ele => goods_count += ele.goods_count)
                return {
                    create_time: item.create_time,
                    address,
                    pay: item.pay,
                    goods_count,
                    order_id: item._id,
                    status: item.status
                }
            })
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
                    msg: '获取失败',
                    status: 201,
                }
            });
        }
    } else {
        res.send({
            meta: {
                msg: '参数有误',
                status: 202,
            }
        });
    }
}
//获得订单记录
async function getHistory(req, res, next) {
    const { _id } = req.query
    if (_id) {
        let data = await historyModel.find({ order_id: _id })
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
                status: 202,
            }
        });
    }
}
//获取&搜索收银订单
async function getCash(req, res, next) {
    let { _id, user, dateLimit, page, limit } = req.query
    let code
    let data = await childOrderModel.find({ status: { $nin: [1, -7] } }, "pay create_time").populate('user_id', "nickname -_id")
    if (data.length) {
        data = data.map(item => {
            return {
                pay_actual: item.pay.pay_actual,
                pay_integral: item.pay.pay_integral,
                pay_time: item.pay.pay_time,
                _id: item.id,
                user: item.user_id.nickname,
                create_time: item.create_time,
            }
        })
        //订单id搜索
        if (_id) {
            check_id(_id) ? data = data.filter(item => item._id == _id) : code = 202
        }
        //用户名搜索
        if (user) {
            check_string(user) ? data = data.filter(item => item.user == user) : code = 202
        }
        //时间查询
        if (dateLimit) {
            if (check_string(dateLimit) || check_array(dateLimit)) {
                check_string(dateLimit) ? dateLimit = getTimeArray(dateLimit) : null
                check_array(dateLimit) ? data = data.filter(item => (+new Date(item.create_time)) >= (+new Date(dateLimit[0])) && (+new Date(item.create_time)) <= (+new Date(dateLimit[1]))) : code = 202
            } else {
                code = 202
            }
        }
        //分页
        page ? null : page = 1
        limit ? null : limit = 20
        if (check_number(limit) && check_number(page)) {
            data = data.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        } else {
            code = 202
        }
        if (code == 202) {
            res.send({
                meta: {
                    msg: '参数错误',
                    status: 202
                }
            });
        } else {
            res.send({
                data,
                meta: {
                    msg: '获取成功',
                    status: 200
                }
            });
        }
    } else {
        res.send({
            meta: {
                msg: '获取失败',
                status: 201
            }
        });
    }
}
//获取&搜索售后订单
async function getAfterOrder(req, res, next) {
    let { _id, status, dateLimit, page, limit } = req.query
    let code
    let data = await childOrderModel.find({ status: { $in: [-1, -2, -3, -4, -5, -6] } }, "pay goods_count refund status after_note").populate('user_id', "nickname -_id").populate({ path: 'stock_id', select: "price img -_id", populate: { path: "goodsId", select: "title -_id" } })
    if (data.length) {
        //返回数据格式
        data = data.map(item => {
            return {
                _id: item._id,
                user: item.user_id.nickname,
                img: item.stock_id.img,
                title: item.stock_id.goodsId.title,
                count: item.refund.refund_count,
                price: item.stock_id.price,
                pay_actual: (item.pay.pay_actual / item.goods_count * item.refund.refund_count),
                refund_time: item.refund.refund_time,
                status: item.status,
                refund_note: item.refund.refund_note,
                after_note: item.after_note

            }
        })
        //订单id查询
        if (_id) {
            check_id(_id) ? data = data.filter(item => item._id == _id) : code = 202
        }
        //订单状态查询
        if (status) {
            check_number(status) ? data = data.filter(item => item.status == status) : code = 202
        }
        //退款时间查询
        if (dateLimit) {
            if (check_string(dateLimit) || check_array(dateLimit)) {
                check_string(dateLimit) ? dateLimit = getTimeArray(dateLimit) : null
                check_array(dateLimit) ? data = data.filter(item => (+new Date(item.refund.refund_time)) >= (+new Date(dateLimit[0])) && (+new Date(item.refund.refund_time)) <= (+new Date(dateLimit[1]))) : code = 202
            } else {
                code = 202
            }
        }
        //页码查询
        page ? null : page = 1
        limit ? null : limit = 20
        if (check_number(limit) && check_number(page)) {
            data = data.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        } else {
            code = 202
        }
        if (code == 202) {
            res.send({
                meta: {
                    msg: '参数错误',
                    status: 202
                }
            });
        } else {
            res.send({
                data,
                meta: {
                    msg: '获取成功',
                    status: 200
                }
            });
        }
    } else {
        res.send({
            meta: {
                msg: '获取失败',
                status: 201
            }
        });
    }

}
//获取售后订单单个订单
async function getAfterOrderOne(req, res, next) {
    const { _id } = req.query
    if (check_id(_id)) {
        let data = await childOrderModel.find({ _id }).populate('user_id', "nickname -_id").populate("stock_id", "-_id").populate("address_id", "-_id").exec()
        if (data.length) {
            data = data.map(item => {
                let address = { phone: item.address_id.phone, name: item.address_id.name, site: item.address_id.site, nickname: item.user_id.nickname }
                return {
                    create_time: item.create_time,
                    address,
                    goods_count: item.goods_count,
                    after_note: item.after_note,
                    refund: item.refund,
                    pay: item.pay,
                    order_id: item._id,
                    status: item.status
                }
            })
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
                    msg: '获取失败',
                    status: 201,
                }
            });
        }
    } else {
        res.send({
            meta: {
                msg: '参数有误',
                status: 202,
            }
        });
    }
}
//修改售后备注信息
async function updateAfterOrder(req, res, next) {
    const { _id, after_note } = req.body
    if (check_id(_id) && check_string(after_note)) {
        let data = await childOrderModel.updateMany({ _id }, { after_note })
        if (data.nModified) {
            res.send({
                meta: {
                    msg: '修改成功',
                    status: 200,
                }
            });
        } else {
            res.send({
                meta: {
                    msg: '修改失败',
                    status: 201,
                }
            });
        }
    } else {
        res.send({
            meta: {
                msg: '参数有误',
                status: 202,
            }
        });
    }
}
//修改订单管理订单
async function getUpdate(req, res, next) {
    //_id、status、note
    //status  可修改为确认付款、已发货、已收货、已核销
    //note 订单备注
    //pay_actual, pay_integral 实付金额和赠送积分
    const { _id, pay_actual, pay_integral, status, note } = req.body
    let code
    let data
    if (check_id(_id)) {
        let mainOrder = await orderManagementModel.find({ _id })
        mainOrder = mainOrder[0]
        //更改实际支付和积分
        if (pay_actual && pay_integral) {
            if (check_number(pay_actual) && check_number(pay_integral)) {
                mainOrder.goods.length == 1 ? await childOrderModel.updateMany({ _id: mainOrder.goods[0] }, { "pay.pay_actual": pay_actual, "pay.pay_integral": pay_integral }) : null
                data = await orderManagementModel.updateMany({ _id }, { "pay.pay_actual": pay_actual, "pay.pay_integral": pay_integral })
            } else {
                code = 202
            }
        }
        //更改状态
        if (status) {
            if (check_number(status)) {
                mainOrder.goods.map(async item => {
                    await childOrderModel.updateMany({ _id: item }, { status })
                })
                data = await orderManagementModel.updateMany({ _id }, { status })
            } else {
                code = 202
            }
        }
        if (note) {
            check_string(note) ? data = await orderManagementModel.updateMany({ _id }, { note }) : code = 202
        }
        if (code == 202) {
            res.send({
                meta: {
                    msg: '参数有误',
                    status: 202
                }
            })
        } else if (data.nModified) {
            pushHistory(_id, status)
            res.send({
                meta: {
                    msg: '修改成功',
                    status: 200
                }
            })
        } else {
            res.send({
                meta: {
                    msg: '修改失败',
                    status: 201
                }
            })
        }
    } else {
        res.send({
            meta: {
                msg: '参数有误,订单号有误',
                status: 202
            }
        });
    }
}
//删除订单管理订单
async function deleteOne(req, res, next) {
    const { _id } = req.body
    if (check_id(_id)) {
        let mainOrder = await orderManagementModel.find({ _id })
        mainOrder = mainOrder[0]
        if(mainOrder.status==-7){
            await orderManagementModel.updateMany({ _id }, { show:0 })
            res.send({
                meta: {
                    msg: '删除成功',
                    status: 200
                }
            }); 
        }else{
            res.send({
                meta: {
                    msg: '无法删除用户未删除订单',
                    status: 201
                }
            }); 
        }
    } else {
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
    getOne,
    getSearch,
    deleteOne,
    getCash,
    getAfterOrder,
    getAfterOrderOne,
    updateAfterOrder,
    getUpdate,
    getHistory
}
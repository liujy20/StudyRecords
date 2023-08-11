const groupOrderModel = require('../../model/groupOrderModel')
require("../../model/goodsModel")
// const orderManagementModel = require('../../model/orderManagementModel')
// const childOrderModel = require('../../model/childOrderModel')
// const historyModel = require('../../model/historyModel')
// const stockModel = require('../../model/stockModel')

const { check_string, check_number, check_array, check_id } = require('../../utils/checkType')
const { getTimeArray } = require('../../utils/dataUtils')


//查找全部&条件搜索全部订单
async function getSearch(req, res, next) {
    let { dateLimit, status, limit, page } = req.body
    page ? null : page = 1
    limit ? null : limit = 20
    let code = 200
    let result = await groupOrderModel.find({}, "create_time several part end_time status").populate({ path: 'stock_id', select: "groupId -_id", populate: ({ path: "groupId", select: "title -_id" }) }).populate({ path: "users", select: "nickname avatar -_id" }).exec()
    let allGroup = result.length
    let allPeople = 0
    result = result.map((item) => {
        allPeople += item.users.length
        return {
            user: item.users[0],
            _id: item._id,
            create_time: item.create_time,
            several: item.several,
            part: item.part,
            end_time: item.end_time,
            title: item.stock_id.groupId.title,
            status: item.status
        }
    })
    //订单状态查询
    if (status!="undefined") {
        check_number(status) ? result = result.filter(item => item.status == status) : code = 202
    }
    //时间查询
    if (dateLimit) {
        if (check_string(dateLimit) || check_array(dateLimit)) {
            check_string(dateLimit) ? dateLimit = getTimeArray(dateLimit) : null
            check_array(dateLimit) ? result = result.filter(item => (+new Date(item.create_time)) >= (+new Date(dateLimit[0])) && (+new Date(item.create_time)) <= (+new Date(dateLimit[1]))) : code = 202
        } else {
            code = 202
        }
    }
    //分页
    if(check_number(limit)&&check_number(page)){
        result = result.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    }else{
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
            data: { allGroup, allPeople, result },
            meta: {
                msg: '获取成功',
                status: 200
            }
        });
    }
}
//查询单个拼团订单
async function getOne(req, res, next) {
    let { _id } = req.body
    if (check_id(_id)) {
        let result = await groupOrderModel.find({ _id }, "price -_id").populate({ path: "order_array", select: "status" }).populate({ path: "users", select: "nickname avatar -_id" }).exec()
        if(result.length){
            let data = result[0].users.map((item, index) => {
                return {
                    nickname: item.nickname,
                    avatar: item.avatar,
                    order_array: result[0].order_array[index]._id,
                    status: result[0].order_array[index].status,
                    price: result[0].price
                }
            })
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
                msg: '参数错误',
                status: 202
            }
        });
    }
}

module.exports = {
    getSearch,
    getOne
}
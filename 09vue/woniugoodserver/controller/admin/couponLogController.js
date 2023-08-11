const couponLogModel = require('../../model/couponLogModel')
require('../../model/couponModel')
require('../../model/usersModel')
const { check_number } = require('../../utils/checkType')

//获取领取记录
module.exports.get = async function (req, res, next) {
    const params = req.body
    console.log(params)
    let couponLogCondition = {show:true}
    
    if(params.state){
        couponLogCondition = {show:true,state:params.state}
    }
    let data = []
    try {
        data = await couponLogModel.find(couponLogCondition).populate('userId').populate('couponId')

    } catch (error) {
        console.log(error);
        console.log('获取领取记录');
        res.send({
            meta: {
                msg: '获取领取记录,参数有误',
                status: 202,
            }
        });
        return false;
    } 
    if (data.length) {
        let arr = data.filter(value=> value.couponId.title.indexOf(params.title) >=0 && value.userId.nickname.indexOf(params.nickname) >=0)
        //分页
        if (check_number(params.limit) && check_number(params.page)) {
            arr = arr.filter((item, index) => index < params.limit * params.page && index >= params.limit * (params.page - 1))
        } else if(params.limit && params.page) {
            res.send({
                meta: {
                    msg: 'limit,page参数错误',
                    status: 202
                }
            });
            return false
        }
        res.send({
            data:arr,
            meta: {
                msg: '查询成功',
                status: 200
            }
        });
        return false;
    } else {
        res.send({
            meta: {
                msg: '查询失败',
                status: 201
            }
        });
        return false;
    }
}
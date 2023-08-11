const couponLogModel = require('../../model/couponLogModel')
require('../../model/couponModel')

// 新增记录
module.exports.add = async function (req, res, next) {
    const params = req.body
    params.create_time = new Date()
    if (params.userId && params.couponId) {
        let data = await couponLogModel.create(params)
        if (data) {
            res.send({
                meta: {
                    msg: '添加成功',
                    status: 200
                }
            });
            return false;
        } else {
            res.send({
                meta: {
                    msg: '添加失败',
                    status: 201
                }
            });
            return false;
        }
    }else{
        res.send({
            meta: {
                msg: '添加失败,参数错误（userId,couponId）',
                status: 202
            }
        });
        return false;
    }
}

//获取领取记录
module.exports.get = async function (req, res, next) {
    const params = req.body
    if(!params.userId || !params.state){
        res.send({
            meta: {
                msg: '参数有误',
                status: 202
            }
        });
        return false;  
    }
    let data = await couponLogModel.find(params).populate("couponId")
    if (data.length) {
        res.send({
            data,
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
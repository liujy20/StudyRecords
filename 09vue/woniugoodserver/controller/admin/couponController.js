const couponModel = require('../../model/couponModel')
const { check_number } = require('../../utils/checkType')

//添加
module.exports.add = async function (req, res, next) {
    const params = req.body
    if (params.title && params.receiveType && params.price && params.time.length && params.useTime && params.state) {
        params.create_time = new Date()
        let data
        try {
            data= await couponModel.create(params)

        } catch (error) {
            console.log(error);
            console.log('添加');
            res.send({
                meta: {
                    msg: '添加,参数有误',
                    status: 202,
                }
            });
            return false;
            
        }

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
    } else {
        res.send({
            meta: {
                msg: '参数有误(title,receiveType,price,time,useTime,status)',
                status: 202
            }
        });
        return false;
    }
}


//查询优惠券
module.exports.get = async function (req, res, next) {
    const params = req.body
    let condition = { show: true }
    //判断前端有传入参数就进行合并
    if (params.title) {
        condition = Object.assign({}, condition, { title: { $regex: params.title, $options: '$i' } })
    }
    if (params._id) {
        condition = Object.assign({}, condition, { _id: params._id })
    }
    if (params.state) {
        condition = Object.assign({}, condition, { state: params.state })
    }
    if (params.receiveType) {
        condition = Object.assign({}, condition, { receiveType: params.receiveType })
    }
    let data = []
    try {
        data = await couponModel.find(condition)

    } catch (error) {
        console.log(error);
        console.log('查询优惠券');
        res.send({
            meta: {
                msg: '查询优惠券,参数有误',
                status: 202,
            }
        });
        return false;
    }
    if (data.length) {
        //分页
        if (check_number(params.limit) && check_number(params.page)) {
            data = data.filter((item, index) => index < params.limit * params.page && index >= params.limit * (params.page - 1))
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
            data,
            meta: {
                msg: '查询成功',
                status: 200,

            }
        });
        return false;

    } else {
        res.send({
            meta: {
                msg: '查询失败，没有数据',
                status: 201
            }
        });
        return false;
    }
}


//修改
module.exports.set = async function (req, res, next) {
    const params = req.body
    if (params._id) {
        let data = {}
        try {
            data = await couponModel.updateOne({ _id: params._id }, params)
 
        } catch (error) {
            console.log(error);
            console.log('修改');
            res.send({
                meta: {
                    msg: '修改,参数有误',
                    status: 202,
                }
            });
            return false;
        }
        if (data.n == 1) {
            if (data.nModified == 1 && data.ok == 1) {
                res.send({
                    meta: {
                        msg: '修改成功',
                        status: 200
                    }
                });
                return false;
            } else {
                res.send({
                    meta: {
                        msg: '没有需要修改的数据',
                        status: 201
                    }
                });
                return false;
            }
        } else {
            res.send({
                meta: {
                    msg: '通过ID没有查到相关数据',
                    status: 202
                }
            });
            return false;
        }
    } else {
        res.send({
            meta: {
                msg: '修改失败，请传入商品ID和库存信息',
                status: 202
            }
        });
        return false;
    }
}


// 软删除
module.exports.delete = async function (req, res, next) {
    const params = req.body
    console.log(params)
    if (params._id) {
        let item = []
        try {
            item = await couponModel.find({ _id: params._id, show: true })

        } catch (error) {
            console.log(error);
            console.log('软删除');
            res.send({
                meta: {
                    msg: '删除,参数有误',
                    status: 202,
                }
            });
            return false;
        } 
        if (item.length) {
            if (item[0].system_data) {
                res.send({
                    meta: {
                        msg: '系统数据不能删除',
                        status: 201
                    }
                });
                return false;
            } else {
                let data = {}
                try {
                    data = await couponModel.updateOne({ _id: params._id }, { show: false });

                } catch (error) {
                    console.log(error);
                    console.log('软删除');
                    res.send({
                        meta: {
                            msg: '删除,参数有误',
                            status: 202,
                        }
                    });
                    return false;
                }
                if (data.nModified && data.ok) {
                    res.send({
                        meta: {
                            msg: '删除成功',
                            status: 200
                        }
                    });
                    return false;
                } else {
                    res.send({
                        meta: {
                            msg: '删除失败',
                            status: 201
                        }
                    });
                    return false;
                }

            }
        } else {
            res.send({
                meta: {
                    msg: 'ID参数有误,没有找到数据',
                    status: 202
                }
            });
            return false;
        }


    } else {
        res.send({
            meta: {
                msg: '请传入修改ID',
                status: 202
            }
        });
        return false;
    }

}
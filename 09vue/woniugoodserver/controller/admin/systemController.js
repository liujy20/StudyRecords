const systemModel = require('../../model/systemModel')
const Fn = require('../../utils/commonFn')
const { getFormatDate } = require('../../utils/dataUtils')


// 新增规则
module.exports.add = async function (req, res, next) {
    const params = req.body
    if (params.name && params.menuType) {
        params.create_time = getFormatDate()
        params.show = true
        let data
        try {

            data = await systemModel.create(params)
        } catch (error) {
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
                msg: '参数有误(name,menuType)',
                status: 202
            }
        });
        return false;
    }
}

// 查询规则
module.exports.get = async function (req, res, next) {
    const params = req.body
    let condition = { show: true }
    let isTrue = false
    //判断前端有传入参数就进行合并
    if (params._id) {
        condition = Object.assign({}, condition, { _id: params._id })
        isTrue = true
    }
    if (params.name) {
        condition = Object.assign({}, condition, { name: { $regex: params.name, $options: '$i' } })
        isTrue = true
    }
    if (params.menuType) {
        condition = Object.assign({}, condition, { menuType: params.menuType })
        isTrue = true
    }
    
    let data = []
    try {
        if(!params.roles){
            data = await systemModel.find(condition).sort({ 'sort': 1, create_time: 1 })
        }else{
            //查询多个
            
            let rolesArr = params.roles.split(',');console.log(rolesArr);
            data = await systemModel.find({_id:{$in:rolesArr}}).sort({ 'sort': 1, create_time: 1 });
            // console.log(data);
        }
    } catch (error) {
        console.log(error);
        console.log('查询规则');
        res.send({
            meta: {
                msg: '查询规则,参数有误',
                status: 202,
            }
        });
        return false;
    }
    if (data.length) {
        if (isTrue) {
            res.send({
                data,
                meta: {
                    msg: '查询成功',
                    status: 200,

                }
            });
            return false;
        } else {
            // console.log(data);
            let addlist = Fn.setTreeData(data)
            res.send({
                data: addlist,
                meta: {
                    msg: '查询成功,返回树形权限',
                    status: 200,

                }
            });
            return false;
        }

    } else {
        res.send({
            meta: {
                msg: '查询失败,没有数据',
                status: 201
            }
        });
        return false;
    }
}

// 修改规则
module.exports.set = async function (req, res, next) {
    const params = req.body
    if (params._id) {
        let item = []
        try {
            item = await systemModel.find({ _id: params._id })
        } catch (error) {
            console.log(error);
            console.log('修改规则');
            res.send({
                meta: {
                    msg: '修改,参数有误',
                    status: 202,
                }
            });
            return false;
        }
        if (item.length && item[0].system_data) {
            res.send({
                meta: {
                    msg: '系统数据不能修改',
                    status: 201
                }
            });
            return false;
        }


        let data = {}
        try {
            data = await systemModel.updateOne({ _id: params._id }, params);
        } catch (error) {
            console.log(error);
            console.log('修改规则');
            res.send({
                meta: {
                    msg: '修改规则,参数有误',
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
                msg: '请传入修改ID',
                status: 202
            }
        });
        return false;
    }

}


// 软删除
module.exports.delete = async function (req, res, next) {
    const params = req.body
    if (params._id) {
        let item = []
        try {
            item = await systemModel.find({ _id: params._id })
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
            console.log(item[0].system_data)
            if (item[0].system_data) {
                res.send({
                    meta: {
                        msg: '系统数据不能删除',
                        status: 201
                    }
                });
                return false;
            } else {
                let child = await systemModel.find({ pid: params._id, show: true })
                if (child.length) {
                    res.send({
                        meta: {
                            msg: '当前规则下还有子规则，不能删除',
                            status: 201
                        }
                    });
                    return false;
                } else {
                    let data = await systemModel.updateOne({ _id: params._id }, { show: false });
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
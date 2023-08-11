const systemUserModel = require('../../model/systemUserModel')
const systemModel = require('../../model/systemModel')
const Fn = require('../../utils/commonFn')
const { getFormatDate } = require('../../utils/dataUtils')
const { check_number } = require('../../utils/checkType')


// 新增角色
module.exports.add = async function (req, res, next) {
    const params = req.body
    console.log(params);
    if (params.roleName && params.status) {
        params.create_time = getFormatDate()
        params.show = true
        let data
        try {
            data = await systemUserModel.create(params)
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

// 查询角色
module.exports.get = async function (req, res, next) {
    const params = req.body
    let condition = { show: true }
    //判断前端有传入参数就进行合并
    if (params.roleName) {
        condition = Object.assign({}, condition, { roleName: { $regex: params.roleName, $options: '$i' } })
    }

    let data = []
    try {
        data = await systemUserModel.find(condition).sort({ 'sort': 1, create_time: 1 })
    } catch (error) {
        console.log(error);
        console.log('查询角色');
        res.send({
            meta: {
                msg: '查询角色,参数有误',
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
                msg: '查询失败,没有数据',
                status: 201
            }
        });
        return false;
    }
}

//编辑角色查询
module.exports.getbyId = async function (req, res, next) {
    const params = req.body
    if (!params._id) {
        res.send({
            meta: {
                msg: '请传入修改ID',
                status: 202
            }
        });
        return false;

    }
    let condition = { show: true, _id: params._id }
    let data = []
    let menu = []
    try {
        menu = await systemModel.find()
        data = await systemUserModel.find(condition).sort({ 'sort': 1, create_time: 1 })
    } catch (error) {
        console.log(error);
        console.log('查询分类');
        res.send({
            meta: {
                msg: '查询分类,参数有误',
                status: 202,
            }
        });
        return false;
    }

    if (data.length && menu.length) {
        menu = JSON.parse(JSON.stringify(menu))

        for (let m of menu) {
            if (!m.checked) {
                m['checked'] = false
            }
            for (let item of data[0].rules.split(',')) {
                if (item == m._id) {
                    m.checked = true
                }
            }
        }
        data = JSON.parse(JSON.stringify(data))
        let addlist = Fn.setTreeData(menu)
        data[0].menu = addlist

        res.send({
            data: data[0],
            meta: {
                msg: '查询成功',
                status: 200,

            }
        });
        return false;

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

// 修改角色
module.exports.set = async function (req, res, next) {
    const params = req.body
    if (params._id) {
        let data = {}
        try {
            data = await systemUserModel.updateOne({ _id: params._id }, params);
        } catch (error) {
            console.log(error);
            console.log('修改分类');
            res.send({
                meta: {
                    msg: '修改分类,参数有误',
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
            item = await systemUserModel.find({ _id: params._id })
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

                let data = await systemUserModel.updateOne({ _id: params._id }, { show: false });
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
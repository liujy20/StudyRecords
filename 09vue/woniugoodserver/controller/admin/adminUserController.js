const adminUserModel = require('../../model/adminUserModel')
const Fn = require('../../utils/commonFn')
const { getFormatDate } = require('../../utils/dataUtils')
const { check_number } = require('../../utils/checkType')
let jwt = require('jsonwebtoken');

module.exports.login = async function(req, res, next) {
    let { account, pwd } = req.body;
    let message = await adminUserModel.find({ account, pwd,status:true, show: true });
    if (message.length > 0) {
        let { _id, account } = message[0];
        let token = jwt.sign(
            {
                _id,
                account
            },//有效载荷
            'PRIVATE_KEY',
            { expiresIn: "1d" }
        );
        console.log('生成',token);
        res.send({ token: 'Bearer ' + token, code: 200, msg: '用户登录成功' });
    } else {
        res.send({ code: 201, msg: '用户登录失败' });
    }
}

 module.exports.getUserInfo = async function(req, res, next) {
    let data = req.headers.authorization;
    console.log('拿到的',data);
    try {
        if (data) {
            const token = data.split(' ')[1];
            if (token!=undefined) {
                const _id = jwt.verify(token, "PRIVATE_KEY");
                let user = await adminUserModel.find({ _id }).populate("roles");
                res.send({
                    code: 1,
                    userInfo:user[0],
                    message: '获取用户信息成功'
                }) 
            }else{
                res.send({
                    code: 0,
                    message: '用户信息获取失败，token 已失效'
                })
            }
        }
        
    } catch (error) {
        res.send({
            code: 0,
            message: '用户信息获取失败，token 解析失败'
        })
    }
}

// 新增账号
module.exports.add = async function (req, res, next) {
    const params = req.body
    console.log(params);
    if (params.account && params.phone&& params.pwd&& params.realName&& params.status) {
        let user 
        try {
            user = await adminUserModel.find({account:params.account})
        } catch (error) {
            res.send({
                meta: {
                    msg: '添加,参数有误',
                    status: 202,
                }
            });
            return false;

        }
        if(user.length){
            res.send({
                meta: {
                    msg: '该账号已经注册，请重新输入',
                    status: 202,
                }
            });
            return false;
        }
        params.create_time = getFormatDate()
        params.show = true
        let data
        try {
            data = await adminUserModel.create(params)
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

// 查询账号
module.exports.get = async function (req, res, next) {
    const params = req.body
    let condition = { show: true }
    //判断前端有传入参数就进行合并
    if (params.realName) {
        condition = Object.assign({}, condition, { $or: [
            { realName: { $regex: params.realName, $options: '$i' } },
            { account: { $regex: params.realName, $options: '$i' } },
        ] })
    }
    if (params.roles) {
        condition = Object.assign({}, condition, { roles:{$elemMatch:{$eq:params.roles}} })
    }

    if (params.status) {
        condition = Object.assign({}, condition, { status: params.status })
    }

    let data = []
    try {
        data = await adminUserModel.find(condition).populate('roles').sort({ 'sort': 1, create_time: 1 })
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


// 修改账号
module.exports.set = async function (req, res, next) {
    const params = req.body
    if (params._id) {
        let user 
        try {
            user = await adminUserModel.find({account:params.account})
        } catch (error) {
            res.send({
                meta: {
                    msg: '查询账号参数有误',
                    status: 202,
                }
            });
            return false;

        }
        if(user.length && user[0]._id != params._id){
            res.send({
                meta: {
                    msg: '该账号已经存在，请重新输入',
                    status: 202,
                }
            });
            return false;
        }
        let data = {}
        try {
            data = await adminUserModel.updateOne({ _id: params._id }, params);
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
            item = await adminUserModel.find({ _id: params._id })
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

                let data = await adminUserModel.updateOne({ _id: params._id }, { show: false });
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


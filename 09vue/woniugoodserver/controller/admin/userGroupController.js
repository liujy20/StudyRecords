const userGroupModel = require("../../model/userGroupModel")
const { check_number, check_id, check_string } = require('../../utils/checkType');

//新增用户分组
async function add(req, res, next) {
    let { name } = req.body
    if (check_string(name) && name) {
        let data = await userGroupModel.create({ name });
        if (data) {
            res.send({
                meta: {
                    msg: '新增成功',
                    status: 200
                }
            })
        } else {
            res.send({
                meta: {
                    msg: '新增失败',
                    status: 201
                }
            })
        }
    } else {
        res.send({
            meta: {
                msg: '参数有误',
                status: 202
            }
        })
    }
}
//删除用户分组
async function del(req, res, next) {
    let { _id } = req.body
    if (check_id(_id)) {
        let data = await userGroupModel.deleteMany({ _id })
        if (data.deletedCount) {
            res.send({
                meta: {
                    msg: '删除成功',
                    status: 200
                }
            })
        } else {
            res.send({
                meta: {
                    msg: '删除失败',
                    status: 201
                }
            })
        }
    } else {
        res.send({
            meta: {
                msg: '参数有误',
                status: 202
            }
        })
    }
}
//修改用户分组
async function update(req, res, next) {
    let { _id, name } = req.body
    if (check_id(_id) && name && check_string(name)) {
        let data = await userGroupModel.updateMany({ _id }, { name })
        if (data.nModified) {
            res.send({
                meta: {
                    status: 200,
                    msg: "修改成功"
                }
            })
        } else {
            res.send({
                meta: {
                    status: 201,
                    msg: "修改失败"
                }
            })
        }

    } else {
        res.send({
            meta: {
                status: 202,
                msg: "参数有误"
            }
        })
    }
}
//查询用户分组
async function find(req, res, next) {
    let { page, limit } = req.body
    let code
    let data = await userGroupModel.find({})
    if (data.length) {
        //分页
        page ? null : page = 1
        limit ? null : limit = 20
        if (check_number(limit) && check_number(page)) {
            data = data.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        } else {
            code = 202
        }
        if(code==202){
            res.send({
                meta: {
                    msg: '参数错误',
                    status: 202
                }
            });
        }else{
            res.send({
                data,
                meta: {
                    msg: '查询成功',
                    status: 200
                }
            });
        }
    } else {
        res.send({
            meta: {
                msg: '无数据',
                status: 201
            }
        });
    }
}
module.exports = {
    add,
    del,
    update,
    find
}
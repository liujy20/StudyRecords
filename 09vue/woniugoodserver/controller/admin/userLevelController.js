const userLevelModel = require('../../model/userLevelModel');
const { check_number, check_id, check_string } = require('../../utils/checkType');
const { getFormatDate } = require('../../utils/dataUtils')

//添加用户等级
async function addLevel(req, res, next) {
    let { discount, exp_num, explain, grade, icon, image, is_show, name } = req.body
    if (check_number(discount) && check_number(exp_num) && explain && check_string(explain) && check_number(grade) && icon && check_string(icon) && image && check_string(image) && name && check_string(name) && check_number(is_show)) {
        let add_time = getFormatDate()
        let data = await userLevelModel.create({ discount, exp_num, explain, grade, icon, image, is_show, name, add_time, is_del: 0 })
        res.send({
            meta: {
                msg: '添加成功',
                status: 200
            }
        })
    } else {
        res.send({
            meta: {
                msg: '参数有误',
                status: 202
            }
        })
    }
}
//查询用户等级
async function find(req, res, next) {
    let { is_show, name, page, limit } = req.body
    let code
    let data = await userLevelModel.find({ is_del: 0 })
    //显示查询
    if (is_show != "undefined") {
        check_number(is_show) ? data = data.filter(item => item.is_show == is_show) : code = 202
    }
    //名字查询
    if (name) {
        check_string(name) ? data = data.filter(item => item.name == name) : code = 202
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
}

//删除用户等级
async function del(req, res, next) {
    let { _id } = req.body
    if (check_id(_id)) {
        let data = await userLevelModel.updateMany({ _id }, { is_del: 1 })
        if (data.nModified) {
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
//修改用户等级
async function update(req, res, next) {
    let { _id, name, discount, exp_num, explain, grade, icon, image, is_show } = req.body
    if (check_id(_id) && name && check_string(name) && check_number(discount) && check_number(exp_num) && check_number(grade) && check_number(is_show) && explain && check_string(explain) && icon && check_string(icon) && image && check_string(image)) {
        let data = await userLevelModel.updateMany({ _id }, { name, discount, exp_num, explain, grade, icon, image, is_show })
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
module.exports = {
    addLevel,
    find,
    del,
    update
}
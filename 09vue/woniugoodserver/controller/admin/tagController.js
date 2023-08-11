const tagModel = require('../../model/tagModel');
const { check_number, check_id, check_string } = require('../../utils/checkType');

//添加用户一级&二级标签
async function add(req, res, next) {
    let { parent, name } = req.body
    let code
    if (check_id(parent) && check_string(name)) {
        let data = await tagModel.find({ parent })
        if (data.length > 0 && data[0].parent == "0") {
            code = 200
        } else {
            code = 201
        }
    } else if (parent == "0" && check_string(name)) {
        code = 200
    } else {
        code = 202
    }
    switch (code) {
        case 200:
            let one = await tagModel.create({ parent, name });
            res.send({
                data: one,
                meta: {
                    msg: '新增成功',
                    status: 200
                }
            })
            break;
        case 201:
            res.send({
                meta: {
                    msg: '无该一级标签',
                    status: 201
                }
            })
            break;
        default:
            res.send({
                meta: {
                    msg: '参数有误',
                    status: 202
                }
            })
            break;
    }
}
//删除用户标签
async function del(req, res, next) {
    let { _id } = req.body
    if (check_id(_id)) {
        let data = await tagModel.find({ _id });
        if (data.length > 0 && check_id(data[0].parent)) {
            let one = await tagModel.deleteMany({ _id })
            res.send({
                meta: {
                    msg: '删除成功',
                    status: 200
                }
            })
        } else {
            res.send({
                meta: {
                    msg: '无该标签或当前标签为一级标签',
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
//查找所有标签&一级标签&二级标签
async function find(req, res, next) {
    let { parent, page, limit } = req.body
    let code
    let data = await tagModel.find({})
    //查找一级&&二级标签
    if (parent) {
        if (parent == "0" || check_id(parent)) {
            data = data.filter(item => item.parent == parent)
            if(check_id(parent)){
                let massage = await tagModel.find({_id:parent})
                data = data.map(item=>{
                    return{
                        _id:item._id,
                        parent:massage[0].name,
                        name:item.name
                    }
                })
            }
        } else {
            code = 202
        }
    }else{
    //将数据处理为树状结构
    data = getTree(data)
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
                msg: '查询成功',
                status: 200
            }
        });
    }
}
//查找单个二级标签
async function findOne(req, res, next) {
    let { _id } = req.body
    if (check_id(_id)) {
        let data = await tagModel.find({ _id })
        res.send({
            data,
            meta: {
                status: 200,
                msg: "查询成功"
            }
        })
    } else {
        res.send({
            meta: {
                status: 202,
                msg: "参数有误"
            }
        })
    }
}
//修改
async function update(req, res, next) {
    let { _id, parent, name } = req.body
    if (check_id(_id) && check_id(parent) && check_string(name)) {
        let data = await tagModel.updateMany({ _id }, { parent, name })
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
//树状数据处理
function getTree(data) {
    //定义需要返回的树形结构数据
    let treeData = []
    //对传入数组进行遍历
    data.forEach(item => {
        let children = data.filter(i => i.parent == item._id)
        if (item.parent == "0") {
            treeData.push({
                _id: item._id,
                name: item.name,
                children
            })
        }
    });
    return treeData
}
module.exports = {
    add,
    del,
    find,
    findOne,
    update
}
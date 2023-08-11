const goodsCategoryModel = require('../../model/goodsCategoryModel')
const Fn = require('../../utils/commonFn')



// 查询所有显示的数据
module.exports.getAll = async function (req, res, next) {

    let data = await goodsCategoryModel.find({ show: true, state: true }).sort({ 'sort': 1, create_time: 1 })
    if (data) {

        let addlist = Fn.setTreeData(data)
        res.send({
            data: addlist,
            meta: {
                msg: '查询成功',
                status: 200,
            }
        });
    } else {
        res.send({
            meta: {
                msg: '查询失败',
                status: 201
            }
        });
    }
}

// 查询一级分类
module.exports.getOne = async function (req, res, next) {
    let data = await goodsCategoryModel.find({ show: true, state: true, pid: '0' }).sort({ 'sort': 1, create_time: 1 })
    if (data) {
        res.send({
            data,
            meta: {
                msg: '查询成功',
                status: 200,
            }
        });
    } else {
        res.send({
            meta: {
                msg: '查询失败',
                status: 201
            }
        });
    }
}

//获取二级分类
module.exports.getTwo = async function (req, res, next) {
    const params = req.body
    let data = await goodsCategoryModel.find({ show: true, state: true, pid: params._id }).sort({ 'sort': 1, create_time: 1 })
    if (data) {
        res.send({
            data,
            meta: {
                msg: '查询成功',
                status: 200,
            }
        });
    } else {
        res.send({
            meta: {
                msg: '查询失败',
                status: 201
            }
        });
    }
}
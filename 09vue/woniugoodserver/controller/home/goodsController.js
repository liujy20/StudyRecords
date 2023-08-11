const goodsModel = require('../../model/goodsModel')
const stockModel = require('../../model/stockModel')
const goodsCategoryModel = require('../../model/goodsCategoryModel')



//获取商品
module.exports.getGoods = async function (req, res, next) {
    const params = req.body
    let goodsCategoryIdArr = []
    //通过分类ID获取商品
    if (params.goodsCategoryId) {
        let goodsCategorys = await goodsCategoryModel.find({ show: true, pid: params.goodsCategoryId })
        if (goodsCategorys.length) {
            for (let item of goodsCategorys) {
                goodsCategoryIdArr.push(item._id)
            }
        } else {
            let goodsCategory = await goodsCategoryModel.find({ show: true, _id: params.goodsCategoryId })
            if (goodsCategory.length) {
                if (goodsCategory[0].pid != '0') {
                    goodsCategoryIdArr.push(goodsCategory[0]._id)
                } else {
                    res.send({
                        meta: {
                            msg: '查询失败,该分类没有二级分类',
                            status: 202,
                        }
                    });
                }
            } else {
                res.send({
                    meta: {
                        msg: '查询失败,分类ID有误',
                        status: 202,
                    }
                });
            }
        }
    }
    let condition = { show: true, state: true }
    //判断前端有传入参数就进行合并
    if (goodsCategoryIdArr.length) {
        condition = Object.assign({}, condition, { goodsCategoryId: { $in: goodsCategoryIdArr } })
    }
    if (params.marketing) {
        condition = Object.assign({}, condition, { marketing: { $regex: params.marketing, $options: '$i' } })
    }
    if (params._id) {
        condition = Object.assign({}, condition, { _id: params._id })
    }
    let data = await goodsModel.find(condition).sort({ 'sort': 1, create_time: 1 })

    if (data) {
        let dataArr = []
        for (let item of data) {
            dataArr.push(
                stockModel.find({ show: true, goodsId: item._id }).then(value => {
                    item.stocks = value
                    let stock = 0
                    for (let i of value) {
                        stock += parseInt(i.stock)
                    }
                    item.stock = stock
                    return false
                }
                ).catch(value => {
                    return true
                })
            )
        }
        let pramiseAll = Promise.all(dataArr)
        pramiseAll.then(value => {
            for (let item of value) {
                if (item) {
                    res.send({
                        meta: {
                            msg: '库存信息查询失败',
                            status: 201
                        }
                    });
                    return false;
                }
            }


            res.send({
                data,
                meta: {
                    msg: '查询成功',
                    status: 200,

                }
            });


        })
    } else {

        res.send({
            meta: {
                msg: '查询失败',
                status: 201
            }
        });
    }
}


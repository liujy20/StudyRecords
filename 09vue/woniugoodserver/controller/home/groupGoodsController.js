const stockModel = require('../../model/stockModel')
const groupGoodsModel = require('../../model/groupGoodsModel')





// 获取拼团商品
module.exports.get = async function (req, res, next) {
    const params = req.body
    let condition = { show: true,state:true}
    //判断前端有传入参数就进行合并
    if (params.title) {
        condition = Object.assign({}, condition, { title: { $regex: params.title, $options: '$i' } })
    }
    if (params._id) {
        condition = Object.assign({}, condition, { _id: params._id })
    }
    if(params.goodsId){
        condition = Object.assign({}, condition, { goodsId: params.goodsId }) 
    }
    let data = await groupGoodsModel.find(condition).sort({ 'sort': 1, create_time: 1 })
    if (data.length) {
        let dataArr = []
        for (let item of data) {
            dataArr.push(
                stockModel.find({ show: true, goodsId: item.goodsId }).then(value => {
                    item.stocks = value
                    let stock = 0
                    for (let i of value) {
                        if (i.group) {
                            stock += parseInt(i.groupStock)
                        }
                    }
                    item.groupStock = stock
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
            return false;


        })
    } else {
        res.send({
            meta: {
                msg: '查询失败,没有数据',
                status: 202
            }
        });
        return false;
    }
}

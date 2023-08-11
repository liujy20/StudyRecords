const stockModel = require('../../model/stockModel')
const groupGoodsModel = require('../../model/groupGoodsModel')

//引入util文件
const { getFormatDate, addFormatDate } = require('../../utils/dataUtils')
const { check_number } = require('../../utils/checkType')

//添加拼团商品
// 先查询该商品是否有拼团，如果有就让用户修改原有的拼团商品
module.exports.add = async function (req, res, next) {
    const params = req.body
    params.create_time = getFormatDate()
    if (params.stocks.length && params.goodsId && params.title) {
        let groupGoods = []
        try {
            groupGoods = await groupGoodsModel.find({ goodsId: params.goodsId, show: true })

        } catch (error) {
            console.log(error);
            console.log('添加拼团商品');
            res.send({
                meta: {
                    msg: '添加拼团商品,参数有误',
                    status: 202,
                }
            });
            return false;
        }
        if (groupGoods.length) {
            res.send({
                meta: {
                    msg: '添加失败，该拼团商品已经存在，请直接编辑',
                    status: 201
                }
            });
            return false;
        } else {
            let data = {}
            try {
                data = await groupGoodsModel.create(
                    {
                        aging: params.aging,
                        content: params.content,
                        freight: params.freight,
                        goodsId: params.goodsId,
                        intro: params.intro,
                        logistics: params.logistics,
                        mainImg: params.mainImg,
                        num: params.num,
                        peopleNum: params.peopleNum,
                        peopleNumMoke: params.peopleNumMoke,
                        show: params.show,
                        slider_image: params.slider_image,
                        sort: params.sort,
                        state: params.state,
                        system_data: params.system_data,
                        time: params.time,
                        title: params.title,
                        total: params.total,
                        create_time: params.create_time
                    }

                );
            } catch (error) {
                console.log(error);
                console.log('添加拼团商品2');
                res.send({
                    meta: {
                        msg: '添加拼团商品2,参数有误',
                        status: 202,
                    }
                });
                return false;
            }
            if (data._id) {

                let promiseArr = []
                params.stocks.forEach((item) => {
                    promiseArr.push(
                        setStock(item, data._id)
                    )
                })
                send(promiseArr, 0, params, res, data._id)

            } else {
                res.send({
                    meta: {
                        msg: '添加失败，拼团商品录入失败',
                        status: 201
                    }
                });
                return false;
            }
        }
    } else {
        res.send({
            meta: {
                msg: '添加失败,参数错误（stocks,goodsId,title）',
                status: 202
            }
        });
        return false;
    }
}


// 修改商品库存
function setStock(item, _id) {
    stockModel.updateOne({ _id: item._id }, {
        groupPrice: item.groupPrice,
        groupStock: item.groupStock,
        group: item.group,
        groupId: _id

    }).then(value => {
        return false
    }).catch(value => {
        return true
    })
}

// 判断是否全部新增成功
function send(promiseArr, stop, params, res, _id) {
    if (stop >= 4) {
        res.send({
            meta: {
                msg: '添加失败，部分库存录入失败',
                status: 201
            }
        });
        return false;
    }
    stop++
    const pAll = Promise.all(promiseArr)
    pAll.then(value => {
        let valueArr = []
        value.forEach((item, index) => {
            if (item) {
                valueArr.push(
                    setStock(params.stocks[index], _id)
                )
            }
        })
        if (valueArr.length) {
            send(valueArr, stop, params, res, _id)
        } else {
            res.send({
                meta: {
                    msg: '操作成功',
                    status: 200
                }
            });
            return false;
        }
    })
}

// 修改拼团商品
module.exports.set = async function (req, res, next) {
    const params = req.body
    if (params.stocks.length && params._id) {
        let data = {}
        try {
            data = await groupGoodsModel.updateOne(
                { _id: params._id },
                {
                    aging: params.aging,
                    content: params.content,
                    freight: params.freight,
                    intro: params.intro,
                    logistics: params.logistics,
                    mainImg: params.mainImg,
                    num: params.num,
                    peopleNum: params.peopleNum,
                    peopleNumMoke: params.peopleNumMoke,
                    slider_image: params.slider_image,
                    sort: params.sort,
                    state: params.state,
                    time: params.time,
                    title: params.title,
                    total: params.total,
                }

            );
        } catch (error) {
            console.log(error);
            console.log('修改拼团商品');
            res.send({
                meta: {
                    msg: '修改拼团商品,参数有误',
                    status: 202,
                }
            });
            return false;
        }

        if (data.n == 1) {
            let promiseArr = []
            params.stocks.forEach((item) => {
                promiseArr.push(
                    setStock(item)
                )
            })
            send(promiseArr, 0, params, res)
        } else {
            res.send({
                meta: {
                    msg: '修改失败，通过ID没有查到相关数据',
                    status: 201
                }
            });
            return false;
        }
    } else {
        res.send({
            meta: {
                msg: '修改失败，请传入拼团商品ID和库存信息',
                status: 202
            }
        });
        return false;
    }
}



// 获取拼团商品
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
    let data = []
    try {
        data = await groupGoodsModel.find(condition).sort({ 'sort': 1, create_time: 1 })

    } catch (error) {
        console.log(error);
        console.log('获取拼团商品');
        res.send({
            meta: {
                msg: '获取拼团商品,参数有误',
                status: 202,
            }
        });
        return false;
    }
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


//删除商品
module.exports.delete = async function (req, res, next) {
    const params = req.body
    if (params._id) {
        let data = []
        try {
            data = await groupGoodsModel.find({ _id: params._id, show: true })

        } catch (error) {
            console.log(error);
            console.log('删除商品');
            res.send({
                meta: {
                    msg: '删除商品,参数有误',
                    status: 202,
                }
            });
            return false;
        }
        if (data.length) {

            if (data[0].system_data) {
                res.send({
                    meta: {
                        msg: '系统数据不能删除',
                        status: 201
                    }
                });
                return false;
            } else {

                let _delete = {}
                try {
                    _delete = await groupGoodsModel.updateOne({ _id: params._id }, { show: false });
                } catch (error) {
                    console.log(error);
                    console.log('删除商品2');
                    res.send({
                        meta: {
                            msg: '删除商品2,参数有误',
                            status: 202,
                        }
                    });
                    return false;
                }
                if (_delete.nModified && _delete.ok) {
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
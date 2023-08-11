const goodsModel = require('../../model/goodsModel')
const stockModel = require('../../model/stockModel')
const goodsCategoryModel = require('../../model/goodsCategoryModel')


//引入util文件
const { getFormatDate, addFormatDate } = require('../../utils/dataUtils')
const { check_number } = require('../../utils/checkType')

// 新增物品
module.exports.add = async function (req, res, next) {
    const params = req.body
    params.create_time = getFormatDate()
    if (params.stock.length && params.slider_image.length && params.title) {
        let data = {}
        try {
            data = await goodsModel.create(

                {
                    content: params.content,
                    create_time: params.create_time,
                    freight: params.freight,
                    goodsCategoryId: params.goodsCategoryId,
                    logistics: params.logistics,
                    marketing: params.marketing,
                    sales: params.sales,
                    salesMock: params.salesMock,
                    show: params.show,
                    slider_image: params.slider_image,
                    sort: params.sort,
                    state: params.state,
                    system_data: params.system_data,
                    title: params.title,
                    type: params.type,
                    unit_name: params.unit_name,
                    video_link: params.video_link,
                }

            );
        } catch (error) {
            console.log(error);
            console.log('新增物品');
            res.send({
                meta: {
                    msg: '新增物品,参数有误',
                    status: 202,
                }
            });
            return false;
        }

        if (data._id) {

            let promiseArr = []
            params.stock.forEach((item) => {
                promiseArr.push(
                    addStock(item, params, data._id)
                )
            })
            send(promiseArr, 0, params, data._id, res)


        } else {
            res.send({
                meta: {
                    msg: '添加失败，商品录入失败',
                    status: 201
                }
            });
            return false;
        }

    } else {
        res.send({
            meta: {
                msg: '添加失败,参数错误（stock,slider_image,title）',
                status: 202
            }
        });
        return false;
    }
}

// 新增商品库存
function addStock(item, params, _id) {
    stockModel.create({
        specification: item.specification,
        img: params.slider_image[0],
        price: item.price,
        original: item.original,
        cost: item.cost,
        stock: item.stock,
        goodsId: _id,
        weight: item.weight,
        volume: item.volume,
        create_time: params.create_time,
        show: item.show,
        system_data: item.system_data
    }).then(value => {
        return false
    }).catch(value => {
        return true
    })
}

// 判断是否全部新增成功
function send(promiseArr, stop, params, _id, res) {
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
                    addStock(params.stock[index], params, _id)
                )
            }
        })
        if (valueArr.length) {
            send(valueArr, stop, params)
        } else {
            res.send({
                meta: {
                    msg: '添加成功',
                    status: 200
                }
            });
            return false;
        }
    })
}

//获取商品
module.exports.getGoods = async function (req, res, next) {
    const params = req.body
    let goodsCategoryIdArr = []
    if (params.goodsCategoryId) {
        let goodsCategorys = []
        try {
            goodsCategorys = await goodsCategoryModel.find({ show: true, pid: params.goodsCategoryId })

        } catch (error) {
            console.log(error);
            console.log('获取商品1');
            res.send({
                meta: {
                    msg: '获取商品,参数有误',
                    status: 202,
                }
            });
            return false;
        }
        if (goodsCategorys.length) {
            for (let item of goodsCategorys) {
                goodsCategoryIdArr.push(item._id)
            }
        } else {
            let goodsCategory = []
            try {
                goodsCategory = await goodsCategoryModel.find({ show: true, _id: params.goodsCategoryId })

            } catch (error) {
                console.log(error);
                console.log('获取商品2');
                res.send({
                    meta: {
                        msg: '获取商品2,参数有误',
                        status: 202,
                    }
                });
                return false;
            }
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
                    return false;
                }
            } else {
                res.send({
                    meta: {
                        msg: '查询失败,分类ID有误',
                        status: 202,
                    }
                });
                return false;
            }
        }
    }
    let condition = { show: true }
    //判断前端有传入参数就进行合并
    if (goodsCategoryIdArr.length) {
        condition = Object.assign({}, condition, { goodsCategoryId: { $in: goodsCategoryIdArr } })
    }
    if (params.title) {
        condition = Object.assign({}, condition, { title: { $regex: params.title, $options: '$i' } })
    }
    if (params._id) {
        condition = Object.assign({}, condition, { _id: params._id })
    }
    if (params.state) {
        condition = Object.assign({}, condition, { state: params.state })
    }
    if (params.show) {
        condition = Object.assign({}, condition, { show: params.show })
    }
    let data = []
    try {
        data = await goodsModel.find(condition).sort({ 'sort': 1, create_time: 1 })

    } catch (error) {
        console.log(error);
        console.log('获取商品3');
        res.send({
            meta: {
                msg: '获取商品3,参数有误',
                status: 202,
            }
        });
        return false;
    }

    if (data.length) {
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

            if (params.stock || params.stock === 0) {
                var stockData = data.filter((value) => {
                    return parseInt(value.stock) <= params.stock
                })

                //分页
                if (check_number(params.limit) && check_number(params.page)) {
                    console.log(1);
                    stockData = stockData.filter((item, index) => index < params.limit * params.page && index >= params.limit * (params.page - 1))
                }else if(params.limit && params.page) {
                    res.send({
                        meta: {
                            msg: 'limit,page参数错误',
                            status: 202
                        }
                    });
                    return false
                }
                res.send({
                    data: stockData,
                    meta: {
                        msg: '查询成功',
                        status: 200,

                    }
                });
                return false;

            } else {
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
            }

        })
    } else {

        res.send({
            meta: {
                msg: '查询失败，没有数据',
                status: 201
            }
        });
        return false;
    }
}

//修改商品
module.exports.set = async function (req, res, next) {
    const params = req.body
    if (params._id && params.stocks.length) {

        // 修改商品信息
        let data = {}
        try {
            data = await goodsModel.updateOne({ _id: params._id }, {
                content: params.content,
                create_time: params.create_time,
                freight: params.freight,
                goodsCategoryId: params.goodsCategoryId,
                logistics: params.logistics,
                marketing: params.marketing,
                sales: params.sales,
                salesMock: params.salesMock,
                slider_image: params.slider_image,
                sort: params.sort,
                state: params.state,
                title: params.title,
                type: params.type,
                unit_name: params.unit_name,
                video_link: params.video_link,
            });

        } catch (error) {
            console.log(error);
            console.log('修改商品信息1');
            res.send({
                meta: {
                    msg: '修改商品1,参数有误',
                    status: 202,
                }
            });
            return false;
        }
        if (data.n == 1) {
            // 修改库存信息
            let Pall = []
            for (let item of params.stocks) {
                if (item._id) {
                    // 有ID修改
                    Pall.push(
                        stockModel.updateOne({ _id: item._id }, item).then(value => {
                            return false
                        }).catch(value => {
                            return true
                        })
                    )

                } else {
                    // 无ID新增
                    Pall.push(
                        stockModel.create({
                            specification: item.specification,
                            img: params.slider_image[0],
                            price: item.price,
                            original: item.original,
                            cost: item.cost,
                            stock: item.stock,
                            goodsId: params._id,
                            weight: item.weight,
                            volume: item.volume,
                            create_time: getFormatDate(),
                            show: item.show,
                            system_data: item.system_data
                        }).then(value => {
                            return false
                        }).catch(value => {
                            return true
                        })
                    )

                }
            }
            const pAll = Promise.all(Pall)
            pAll.then(value => {
                for (item of value) {
                    if (item) {
                        res.send({
                            meta: {
                                msg: '库存修改失败',
                                status: 201
                            }
                        });
                        return false;
                    }
                }
                res.send({
                    meta: {
                        msg: '修改成功',
                        status: 200
                    }
                });
                return false;
            })

        } else {
            res.send({
                meta: {
                    msg: '修改失败，通过ID没有查到相关数据',
                    status: 202
                }
            });
            return false;
        }


    } else {
        res.send({
            meta: {
                msg: '修改失败，请传入商品ID和库存信息',
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
            data = await goodsModel.find({ _id: params._id, show: true })

        } catch (error) {
            console.log(error);
            console.log('删除商品1');
            res.send({
                meta: {
                    msg: '删除商品1,参数有误',
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
                    _delete = await goodsModel.updateOne({ _id: params._id }, { show: false });

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
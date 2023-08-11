const goodsCategoryModel = require('../../model/goodsCategoryModel')
const Fn = require('../../utils/commonFn')

//引入util文件
const { getFormatDate, addFormatDate } = require('../../utils/dataUtils')
const { check_number } = require('../../utils/checkType')
// 添加分类
module.exports.add = async function (req, res, next) {
    const params = req.body
    if (params.title) {
        let data = ''
        try {
            data = await goodsCategoryModel.create(params);
        } catch (error) {
            console.log(error);
            console.log('添加分类');
            res.send({
                meta: {
                    msg: '添加分类,参数有误',
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
                msg: '参数有误(icon,img,sort,title)',
                status: 202
            }
        });
        return false;
    }


}

// 查询所有显示的数据
module.exports.getAll = async function (req, res, next) {
    const params = req.body
    let data = ''
    try {
        data = await goodsCategoryModel.find({ show: true }).sort({ 'sort': 1, create_time: 1 })
    } catch (error) {
        console.log(error);
        console.log('查询所有显示的数据');
        res.send({
            meta: {
                msg: '查询所显示的数据,参数有误',
                status: 202,
            }
        });
        return false;
    }
    if (data) {
        
        let addlist = Fn.setTreeData(data)
        //分页
        console.log(check_number(params.limit));
        if (check_number(params.limit) && check_number(params.page)) {
            addlist = addlist.filter((item, index) => index < params.limit * params.page && index >= params.limit * (params.page - 1))
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
            data: addlist,
            meta: {
                msg: '查询成功',
                status: 200,

            }
        });
        return false;
    } else {
        res.send({
            meta: {
                msg: '查询失败',
                status: 201
            }
        });
        return false;
    }
}

// 查询一级分类
module.exports.getOne = async function (req, res, next) {
    let data = ''
    try {
        data = await goodsCategoryModel.find({ show: true, pid: '0' }).sort({ 'sort': 1, create_time: 1 })

    } catch (error) {
        console.log(error);
        console.log('查询一级分类');
        res.send({
            meta: {
                msg: '查询一级分类,参数有误',
                status: 202,
            }
        });
        return false;
    }
    if (data) {
       
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
                msg: '查询失败',
                status: 201
            }
        });
        return false;
    }
}

// 查询分类
module.exports.getCategory = async function (req, res, next) {
    const params = req.body
    let condition = { show: true }
    //判断前端有传入参数就进行合并
    if (params.pid) {
        condition = Object.assign({}, condition, { pid: params.pid })
    }
    if (params.state) {
        condition = Object.assign({}, condition, { state: params.state })
    }
    if (params.title) {
        condition = Object.assign({}, condition, { title: { $regex: params.title, $options: '$i' } })
    }
    if (params._id) {
        condition = Object.assign({}, condition, { _id: params._id })
    }
    let data = []
    try {
        data = await goodsCategoryModel.find(condition).sort({ 'sort': 1, create_time: 1 })

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
    if (data.length) {

        let pidArr = new Set();
        let oneArr = [];
        for (let item of data) {
            if (item.pid != '0') {
                pidArr.add(item.pid)
            }
        }

        let oneData
        try {
            oneData = await goodsCategoryModel.find({ _id: { $in: [...pidArr] } }).sort({ 'sort': 1, create_time: 1 })
        } catch (error) {
            console.log(error);
            console.log('查询分类2');
            res.send({
                meta: {
                    msg: '查询分类2,参数有误',
                    status: 202,
                }
            });
            return false;
        }

        let addlist = Fn.setTreeData([...oneData, ...data])
        //分页
        if (check_number(params.limit) && check_number(params.page)) {
            addlist = addlist.filter((item, index) => index < params.limit * params.page && index >= params.limit * (params.page - 1))
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
            data: addlist,
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


// 修改分类
module.exports.set = async function (req, res, next) {
    const params = req.body

    if (params._id) {
        let data = {}
        try {
            data= await goodsCategoryModel.updateOne({ _id: params._id }, params);

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
            item = await goodsCategoryModel.find({ _id: params._id, show: true })
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
                let child = await goodsCategoryModel.find({ pid: params._id, show: true })
                if (child.length) {
                    res.send({
                        meta: {
                            msg: '当前分类下还有子分类，不能删除',
                            status: 201
                        }
                    });
                    return false;
                } else {
                    let data = await goodsCategoryModel.updateOne({ _id: params._id }, { show: false });
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
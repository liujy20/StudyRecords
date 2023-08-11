const stockModel = require('../../model/stockModel')

//删除库存
module.exports.delete = async function (req, res, next) {
    const params = req.body
    console.log(params)
    if (params._id) {
        let data = []
        try {
            data = await stockModel.find({ _id: params._id, show: true })

        } catch (error) {
            console.log(error);
            console.log('删除库存1');
            res.send({
                meta: {
                    msg: '删除库存1,参数有误',
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
                        _delete = await stockModel.updateOne({ _id: params._id }, { show: false });

                    } catch (error) {
                        console.log(error);
                        console.log('删除库存2');
                        res.send({
                            meta: {
                                msg: '删除库存2,参数有误',
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
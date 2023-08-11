const couponModel = require('../../model/couponModel')



//查询优惠券
module.exports.get = async function (req, res, next) {
    const params = req.body
    console.log(params)
    let condition = { show: true,state:true,receiveType: 1}
   
    let data = await couponModel.find(condition)
    if (data.length) {
        let nowDate = new Date()
        let arr = data.filter(item=> new Date(item.time[0]) <  nowDate && new Date(item.time[1]) > nowDate)
       
        res.send({
            data:arr,
            meta: {
                msg: '查询成功',
                status: 200,
            }
        });
        return false;

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


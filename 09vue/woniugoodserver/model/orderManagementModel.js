var { Schema, model, SchemaTypes } = require('mongoose');
//定义Schema
let orderManagementSchema = new Schema({
    // 用户id
    user_id: {
        type: SchemaTypes.ObjectId,
        ref: 'usersModel'
    },
    // 订单状态
    status: Number,
    // 商品id
    goods: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'childOrderModel'
        }
    ],
    // 支付
    pay: {
        pay_actual: Number,
        pay_integral: Number,
        pay_freight: Number,
        pay_type: Number,
        pay_time: String
    },
    // 订单创建时间
    create_time: String,
    order_type: Number,
    address_id: {
        type: SchemaTypes.ObjectId,
        ref: 'addressModel'
    },
    order_note: String,
    after_note:String,
    note:String,
    //软删除
    show:Number
})
//配置数据模型
//暴露模块
module.exports = model('orderManagementModel', orderManagementSchema, "orderManagement");
var { Schema, model ,SchemaTypes} = require('mongoose');
//定义Schema
let childOrderSchema = new Schema({
    user_id:{
        type: SchemaTypes.ObjectId,
        ref: 'usersModel'
    },
    stock_id:{
        type: SchemaTypes.ObjectId,
        ref: 'stockModel'
    },
    status:Number,
    goods_count:Number,
    create_time:String,
    pay: {
        pay_actual: Number,
        pay_integral: Number,
        pay_freight: Number,
        pay_type: Number,
        pay_time: String
    },
    order_type:Number,
    after_note:String,
    note:String,
    //退货
    refund:{
        refund_count:Number,
        refund_reason:String,
        refund_note:String,
        refund_imgs:Array,
        refund_time:String
    },
    address_id: {
        type: SchemaTypes.ObjectId,
        ref: 'addressModel'
    }
})
//配置数据模型
//暴露模块
module.exports = model('childOrderModel', childOrderSchema, "childOrder");
var { Schema, model, SchemaTypes } = require('mongoose');

//定义Schema
var groupOrderSchema = new Schema({
    users: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'usersModel'
        }
    ],
    price: Number,
    create_time:String,
    // order_status: Number,
    several: Number,
    part: Number,
    end_time: String,
    stock_id: {
        type: SchemaTypes.ObjectId,
        ref: 'stockModel'
    },
    status: Number,
    order_array: [{
        type: SchemaTypes.ObjectId,
        ref: 'orderManagementModel'
    }]
});
//配置数据模型
//暴露模块
module.exports = model('groupOrderModel', groupOrderSchema, "groupOrder");
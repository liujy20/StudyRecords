var { Schema, model ,SchemaTypes} = require('mongoose');
//定义Schema
let historySchema = new Schema({
    order_id: String,
    message:String,
    time:String
})
//配置数据模型
//暴露模块
module.exports = model('historyModel', historySchema, "history");
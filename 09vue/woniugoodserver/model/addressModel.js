var { Schema, model} = require('mongoose');
//定义Schema
let addressSchema = new Schema({
    phone:Number,
    name:String,
    site:String
})
//配置数据模型
//暴露模块
module.exports = model('addressModel', addressSchema, "address");
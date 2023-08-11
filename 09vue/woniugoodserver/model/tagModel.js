var { Schema, model ,SchemaTypes} = require('mongoose');
//定义Schema
let tagSchema = new Schema({
    parent:String,
    name:String
})
//配置数据模型
//暴露模块
module.exports = model('tagModel', tagSchema, "tag");
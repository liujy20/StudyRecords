var { Schema, model ,SchemaTypes} = require('mongoose');
//定义Schema
let userGroupSchema = new Schema({
    name:String
})
//配置数据模型
//暴露模块
module.exports = model('userGroupModel', userGroupSchema, "userGroup");
var { Schema, model ,SchemaTypes} = require('mongoose');
//定义Schema
let usersSchema = new Schema({
    nickname: String,
    real_name:String,
    avatar: String,
    birthday: String,
    phone: String,
    password:String,
    status: Number,
    address_id: [{
        type: SchemaTypes.ObjectId,
        ref: 'addressModel'
    }],
    isMember:Number,
    group_id:String,
    level:String,
    user_type:String,
    balance:String,
    country:String,
    sex:Number,
    is_promoter:Number,
    id_card:String,
    address:String,
    remarks:String,
    tag_id_array: [{
        type: SchemaTypes.ObjectId,
        ref: 'tagModel'
    }]
})
//配置数据模型
//暴露模块
module.exports = model('usersModel', usersSchema, "users");
var { Schema, model ,SchemaTypes} = require('mongoose');
//定义Schema
let userLevelSchema = new Schema({
    //添加时间
    add_time:String,
    //享受折扣
    discount:Number,
    //解锁经验
    exp_num:Number,
    //等级说明
    explain:String,
    //等级
    grade:Number,
    //图标
    icon:String,
    //用户等级背景
    image:String,
    //是否删除
    is_del:Number,
    //是否显示
    is_show:Number,
    //名字
    name:String,
})
//配置数据模型
//暴露模块
module.exports = model('userLevelModel', userLevelSchema, "userLevel");
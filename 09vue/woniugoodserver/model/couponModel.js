var {Schema,model}=require('mongoose');


//定义Schema  优惠券
var couponSchema = new Schema({
   
      /**
     * 创建时间
     */
    create_time: Date,
    /**
     * 金额
     */
    price: Number,
    /**
     * 发送方式，1.自己领取  2.新人劵
     */
    receiveType: String,
    /**
     * 软删除
     */
    show: Boolean,
    /**
     * 状态
     */
    state: Boolean,
    /**
     * 系统数据
     */
    system_data: Boolean,
    /**
     * 领取时间段
     */
    time: Array,
    /**
     * 标题
     */
    title: String,
    /**
     * 时效
     */
    useTime: Array,
   
}, { versionKey: false });
//配置数据模型
//暴露模块
module.exports = model('couponModel', couponSchema, "coupon");
var { Schema, model, SchemaTypes } = require('mongoose');


//定义Schema 优惠券领取记录
var couponLogSchema = new Schema({

      /**
       * 优惠券Id
       */
      couponId: {
            type: SchemaTypes.ObjectId,
            ref: 'couponModel'
      },
      /**
       * 领取时间
       */
      create_time: Date,
      /**
       * 软删除
       */
      show: Boolean,
      /**
       * 1.未使用 2.使用中 3.已使用 4.已过期
       */
      state: Number,
      /**
       * 系统数据
       */
      system_data: Boolean,
      /**
       * 用户ID
       */
       userId: {
            type: SchemaTypes.ObjectId,
            ref: 'usersModel'
        },

}, { versionKey: false });
//配置数据模型
//暴露模块
module.exports = model('couponLogModel', couponLogSchema, "couponLog");
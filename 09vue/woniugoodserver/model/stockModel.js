var { Schema, model, SchemaTypes } = require('mongoose');


//定义Schema 库存规格
var stockSchema = new Schema({
   
     /**
     * 成本价
     */
      cost: Number,
      /**
       * 创建时间
       */
      create_time: String,
      /**
       * 商品ID
       */
      goodsId: {
            type: SchemaTypes.ObjectId,
            ref: 'goodsModel'
      },
      /**
       * 图片，轮播图第一张
       */
      img: String,
      /**
       * 原价
       */
      original: Number,
      /**
       * 售价
       */
      price: Number,
      /**
       * 规格，多规格合并 显示在商品选择里面，例如香水：清新50ml，活力100ml
       */
      specification: String,
      /**
       * 库存
       */
      stock: Number,
      /**
       * 体积
       */
      volume: String,
      /**
       * 重量
       */
      weight: String,
      show:Boolean,
      system_data: Boolean,
      // 拼团价格
      groupPrice:Number,
      // 拼团库存
      groupStock:Number,
      // 是否参加拼团
      group:Boolean,
       /**
       * 拼团商品ID
       */
        groupId: {
            type: SchemaTypes.ObjectId,
            ref: 'groupGoodsModel'
      },
   
}, { versionKey: false });
//配置数据模型
//暴露模块
module.exports = model('stockModel', stockSchema, "stock");
var {Schema,model}=require('mongoose');

//定义Schema 拼团商品
var groupGoodsSchema = new Schema({
     /**
     * 时效
     */
      aging: Number,
      /**
       * 拼团详情
       */
      content: String,
      /**
       * 运费
       */
      freight: Number,
      /**
       * 商品ID
       */
      goodsId: String,
      /**
       * 简介
       */
      intro: String,
      /**
       * 物流设置，1（快递）2（到店核销）
       */
      logistics: String,
      /**
       * 主图
       */
      mainImg: String,
      /**
       * 用户每次限量
       */
      num: Number,
      /**
       * 拼团人数
       */
      peopleNum: Number,
      /**
       * 虚拟补齐人数
       */
      peopleNumMoke: Number,
      /**
       * 软删除
       */
      show: Boolean,
      /**
       * 轮播图
       */
      slider_image: Array,
      /**
       * 排序
       */
      sort: Number,
      /**
       * 状态，开始，关闭
       */
      state: Boolean,
      /**
       * 规格ID
       */
      stocks: Array,
      /**
       * 系统数据
       */
      system_data: Boolean,
      /**
       * 拼团时间
       */
      time: Array,
      /**
       * 标题
       */
      title: String,
      /**
       * 参团商品总数
       */
      total: Number,
      create_time:String,
      groupStock:Number
  
}, { versionKey: false });
//配置数据模型
//暴露模块
module.exports = model('groupGoodsModel', groupGoodsSchema, "groupGoods");
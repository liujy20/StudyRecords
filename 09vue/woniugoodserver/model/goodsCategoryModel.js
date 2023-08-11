var {Schema,model}=require('mongoose');


//定义Schema 商品分类
var goodsCategorySchema = new Schema({
   
      /**
     * 创建时间
     */
    create_time: String,
    /**
     * 分类小图，180*180
     */
    icon: String,
    /**
     * 分类大图，468*340
     */
    img: String,
    /**
     * 上级分类
     */
    pid:String,
    /**
     * 是否显示，软删除
     */
    show: Boolean,
    /**
     * 排序
     */
    sort: Number,
    /**
     * 上架状态
     */
    state: Boolean,
    /**
     * 系统数据，系统数据不能删除
     */
    system_data: Boolean,
    /**
     * 分类名称
     */
    title: String,
}, { versionKey: false });
//配置数据模型
//暴露模块
module.exports = model('goodsCategoryModel', goodsCategorySchema, "goodsCategory");
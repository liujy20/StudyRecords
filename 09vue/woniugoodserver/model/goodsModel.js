var {Schema,model}=require('mongoose');

//定义Schema 商品
var goodsSchema = new Schema({
   
     /**
     * 详情
     */
    content: String,
    /**
     * 创建时间
     */
    create_time: String,
    /**
     * 运费
     */
    freight: Number,
    /**
     * 商品分类Id
     */
    goodsCategoryId: String,
    /**
     * 物流设置
     */
    logistics: String,
    /**
     * 营销，【热卖单品，促销单品，精品推荐，首发新品，】
     */
    marketing: Array,
    /**
     * 销量
     */
    sales: Number,
    /**
     * 虚拟销量
     */
    salesMock: Number,
    /**
     * 软删除
     */
    show: String,
    /**
     * 轮播图，第一张作为主图
     */
    slider_image: Array,
    /**
     * 排序
     */
    sort: Number,
    /**
     * 状态，上架，下架
     */
    state: Boolean,
    /**
     * 系统数据
     */
    system_data: Boolean,
    /**
     * 商品名称
     */
    title: String,
    /**
     * 商品类型
     */
    type: String,
    /**
     * 单位
     */
    unit_name: String,
    /**
     * 视频
     */
    video_link: String,
    show: Boolean,
    stocks:Array,
    stock:String

   
}, { versionKey: false });
//配置数据模型
//暴露模块
module.exports = model('goodsModel', goodsSchema, "goods");
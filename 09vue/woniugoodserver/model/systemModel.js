var {Schema,model}=require('mongoose');

//定义Schema 商品
var systemSchema = new Schema({

   /**
    * 组件路径
    */
   component:String,
   create_time: String,
   /**
    * 菜单图标
    */
   icon: String,
   /**
    * 显示状态
    */
   isShow: Boolean,
   /**
    * 菜单类型，M是目录，C是菜单，A是按钮
    */
   menuType: String,
   /**
    * 菜单名称
    */
   name: String,
   /**
    * 权限字符
    */
   perms: String,
   /**
    * 上级菜单
    */
   pid: String,
   /**
    * 排序
    */
   sort:String,
   system_data: Boolean,
   show:Boolean,
   
}, { versionKey: false });
//配置数据模型
//暴露模块
module.exports = model('systemModel', systemSchema, "system");




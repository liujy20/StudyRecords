var {Schema,model}=require('mongoose');

//定义Schema 商品
var systemUserSchema = new Schema({

    /**
     * 创建时间
     */
    create_time: String,
    /**
     * 菜单权限
     */
    rules: String,
    /**
     * 角色名称
     */
    roleName: String,
    /**
     * 软删除
     */
    show: Boolean,
    /**
     * 角色状态
     */
    status: Boolean,
    /**
     * 系统数据
     */
    system_data: Boolean,
}, { versionKey: false });
//配置数据模型
//暴露模块
module.exports = model('systemUserModel', systemUserSchema, "systemUser");
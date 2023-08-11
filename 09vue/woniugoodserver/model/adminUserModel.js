var {Schema,model,SchemaTypes}=require('mongoose');

//管理员账号
var adminUserSchema = new Schema({

    /**
     * 管理员账号
     */
    account:String,
    create_time: String,
    /**
     * 手机号
     */
    phone: String,
    /**
     * 管理员密码
     */
    pwd: String,
    /**
     * 管理员姓名
     */
    realName: String,
    /**
     * 管理员身份
     */
    roles: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'systemUserModel'
        }
    ],
    show:  Boolean,
    /**
     * 状态
     */
    status:Boolean,
    system_data: Boolean,
    /**图片 */
    avator:String
}, { versionKey: false });
//配置数据模型
//暴露模块
module.exports = model('adminUserModel', adminUserSchema, "adminUser");
const usersModel = require('../../model/usersModel');
const { check_number, check_id, check_string } = require('../../utils/checkType');

//获取全部&按条件搜索用户管理
async function getSearch(req, res, next) {
    let { _id, phone, nickname, level, group_id, isMember, country, sex, is_promoter, limit, page } = req.body
    let code
    let data = await usersModel.find({ status: 1 });
    if (data.length > 0) {
        //订单id查询
        if (_id) {
            check_id(_id) ? data = data.filter(item => item._id == _id) : code = 202
        }
        //电话号码查询
        if (phone) {
            check_string(phone) ? data = data.filter(item => item.phone == phone) : code = 202
        }
        //昵称查询
        if (nickname) {
            check_string(nickname) ? data = data.filter(item => item.nickname == nickname) : code = 202
        }
        //等级查询
        if (level) {
            check_string(level) ? data = data.filter(item => item.level == level) : code = 202
        }
        //分组查询
        if (group_id) {
            check_id(group_id) ? data = data.filter(item => item.group_id == group_id) : code = 202
        }
        //会员查询
        if (isMember!="undefined") {
            check_number(isMember) ? data = data.filter(item => item.group_id == group_id) : code = 202
        }
        //国家查询
        if (country) {
            check_string(country) ? data = data.filter(item => item.country == country) : code = 202
        }
        //性别查询
        if (sex!="undefined") {
            check_number(sex) ? data = data.filter(item => item.sex == sex) : code = 202
        }
        //身份查询
        if (is_promoter) {
            check_number(is_promoter) ? data = data.filter(item => item.is_promoter == is_promoter) : code = 202
        }
        //分页
        page ? null : page = 1
        limit ? null : limit = 20
        if (check_number(limit) && check_number(page)) {
            data = data.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        } else {
            code = 202
        }
        if (code == 202) {
            res.send({
                meta: {
                    msg: '参数错误',
                    status: 202
                }
            });
        } else {
            res.send({
                data,
                meta: {
                    msg: '获取成功',
                    status: 200
                }
            });
        }
    } else {
        res.send({
            meta: {
                msg: '无数据',
                status: 201
            }
        });
    }
}
//添加用户
async function addUser(req, res, next) {
    let message = req.body
    let data = await usersModel.create({ ...message, status: 1 });
    res.send({
        data,
        meta: {
            msg: '新增成功',
            status: 200
        }
    })
}
module.exports = {
    getSearch,
    addUser
}
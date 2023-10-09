
var common = require('../tool/Common');
var db = require('../tool/SqlLiteTool').DB;
var UUID = require('uuid');
const { toOneArray } = require('../tool/Utils');

//查询所有角色信息
module.exports.getAllRole = async function (req, res) {
    let role = await db.query('SELECT * FROM chcs_role WHERE flag=0');
    common.sendResponse(res, 200, {
        code: 200,
        msg: '查询成功!',
        data: role
    });

}
// 根据id删除角色信息
module.exports.delRoleById = async function (req, res) {
    let { id } = req.body;
    await db.update('UPDATE chcs_role SET flag=1 WHERE id=?', [id]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '删除成功!'
    });
}
// 新增角色信息
module.exports.saveRole = async function (req, res) {
    let { name,description,createTime,creatorId } = req.body;
    let id=UUID.v1();
    await db.insert('INSERT INTO chcs_role VALUES(?,?,?,?,?,?)', [id,name,description,createTime,creatorId,0]);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '新增成功!'
    });
}
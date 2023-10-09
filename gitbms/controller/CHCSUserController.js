
var common = require('../tool/Common');
var db = require('../tool/SqlLiteTool').DB;
let jwt = require('jsonwebtoken');
var UUID = require('uuid');
var WXBizDataCrypt = require('../tool/WXBizDataCrypt')
const axios = require('axios').default;

//根据用户id更新密码
module.exports.updateUserPasswordById = function (req, res) {
    let {newPassword,password,id}=req.body;
    //根据id查询密码
    db.get('SELECT password FROM chcs_user WHERE flag=0 AND id=?',[id]).then(param => {
        if(param.password==password){
            db.update('UPDATE chcs_user SET password=? WHERE flag=0 AND id=? AND password=?',[newPassword,id,password]).then(data => {
                common.sendResponse(res, 200, {
                    code: 200,
                    msg: '修改成功！请重新登录!'
                });
            }).catch(err => {
                common.sendResponse(res, 200, {
                    code: 500,
                    msg: '修改失败！'
                });
            });
        }else{
            common.sendResponse(res, 200, {
                code: 500,
                msg: '修改失败！旧密码输入有误!'
            });
        }
    }).catch(err => {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '查询出错'
        });
    });
    
}


module.exports.login = function (req, res) {
    // const tokenResult = Token.encrypt({id: "123"}, "1h");
    
    let account = req.body.account;
    let pwd = req.body.pwd;
    if (!account) {
        common.valid(res, "请输入帐户");
        return;
    }
    if (!pwd) {
        common.valid(res, "请输入密码");
        return;
    }

    let params = [];
    params.push(account);
    params.push(pwd);
    db.get("select * from chcs_user where account=? and password=?", params).then(row => {
        if (!row) {
            common.sendResponse(res, 200, {
                code: 500,
                msg: '登录失败, 用户名或密码错误'
            });
            return;
        }
        let result = Object.assign({}, row);
        let token = jwt.sign(
            {
                id: result.id,
                openid: result.openid
            },//有效载荷
            'PRIVATE_KEY',
            { expiresIn: 200000 }
        );
        delete result.password;
        result.token = token;
        common.sendResponse(res, 200, {
            code: 200,
            msg: '登录成功',
            data: result
        });
    }).catch(err => {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '登录失败',
            data: []
        });
    });;

}

module.exports.getAllPower = function (req, res) {
    
    let sql = "select * from chcs_privilege where dr = 0 order by sortNum asc";
    let params = [];
    console.log(sql, "sql")
    db.query(sql, params).then(rows => {
        let listResult = [];
        for (let first of rows) {
            if (first.level == 1) {
                let listSecond = [];
                rows.forEach(element => {
                    if (element.fkPerentId == first.id) {
                        listSecond.push({
                            id: element.id,
                            name: element.name,
                            path: element.path,
                            component: element.component
                        })
                    }
                });
                
                listResult.push({
                    id: first.id,
                    name: first.name,
                    icon: first.icon,
                    children: listSecond
                })
            }
            
        }
        
        common.sendResponse(res, 200, {
            code: 200,
                msg: '',
            data: listResult
        });
    }).catch(err => {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '查询出错',
            data: []
        });
    });
}


module.exports.getUserPower = function (req, res) {
    let userid = req.body.userid;
    if (null == userid || "" == userid || undefined == userid) {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '请传入用户id',
            data: []
        });
        return;
    }
    let sql = "select DISTINCT * from (select p.* from chcs_privilege p inner join "
             + "chcs_roleAuth rp on rp.fkPrivilegeId = p.id "
             + "inner join chcs_user user on user.fkRoleId = rp.roleId where user.id=? " + 
             "union all select * from chcs_privilege where chcs_privilege.level = 1 "
              + "order by p.sortNum asc )";
    let params = [];

    console.log(sql)
    
    params.push(userid);
    db.query(sql, params).then(rows => {
        let listResult = [];
        for (let first of rows) {
            if (first.level == 1) {
                let listSecond = [];
                rows.forEach(element => {
                    if (element.fkPerentId == first.id) {
                        listSecond.push({
                            id: element.id,
                            name: element.name,
                            path: element.path,
                            component: element.component,
                            privilegeType: element.privilegeType
                        })
                    }
                });
                // let listSecond = rows.filter(item => item.fkPerentId == first.id);
                
                listResult.push({
                    id: first.id,
                    name: first.name,
                    icon: first.icon,
                    privilegeType: first.privilegeType,
                    children: listSecond
                })
            }
            
        }
        common.sendResponse(res, 200, {
            code: 200,
                msg: '',
            data: listResult
        });
    }).catch(err => {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '查询出错',
            data: []
        });
    });
}


module.exports.wxLogin = async function (req, res) {
    let rowData = req.body.rowData;
    var iv = req.body.iv;
    var code = req.body.code;
    console.log("rowData", rowData);
    console.log("iv", iv);
    var appId = 'wx36e047cbd8d6766d'
    var appSecret = 'c5afb12e7ab702332a04fa25c0658b84'

    const wxData = await axios({
        url: 'https://api.weixin.qq.com/sns/jscode2session',
        method: 'GET',
        params: {
            appId,
            secret: appSecret,
            js_code: code,
            grant_type: 'authorization_code'
        }
    })
    let session_key = wxData.data.session_key;
    let openid = wxData.data.openid;
    //查询student表是否有openid对应的用户
    let querySql = "select * from chcs_user where openid = ?";
    db.get(querySql, [openid]).then(row => {
        
        if (!row) {
            //不存在
            var pc = new WXBizDataCrypt(appId, session_key)

            var data = pc.decryptData(rowData , iv)

            console.log('解密后 data: ', data)

            let insertSql = "insert into chcs_user(id, number, account, password, userTypeId, flag, openid, fkRoleId) values(?,?,?,?,?,?,?,?)";
            let insertParam = [];
            insertParam.push(UUID.v1());
            insertParam.push(Date.now());
            insertParam.push(data.nickName);
            insertParam.push("123456");
            insertParam.push("67e98bc0-ee1b-11ed-8459-c76f227ca877");
            insertParam.push("0");
            insertParam.push(openid);
            insertParam.push("67e98bc0-ee1b-11ed-8459-c76f227ca811");

            let token = jwt.sign(
                {
                    id: insertParam[0],
                    openid: openid
                },//有效载荷
                'PRIVATE_KEY',
                { expiresIn: 200000 }
            );

            db.insert(insertSql, insertParam).then(insertRes => {
                common.sendResponse(res, 200, {
                    code: 200,
                        msg: '',
                    data: {
                        id: insertParam[0],
                        openid: openid,
                        token: token
                    }
                });
            })
            
        } else {
            //存在
            let token = jwt.sign(
                {
                    id: row.id,
                    openid: row.openid
                },//有效载荷
                'PRIVATE_KEY',
                { expiresIn: 200000 }
            );
            common.sendResponse(res, 200, {
                code: 200,
                msg: '',
                data: {
                    id: row.id,
                    openid: row.openid,
                    token: token
                }
            });
        }
        
    }).catch(err => {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '查询出错',
            data: []
        });
    });

    

}





module.exports.saveCHCSRolePrivilege = function (req, res) {
    let roleId = req.body.roleId;
    let listVote = req.body.listVote;
    if (!roleId) {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '授权失败,roleId未传',
            data: err
        });
        return;
    }
    if (!listVote || listVote.length <= 0) {
        common.sendResponse(res, 200, {
            code: 500,
            msg: '授权失败,listVote未传',
            data: err
        });
        return;
    }

    //先删除角色下所有的权限
    let delSql = "delete from chcs_roleAuth where roleId = ?";
    db.delete(delSql, [roleId]).then(data => {
    }).catch(err => {
    });

    //循环添加权限
    let sql = "insert into chcs_roleAuth(id, roleId, fkPrivilegeId, flag) values(?, ?, ?, ?)";
    for (let voteId of listVote) {
        let params = [UUID.v1(), roleId, voteId, 0];
        db.insert(sql, params).then(data => {
            
        }).catch(err => {
            
        });
    }
    common.sendResponse(res, 200, {code: 200, msg: "保存成功"});
}
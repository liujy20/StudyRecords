

var common = require('../tool/Common');
let jwt = require('jsonwebtoken');
const fs = require("fs");
var db = require('../tool/SqlLiteTool').DB;
var UUID = require('uuid');

var WXBizDataCrypt = require('../tool/WXBizDataCrypt')
const axios = require('axios').default;


module.exports.loginSys = function (req, res) {
    // const tokenResult = Token.encrypt({id: "123"}, "1h");
    

    let name = req.body.name;
    let pwd = req.body.pwd;
    if (!name) {
        common.valid(res, "请输入用户名");
        return;
    }
    if (!pwd) {
        common.valid(res, "请输入密码");
        return;
    }

    let params = [];
    params.push(name);
    params.push(pwd);
    db.get("select * from sys_admin where name=? and pwd=? and dr=0", params).then(row => {
        
        if (!row) {
            common.sendResponse(res, 200, {
                code: 500,
                msg: '登录失败, 用户名或密码错误'
            });
            return;
        }
        let result = Object.assign({}, row);
        delete result.pwd;
        let token = jwt.sign(
            {
                id: result.id,
                name: result.name
            },//有效载荷
            'PRIVATE_KEY',
            { expiresIn: 200000 }
        );
        result.token = token;
        common.sendResponse(res, 200, {
            code: 200,
            msg: '登录成功',
            data: result
        });
    }).catch(err => {
        common.sendResponse(res, 500, {
            code: 500,
            msg: '登录失败',
            data: []
        });
    });;

}

module.exports.login = function (req, res) {
    // const tokenResult = Token.encrypt({id: "123"}, "1h");
    

    let username = req.body.username;
    let pwd = req.body.pwd;
    if (!username) {
        common.valid(res, "请输入用户名");
        return;
    }
    if (!pwd) {
        common.valid(res, "请输入密码");
        return;
    }

    let params = [];
    params.push(username);
    params.push(pwd);
    db.get("select * from ums_user where name=? and pwd=?", params).then(row => {
        
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
                name: result.name
            },//有效载荷
            'PRIVATE_KEY',
            { expiresIn: 200000 }
        );
        result.token = token;
        common.sendResponse(res, 200, {
            code: 200,
            msg: '登录成功',
            data: result
        });
    }).catch(err => {
        common.sendResponse(res, 500, {
            code: 500,
            msg: '登录失败',
            data: []
        });
    });;

}


module.exports.uploadImg = function (req, res) {
    if (req.files.length > 0) {
        let fileSufix = req.files[0].originalname.split(".")[1];
        let fileName = UUID.v1() + "." + fileSufix;
        let savaPath = __dirname.replace("\\controller", "/public") + "/upload/" + fileName;
        console.log(savaPath);
        let fileBody = fs.readFileSync(req.files[0].path);
        fs.writeFile(savaPath, fileBody, (err,data)=>{
            if(err) res.send(err);
            let responseBody = {
                msg : `${req.files[0].originalname} upload success`,
                imgUrl: "http://127.0.0.1:3000/public/upload/" + fileName
            }
            res.json(responseBody); 
        });
    }
}

module.exports.searchPowerByUserId = function(req, res) {
    let userid = req.body.userid;

    

    let sql = "select * from ums_user_power where userid = ?";
    db.query(sql, [userid]).then(userPowerRows => {


        db.query("select * from sys_privilege order by sortNum asc", []).then(rows => {
            let listResult = [];
            for (let first of rows) {
                if (first.level == 1) {
                    let listSecond = [];
                    rows.forEach(element => {
                        if (element.fkPerentId == first.id) {
                            if (userid == "1") {
                                listSecond.push({
                                    id: element.id,
                                    name: element.name,
                                    path: element.path,
                                    component: element.component
                                })
                            } else {
                                let hasMenu = userPowerRows.find(item => item.privilegeId == element.id);
                                if (hasMenu) {
                                    listSecond.push({
                                        id: element.id,
                                        name: element.name,
                                        path: element.path,
                                        component: element.component
                                    })
                                }
                            }
                            
                            
                        }
                    });
                    // let listSecond = rows.filter(item => item.fkPerentId == first.id);
                    
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
            common.sendResponse(res, 500, {
                code: 500,
                msg: '查询出错',
                data: []
            });
        });
    })
}


module.exports.getAllMenu = function (req, res) {
    let userid = req.body.userid;
    let sql = "select p.* from sys_privilege p inner join "
             + "sys_role_privilege rp on rp.fkPrivilegeId = p.id "
             + "inner join ums_user user on user.fkRoleId = rp.fkRoleId where user.id=? " + 
             "union all select * from sys_privilege where sys_privilege.level = 1 "
              + "order by p.sortNum asc ";
    let params = [];
    if (!userid) {
        sql = "select p.* from sys_privilege p order by p.sortNum asc";
    } else {
        params.push(userid);
    }
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
                // let listSecond = rows.filter(item => item.fkPerentId == first.id);
                
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
        common.sendResponse(res, 500, {
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
    var appId = 'wx1ad717865c973761'
    var appSecret = '8e1dbf6d56430e9298524e1bced2660f'

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
    let querySql = "select * from ums_student where openid = ?";
    db.get(querySql, [openid]).then(row => {
        console.log(111, row);

        
        if (!row) {
            //不存在
            var pc = new WXBizDataCrypt(appId, session_key)

            var data = pc.decryptData(rowData , iv)

            console.log('解密后 data: ', data)

            let insertSql = "insert into ums_student(id, name, pwd, openid, headImg, age, status) values(?,?,?,?,?,?,?)";
            let insertParam = [];
            insertParam.push(UUID.v1());
            insertParam.push(data.nickName);
            insertParam.push("123456");
            insertParam.push(openid);
            insertParam.push(data.avatarUrl);
            insertParam.push(0);
            insertParam.push(0);

            let token = jwt.sign(
                {
                    id: insertParam[0],
                    name: insertParam[1]
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
                        name: insertParam[1],
                        headImg: insertParam[4],
                        token: token
                    }
                });
            })
            
        } else {
            //存在
            let token = jwt.sign(
                {
                    id: row.id,
                    name: row.name
                },//有效载荷
                'PRIVATE_KEY',
                { expiresIn: 200000 }
            );
            common.sendResponse(res, 200, {
                code: 200,
                msg: '',
                data: {
                    id: row.id,
                    name: row.name,
                    headImg: row.headImg,
                    token: token
                }
            });
        }
        
    }).catch(err => {
        common.sendResponse(res, 500, {
            code: 500,
            msg: '查询出错',
            data: []
        });
    });

    

}



module.exports.wxCodeLogin = async function (req, res) {
    var code = req.body.code;
    var appId = 'wx1ad717865c973761'
    var appSecret = '8e1dbf6d56430e9298524e1bced2660f'

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
    let querySql = "select * from ums_student where openid = ?";
    db.get(querySql, [openid]).then(row => {
        console.log(111, row);

        
        if (!row) {
            

            let insertSql = "insert into ums_student(id, name, pwd, openid, headImg, age, status) values(?,?,?,?,?,?,?)";
            let insertParam = [];
            insertParam.push(UUID.v1());
            insertParam.push("新用户");
            insertParam.push("123456");
            insertParam.push(openid);
            insertParam.push("");
            insertParam.push(0);
            insertParam.push(0);

            let token = jwt.sign(
                {
                    id: insertParam[0],
                    name: insertParam[1]
                },//有效载荷
                'PRIVATE_KEY',
                { expiresIn: 200000 }
            );

            console.log("2222", insertSql, insertParam);
            db.insert(insertSql, insertParam).then(insertRes => {
                common.sendResponse(res, 200, {
                    code: 200,
                        msg: '',
                    data: {
                        id: insertParam[0],
                        name: insertParam[1],
                        headImg: insertParam[4],
                        token: token
                    }
                });
            })
            
        } else {
            //存在
            let token = jwt.sign(
                {
                    id: row.id,
                    name: row.name
                },//有效载荷
                'PRIVATE_KEY',
                { expiresIn: 200000 }
            );
            common.sendResponse(res, 200, {
                code: 200,
                msg: '',
                data: {
                    id: row.id,
                    name: row.name,
                    headImg: row.headImg,
                    token: token
                }
            });
        }
        
    }).catch(err => {
        common.sendResponse(res, 500, {
            code: 500,
            msg: '查询出错',
            data: []
        });
    });

}
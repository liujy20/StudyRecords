
var common = require('../tool/Common');
var db = require('../tool/SqlLiteTool').DB;
var UUID = require('uuid');
var Utils = require('../tool/Utils');

module.exports.searchTabel = function (req, res) {
    let curPage = req.body.curPage;
    let pageSize = req.body.pageSize;
    if (!curPage || curPage <= 0) {
        curPage = 1;
    }

    if (!pageSize || pageSize <= 0) {
        pageSize = 20;
    }
    let start = (curPage - 1) * pageSize;
    let params = [];
    params.push(pageSize);
    params.push(start);
    console.log(333, params)
    db.get("select count(0) as total from sqlite_master WHERE type = 'table'").then(rowCount => {
        db.query("SELECT * FROM sqlite_master WHERE type = 'table' order by name desc limit ? offset ?", params).then(rows => {
            if (rows && rows.length > 0) {
                common.sendResponse(res, 200, {
                    code: 200,
                    msg: '',
                    data: {
                        rows: rows,
                        total: rowCount.total,
                        pageSize: pageSize,
                        curPage: curPage
                    }
                });
            }
        });
    });

}

module.exports.updateTableSql = async function(req, res) {
    let tableSql = req.body.sql;
    let tableName = req.body.name;

    let params = [];
    params.push(tableSql);
    params.push(tableName);

    
    //创建备份表
    let bakSql = tableSql.replace(tableName, tableName+"_bak");
    console.log(000, bakSql);
    await db.update(bakSql);
    console.log(111);

    //备份数据
    let bakInsert = `insert into ${tableName}_bak select * from ${tableName}`;
    await db.update(bakInsert);
    console.log(222);
    //删除表
    let delTableSql = "DROP TABLE IF EXISTS " + tableName;
    await db.update(delTableSql);
    console.log(333);
    //重建表
    await db.update(tableSql);
    console.log(444);
    //恢复数据
    let reinsert = `insert into ${tableName} select * from ${tableName}_bak`;
    await db.update(reinsert);
    console.log(555);
    //删除备份表
    let delBakTableSql = `DROP TABLE IF EXISTS ${tableName}_bak`
    await db.update(delBakTableSql)
    console.log(666);
    common.sendResponse(res, 200, {
        code: 200,
        msg: '修改成功'
    });

    // let upSql = "update sqlite_master set sql = ? where type='table' and name = ?";
    // console.log(upSql, params);
    // db.update(upSql, params).then(data => {
    //     common.sendResponse(res, 200, {
    //         code: 200,
    //         msg: '修改成功',
    //         data: data
    //     });
    // }).catch( err => {
    //     console.log(err, 22);
    //     common.sendResponse(res, 200, {
    //         code: 500,
    //         msg: '修改失败',
    //         data: err
    //     });
    // });

}

module.exports.getTabelDoc = function (req, res) {
    let tableRealName = req.body.tableName;
    let params = [];
    params.push(tableRealName);
    db.query("SELECT * FROM sqlite_master WHERE type = 'table' and name = ?", params).then(resTable => {
        let tableDesc = "";
        let tableName = "";
        let mapCol = [];
        if (resTable && resTable.length == 1) {
            let sql = resTable[0].sql;
            console.log("table", sql);
            let sqlArray = sql.split("\r\n")
            if (sqlArray.length == 1) {
                sqlArray = sql.split("\n");
            }
           
            if (sqlArray && sqlArray.length > 0) {
                let lineArray = sqlArray[0].split("--")
                
                if (lineArray && lineArray.length >= 2) {
                    tableDesc = lineArray[1];
                    tableName = resTable[0].tbl_name;
                }
            }
            tableName = Utils.getUpperWord(tableName);

            //循环列
            for (let i = 1; i < sqlArray.length; i++) {
                let line = sqlArray[i].split("--");
                if (line && line.length == 2) {
                    mapCol.push(line[1]);
                }
            }

        }

        let conditionReq = "";
        let respColumn = "";
        let saveColumn = "";
        let updateColumn = "";

        let rows = "";

        db.query("PRAGMA table_info('" + tableRealName + "')").then(resInfo => {

            if (resInfo && resInfo.length > 0) {
                
                for (let i = 0; i < resInfo.length; i++) {
                    let item = resInfo[i];
                    

                    let type = "String";
                    let val = "";
                    if (item.type.indexOf("varchar") >= 0) {
                        type = "String";
                        if (item.name == "id") {
                            val = `"${i + 1}"`;
                        } else {
                            val = `"${item.name + i}"`;
                        }
                    } else if (item.type.indexOf("INTEGER") >= 0) {
                        type = "Number";
                        val = `${i}`;
                        if (item.name == "dr") {
                            val = 0;
                        } else if (item.name == "status") {
                            val = 0;
                        }
                    } else if (item.type.indexOf("datetime") >= 0) {
                        type = "String";
                        val = `"2023-01-02 01:02:03"`;
                    } else if (item.type.indexOf("TEXT") >= 0) {
                        type = "String";
                        val = `"${item.name + i}"`;
                    } else {
                        type = "String";
                        val = `"${item.name + i}"`;

                    }
                    conditionReq = conditionReq + `|condition.${item.name} | 否 | ${type}   | ${mapCol[i]} |\r\n`;
                    respColumn = respColumn + `|${item.name} | ${type}   | ${mapCol[i]} |\r\n`;
                    if (item.name != "id") {
                        saveColumn = saveColumn + `|${item.name} | 否 | ${type}   | ${mapCol[i]} |\r\n`;
                    }
                    updateColumn = updateColumn + `|${item.name} | 否 | ${type}   | ${mapCol[i]} |\r\n`;

                    rows = rows + `"${item.name}": ${val},\r\n`;
                }

                rows = rows.substring(0, rows.length - 1);
            }


            let queryPage = `[TOC]  
    
##### 简要描述
    
- 分页查询${tableDesc}
    
##### 请求URL
- \` http://127.0.0.1:3000/api/search${tableName} \`
      
##### 请求方式
- POST 
    
##### 参数
    
|参数名|必选|类型|说明|
|:-----  |:-----|:-----|-----                           |
|pageSize|否|int|每页记录数|
|curPage|否|int|第几页 |
|condition|否|Object|查询参数|
${conditionReq}
    
##### 返回示例 
    
\`\`\` 
    {
    "code": 200,
    "msg": "",
    "data": {
        "rows": [
{${rows}}
        ],
        "total": 3,
        "pageSize": 20,
        "curPage": 1
    }
}
\`\`\`
    
##### 返回参数说明 

|参数名|类型|说明|
|:-----  |:-----|-----                           |
|total |int   |总记录数 |
|pageSize |int   |每页记录数 |
|curPage |int   |当前页 |
|rows |array   |${tableDesc}对象数组 |
${respColumn}
    
##### 备注 

- code: 200-代表成功
- code: 500-代表失败，失败的情况msg将显示错误信息
`;


            //添加
            let saveDesc = `[TOC]
        
##### 简要描述

- 新增${tableDesc}数据

##### 请求URL
- \` http://127.0.0.1:3000/api/save${tableName} \`
    
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
${saveColumn}

##### 返回示例 

\`\`\` 
    {
    "code": 200,
    "msg": "修改成功"
    }
\`\`\`
    
##### 返回参数说明 

|参数名|类型|说明|
|:-----  |:-----|-----                           |
|code |int   |返回码：200-成功 500-失败  |
|msg |String   |修改成功或失败的信息  |

##### 备注 
- 更多返回错误代码请看首页的错误代码描述

`;

            let delDesc = `
    
[TOC]
##### 简要描述

- 删除${tableDesc}

##### 请求URL
- \` http://127.0.0.1:3000/api/del${tableName} \`
    
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|id |是  |string |${tableDesc}id   |

##### 返回示例 

\`\`\` 
    {
    "code": 200,
    "msg": "删除成功"
    }
\`\`\`

##### 返回参数说明 

|参数名|类型|说明|
|:-----  |:-----|-----                           |
|code |string   | 200-成功 500-失败  |
|msg |string   | 接口返回消息  |

##### 备注 

- 更多返回错误代码请看首页的错误代码描述
`

            let updateDesc = `
    
[TOC]
    
##### 简要描述

- 修改单个${tableDesc}数据

##### 请求URL
- \` http://127.0.0.1:3000/api/update${tableName} \`
    
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
${updateColumn}

##### 返回示例 

\`\`\` 
    {
    "code": 200,
    "msg": "修改成功"
    }
\`\`\`

##### 返回参数说明 

|参数名|类型|说明|
|:-----  |:-----|-----                           |
|code |int   |返回码：200-成功 500-失败  |
|msg |String   |修改成功或失败的信息  |

##### 备注 

- 更多返回错误代码请看首页的错误代码描述
`;

            let getDesc = `
    
[TOC]
        
##### 简要描述

- 根据id取得一个${tableDesc}数据

##### 请求URL
- \` http://127.0.0.1:3000/api/get${tableName}ById \`
    
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
|id |是  |string |${tableDesc}id   |

##### 返回示例 

\`\`\` 
    {
    "code": 200,
    "msg": "",
    "data": {
${rows}
    }
}
\`\`\`

##### 返回参数说明 
|参数名|类型|说明|
|:-----  |:-----|-----                           |
|code |int   |返回码： 200-成功 500-失败  |
|msg |string   |成功或失败的消息  |
|data |Object   |${tableDesc}对象  |
${respColumn}
##### 备注 

- 更多返回错误代码请看首页的错误代码描述
`;

            let getAllDesc = `
    
[TOC]
    
##### 简要描述

- 取得所有${tableDesc}数据

##### 请求URL
- \` http://127.0.0.1:3000/api/getAll${tableName} \`
    
##### 请求方式
- POST 

##### 参数

|参数名|必选|类型|说明|
|:----    |:---|:----- |-----   |
${conditionReq}

##### 返回示例 

\`\`\` 
    {
    "code": 200,
    "msg": "",
    "data": {
        "rows": [
${rows}
        ]
    }
}
\`\`\`

##### 返回参数说明 

|参数名|类型|说明|
|:-----  |:-----|-----                           |
|code |int   |返回码：200-成功 500-失败  |
|msg |String   |修改成功或失败的信息  |
|data |Object   |返回的数据  |
|rows |array   |${tableDesc}对象数组 |
${respColumn}

##### 备注 

- code: 200-代表成功
- code: 500-代表失败，失败的情况msg将显示错误信息
`;

            // console.log(123, queryPage)
            // console.log(333, saveDesc)
            // console.log(444, delDesc)
            // console.log(555, updateDesc);
            // console.log(666, getDesc);
            // console.log(777, getAllDesc);


            common.sendResponse(res, 200, {
                code: 200,
                msg: '',
                data: {
                    queryPage,
                    saveDesc,
                    delDesc,
                    updateDesc,
                    getDesc,
                    getAllDesc
                }
            });

        });

    })
}
var db = require('./tool/SqlLiteTool').DB;
var Utils = require('./tool/Utils');



db.query("SELECT * FROM sqlite_master WHERE type = 'table' and name = 'ums_doctor_book'").then(resTable => {
    let tableDesc = "";
    let tableName = "";
    let mapCol = [];
    if (resTable && resTable.length == 1) {
        let sql = resTable[0].sql;
        let sqlArray = sql.split("\r\n")
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
    db.query("PRAGMA table_info('ums_doctor_book')",[]).then(res => {
    
        // console.log("res", res);

        if (res && res.length > 0) {
            for (let i = 0; i < res.length; i++) {
                let item = res[i];

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
                
                rows = rows + `         "${item.name}": ${val},\r\n`;
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
|:----    |:---|:----- |-----   |
|pageSize | 否 |int   | 每页记录数 |
|curPage | 否 |int   | 第几页 |
|condition | 否 |Object   | 查询参数 |
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
|rows |array   |书籍对象数组 |
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
console.log(777, getAllDesc);
    });

})


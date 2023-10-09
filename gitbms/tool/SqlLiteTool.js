const sqlite3 = require('sqlite3');  // 引入 sqlite3 模块
const path = require('path');  // 引入路径处理模块
const dbName = path.join(__dirname, 'eoms.db');  // 获取当前运行目录下的 data.db 文件

const db = new sqlite3.Database(dbName, err => {
    if (err !== null) {
        return false;
    } else {
        return true;
    }
});

class DB {
    static close() {
        db.close(cb);
    }

    static query(sql, params) {
        
        return new Promise((resolve, reject) => {
           
            db.all(sql, params, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }

    static get(sql, params) {
        return new Promise((resolve, reject) => {
            db.get(sql, params, (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(row);
                }
            });
        });
    }

    static insert(sql, params) {
        return new Promise((resolve, reject) => {
            db.run(sql, params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    static update(sql, params) {
        return new Promise((resolve, reject) => {
            db.run(sql, params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(333, err, data);
                    resolve(data);
                }
            });
        });
    }

    static delete(sql, params) {
        return new Promise((resolve, reject) => {
            db.run(sql, params, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

}
module.exports.DB = DB;


// module.exports = {
//     async open() {
//         // 打开数据库
//         this.db = await new sqlite3.Database(dbName, err => {
//             if (err !== null) {
//                 return false;
//             } else {
//                 return true;
//             }
//         });
//     },
//     async close() {
//         await this.db.close(err => {
//             if (err) {
//                 console.log(err);
//                 return false;
//             } else {
//                 return true;
//             }
//         });
//     },

//     async exec(sql) {
//         await this.open();
//         await this.db.run(sql, res => {
//             this.close();
//             if (res) {
//                 return false;
//             } else {
//                 return true;
//             }
//         });
//     },

//     async insert(sql, params) {
//         await this.open();
//         await this.db.run(sql, params, res => {
//             console.log(res);
//             this.close();
//             if (res) {
//                 return false;
//             } else {
//                 return true;
//             }
//         });
//     },

//     async update(sql, params) {
//         await this.open();
//         await this.db.run(sql, params, res => {
//             console.log(res);
//             this.close();
//             if (res) {
//                 return false;
//             } else {
//                 return true;
//             }
//         });
//     },

//     async delete(sql, params) {
//         await this.open();
//         await this.db.run(sql, params, res => {
//             console.log(res);
//             this.close();
//             if (res) {
//                 return false;
//             } else {
//                 return true;
//             }
//         });
//     },

//     async query(sql, params) {
        
//         return new Promise(async (resolve, reject) => {
//             await this.open();
//             await this.db.all(sql, params, (err, rows) => {
               
//                 this.close();
//                 if (err) {
//                     reject(err);
//                 } else {
//                     resolve(rows);
//                 }
//             });
//         })
        
        
//     },

//     init() {
//         this.open();
        

//         this.close();
//     }
// }
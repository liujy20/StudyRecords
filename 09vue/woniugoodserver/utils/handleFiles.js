const multer = require('multer');
const fs = require('fs');
const path = require('path');
/*
    文件上传
*/
function uploadFiles(options = {}) {
    //1.对参数options进行解构并设置默认值
    const { dir = "./public/temp", key = 'file', size = 1000 } = options;
    //2.设置multer的参数，配置diskStorage，来控制文件存储的位置以及文件名字等。
    const storage = multer.diskStorage({
        //2.1 确定图片存储的的位置
        destination: function (req, file, cb) {
            //当dir所对应目录不存在时，则自动创建该文件。
            try {
                fs.accessSync(dir);
            } catch (error) {
                fs.mkdirSync(dir);
            }
            cb(null,dir);
        },
        //2.2 确定存储时的名称。如果使用原名，可能会造成再次上传同一张图片的时候的冲突。
        filename: function (req, file, cb) {
            var changedName = (new Date().getTime())+'-'+file.originalname;
            cb(null, changedName);
        }
    });
    //3.配置图片限制
    const limits={
        //限制文件大小1000kb
        fileSize:1024*size,
        //限制文件数量
        files:10
    };
    //4.生成的专门处理上传的一个工具，可以传入storage、limits等配置
    const upload=multer({storage,limits});
    //5.返回多文件上传的设置信息（同样也可用于单文件上传）
    return upload.array(key);
}
module.exports = {
    uploadFiles
}
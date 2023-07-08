//引入mongoose
let mongoose = require('mongoose');
//URL
let dbURL = 'mongodb://127.0.0.1:27017/stuMS';
//连接数据库
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//配置数据连接成功的回调函数
mongoose.connection.on('connected', function () {
    console.log('数据库连接成功!');
})
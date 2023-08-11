//1.导入mongoose依赖包
var mongoose=require('mongoose');
//2.连接数据库
var dbURI="mongodb://127.0.0.1:27017/woniuGoods";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('connected',()=>{console.log('mongodb数据库连接成功');});
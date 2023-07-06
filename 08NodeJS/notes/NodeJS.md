# 项目架构

## 软件架构

- ==B/S==
  - Browser/Server
  - 浏览器/服务器
  - 不需要用户安装额外的客户端，可以直接通过浏览器使用功能;
  - 所有软件程序资源都被存放在服务器端;
  - 比如:淘宝、京东等。
- ==C/S==
  - Client/Server
  - 客户端/服务器
  - 用户需要安装额外的客户端程序，才能正常使用功能；
  - 比如:LOL、微信、QQ

## 服务器

- 安装了服务器软件的计算机。

## URL

Uniform Resource Locator 统一资源定位符。

用于定位互联网中的唯一一个资源地址。

格式:

- `协议://主机:端口号/资源路径?附加信息`
- 协议:`http`或`https`;
- 主机:IP或域名;
  - IP:
    - IPv4:由4段数字组成，每段数字取值为0~255,比如:192.168.11.2
    - IPv6
    - 本机:`127.0.0.1`
  - 域名:
    - 比如:`www.baidu.com`
    - 本机:`localhost`
- 端口号:
  - `http`:80;可省
  - `https`:443;可省
  - 定位服务程序;
  - 系统分配，取值范围:0~65535
- 资源路径
  - 定位当前资源在服务器中的具体位置;
- 附加信息
  - URL传参;

## 项目组成

- 前端资源
  - 实现用户页面编写，采集用户数据，进行页面交互;
  - 技术:
    - 基础:HTML、CSS、JavaScript、BootStrap、jQuery、webpack等。
    - 进阶:Vue全家桶、React等。
- 后端资源
  - 实现数据业务处理，接收前端数据，进行业务分析，操作数据库数据，将处理结果发送给前端;
  - 技术:
    - Nodejs:express框架;
    - Java体系:SpringMVC+MyBatis;
- 数据库
  - 存储数据的仓库;
  - 技术:
    - 非关系型数据库(小型数据库):
      - mongodb、Redis等
    - 关系型数据库(中、大型数据库):
      - sqlserver、MySQL、Oracle等。

![img](https://woniuimage.oss-cn-hangzhou.aliyuncs.com/woniunote//ff9c21d2a874498e8f0bcbf589152ba1.png)

# express

## 概述

- 一个基于Nodejs环境的web框架，可以实现快速构建web项目。

## 环境搭建

- 下载express包;

```
npm i express-generator -g
```

## 创建express项目

```
express 项目名称
```

- 如果创建项目报如下错，可在`Windows PowerShell`输入`set-ExecutionPolicy RemoteSigned`命令后，重启VSCode的集成终端可解决;

![img](C:\StudyRecords\08NodeJS\notes\NodeJS.assets\25fc26f636d4474f9eb1048c2c312554.png)

## 文件介绍

- bin:binary的缩写，表示二进制，存放服务器配置文件的文件夹。
  - www:服务器配置文件，一般不做修改;
- `public`:公共资源文件。
  - 该文件中的资源，在服务器启动后，可以被客户端(浏览器)访问。
  - 前端资源(html、css、JavaScript)会被存放在该文件中。
- `routes`:后端路由文件夹。
- views:模板文件夹。
- `app.js`:项目启动配置文件。
- `package.json`:npm包配置文件。

## 初体验

创建目标项目

```
express 项目名称
```

下载项目需要依赖的基础包(在`package.json`所在文件夹中执行该命令)

```
npm i
```

创建项目首页

- 首页一般名称为`index`,是项目默认可以访问的页面，必须放在`public`下(不能在子文件夹中)，才可作为默认页面;
- 前端资源可以被浏览器直接访问，故存放在`public`文件夹中;

配置启动信息

- 修改`app.js`文件，将其最后最后一行代码进行注释

```
// module.exports = app;
```

- 在`app.js`文件末尾，增加以下代码

  - 端口号:服务器启动时，向系统申请的端口号，后期浏览器访问该项目时，需要指定该端口号，查看当前系统端口占用情况，可在`cmd`中输入`netstat -ano`;
  - 回调函数:在服务器启动成功后，会自动调用执行的函数;

```javascript
app.listen(端口号,回调函数);
app.listen(1314, function () {  
  console.log('服务器启动成功！端口号为1314!');
})
```

启动服务器

- 关闭服务:`ctrl+c`或关闭当前终端

```
node app.js
```

客户端(浏览器)输入URL访问服务器资源

- ```
  http://主机:端口号/资源路径
  ```

  - 主机:
    - 本机使用`127.0.0.1`或`localhost`
    - 其他主机使用对方`IP`或域名，查看本机IP可在`cmd`中输入`ipconfig`；
  - 端口号:
    - 要与`app.js`中配置的端口号一致，且不能与系统冲突，可在`cmd`中输入`netstat -ano`查看系统端口占用情况;
  - 资源路径:
    - 非项目首页，需要指定资源路径;
    - 前端资源给相对public的路径;

## 创建后端资源

创建后端资源的JS文件

- 在`routes`文件夹中新建`user.js`,后期在`user.js`中编写用户相关的后端代码;

配置一级路由

- 目的:确定要执行的JS文件;

- `在app.js`文件中，实现一级路由配置:
- 一级路由必须以`/`开头，且保证在当前项目中名称唯一;

```javascript
//引入目标JS文件
let 变量名称=require('目标JS参照app.js的相对路径');
app.use('/名称',变量名称);
// catch 404 and forward to error handler


//引入目标JS文件
let user = require('./routes/user.js');
//配置一级路由
app.use('/user', user);
```

配置二级路由

- 引入express

```javascript
let express=require('express');
```

- 创建路由对象

```javascript
let 路由对象变量名称=express.Router();
let router = express.Router();
```

- 配置二级路由，并编写对应后端代码
  - 请求类型:可以使用`get`;
  - 二级路由必须以`/`开头，且名称要在当前JS文件中唯一;

```javascript
路由对象变量名称.请求类型('/二级路由名称',function(){  
  后端代码
})

router.get('/login', function () {  
  console.log('登录后端代码执行');
});
```

- 暴露路由对象

```javascript
module.exports=路由对象变量名称
//暴露路由对象 ES6 export default router
module.exports = router;
```

重启服务(修改了`app.js`或后端代码，都需要重启服务器)

- 关闭服务:`ctrl+c`或关闭当前终端

```
node app.js
```

客户端(浏览器)输入URL访问服务器资源

- ```
  http://主机:端口号/资源路径
  ```

  - 主机:
    - 本机使用`127.0.0.1`或`localhost`
    - 其他主机使用对方`IP`或域名，查看本机IP可在`cmd`中输入`ipconfig`；
  - 端口号:
    - 要与`app.js`中配置的端口号一致，且不能与系统冲突，可在`cmd`中输入`netstat -ano`查看系统端口占用情况;
  - 资源路径:
    - 后端资源:`/一级路由/二级路由`

## 请求类型

- ==GET==
  - 目的:向服务器索取资源的请求;
  - 传参方式:通过URL传参;
- 传参大小:受浏览器对URL总长度限制;
  - 安全性:用户数据暴露在URL中，用户数据相对不安全;
  
- ==POST==
  - 目的:向服务器提交数据的请求;
  - 传参方式:请求正文传参;
- 传参大小:理论上无上限，实际受服务器接收能力限制;
  - 安全性:用户数据不会暴露在URL中，用户数据相对安全;

## 后端代码编写

请求操作

- 回调函数第一个参数为请求对象。

- 操作请求对象可以获取客户端信息(包括数据传参)。

- 常用操作:

  - 获取URL传参(GET):

  ```
  请求对象.query;
  ```

  ```javascript
  router.post('/login', function (req, resp) {   
    //第一个形参:代表请求对象，可以获取客户端相关数据(传参)  
  console.log(req.query); 
    console.log('登录后端代码执行');
});
  ```
  
  - 获取请求正文传参(POST):

  ```
  请求对象.body;
  ```
  
  ```javascript
  router.post('/login', function (req, resp) {  
    //第一个形参:代表请求对象，可以获取客户端相关数据(传参)    
    console.log(req.body);  
    console.log('登录后端代码执行');
  });
  ```

响应操作

- 回调函数第二个参数为响应对象。

- 操作响应对象，可以实现响应数据内容生成；

- 常用操作:

  - 响应数据:

  ```
  响应对象.send(数据);
  ```

  ```javascript
  router.post('/login', function (req, resp) {  
    //第一个形参:代表请求对象，可以获取客户端相关数据(传参) 
    //第二参数:代表响应对象，操作该对象，可以实现响应数据生成  
    console.log('登录后端代码执行'); 
    resp.send('登录成功!');
  });
  ```

# APIFox

## 概述

- 一个可以测试、调试后端程序接口的工具。
- 后期可以自动生成接口API。

## 环境搭建

- 下载安装包；https://apifox.com/?utm_source=baidu_pinzhuan&utm_medium=sem&utm_campaign=pinzhuan&utm_content=pinzhuan&utm_term=apifox
- 安装(一路next);
- 注册并登录;
- 创建团队(团队名称自定义);
- 创建项目(项目名称自定义);
- 创建接口;
  - 确定接口的URL；
  - 确定请求方式;
  - 确定传参;
- 生成在线文档;

# Nodejs模块化编程

## 语法

整体暴露

- ES6：

```javascript
export default{    变量名称,    ......}
```

- Nodejs:

```javascript
module.exports={  
  变量名称,
  ......
}

//存储用户数据
let userArr = [  
  {     
    account: 'admin',
    password: 'ad123'  
  },  
  {   
    account: 'zhangsan',  
    password: 'zs123'   
  }
];
module.exports = userArr
```

引入并接收暴露数据

- ES6:

```javascript
import 对象名称 from '目标JS文件路径';
```

- Nodejs:

```javascript
let 变量名称=require('目标JS文件路径');
//引入JS并接收暴露数据
let userArr = require('./../util/userDB');
```

## 注意

- Nodejs引入目标JS文件扩展名称可以省略;
- Nodejs引入第三方包(npm下载的包)，可以直接写包名，不用指定文件路径；

## require加载顺序

当require一个文件模块时, 如果require绝对路径的文件, 从当前文件目录开始查找node_modules目录；然后依次进入父目录，查找父目录下的node_modules目录；依次迭代，直到根目录下的node_modules目录。

简而言之，如果require绝对路径的文件，查找时不会去遍历每一个node_modules目录，其速度最快。其余流程如下：

> 1. 从module path数组中取出第一个目录作为查找基准。
> 2. 直接从目录中查找该文件，如果存在，则结束查找。如果不存在，则进行下一条查找。
> 3. 尝试添加.js、.json、.node后缀后查找，如果存在文件，则结束查找。如果不存在，则进行下一条。
> 4. 尝试将require的参数作为一个包来进行查找，读取目录下的package.json文件，取得main参数指定的文件。
> 5. 尝试查找该文件，如果存在，则结束查找。如果不存在，则进行第3条查找。
> 6. 如果继续失败，则取出module path数组中的下一个目录作为基准查找，循环第1至5个步骤。
> 7. 如果继续失败，循环第1至6个步骤，直到module path中的最后一个值。
> 8. 如果仍然失败，则抛出异常。

# nodemon

## 概述

- 是一个第三方包，可以实现==自动==检测后端代码修改情况，重启服务器;

## 环境搭建

```
npm i nodemon -g
```

## 启动服务器

```
nodemon app.js
```

# HTTP状态码

## 概述

- 由==HTTP==(HyperText Transfer Protocol)协议制定标准，制定了web资源传输要遵循的标准。
- 是用以表示网页服务器[超文本传输协议](https://baike.baidu.com/item/超文本传输协议/8535513?fromModule=lemma_inlink)响应状态的3位数字代码（表示传输结果状态的代码）。

## 常见的状态码

- `200`:成功。
- `404`:资源找不到。
  - 检查资源路径是否正确，请求类型是否正确;
  - 增加后端接口后，未重启服务器；
- `403`:身份验证不通过。
- `500`:服务器错误。
  - 后端程序出现异常。
- `304`:资源没有被修改，从本地浏览器缓存中获取的资源内容。

# MVC

## 概述

- 一种软件设计模式。
- Mode View Controller
  - Mode
    - 模型，主要指数据模型，用于存储数据。
  - View
    - 视图，主要指页面，用于展示数据。
  - Controller
    - 控制器，接收客户端传参，进行业务判断处理，操作数据库数据，生成响应内容。

## 案例

- userModel:

```javascript
class User {  
  constructor(account, password) {
    this.account = account;    
    this.password = password;  
  }
}
module.exports = User;
```

- userDB(数据库):

```javascript
//引入并接收User类
let User = require('./../mode/userMode');
//存储用户数据
let userArr = [  
  new User('admin', 'ad123')
];
module.exports = userArr
```

- userController:

```javascript
const userArr = require("../util/userDB");
const UserMode = require("../mode/userMode");
class UserController {
  // 登录
  login(req, res) {
    let { account, password } = req.body;
    console.log("传入用户", req.body);
    if (
      userArr.some((val) => val.account == account && val.password == password)
    ) {
      res.send({
        code: 200,
        msg: "登录成功",
      });
    } else {
      res.send({
        code: 500,
        msg: "登录失败",
      });
    }
  }
}
module.exports = UserController;
```

- user(路由):

```javascript
// 创建路由对象
let express = require("express");
let router = express.Router();

let UserController=require('../controller/userController')
let userController=new UserController()

// 登录
router.post("/login", (req, res) => {
  userController.login(req,res)
});

module.exports = router;
```

# MongoDB

## 概念

- 背景
  - 数组存储的数据是`瞬时数据`，程序运行期间数据存在，一旦停止运行，数据则会被销毁，不能实现数据永久保存；
- 瞬时数据问题解决方案:
  - 数据库+数据持久化技术
- 数据库
  - DataBase 数据库，简称DB，存储数据的仓库。
  - 将数据以文件的形式存储到计算机本地硬盘中。
  - 分类:
    - 关系型数据库:
      - 以表格形式存储数据。
      - 优点:
        - 数据操作效率较高;
      - 缺点:
        - 数据需要转换后，才能被程序使用;
      - 常见关系型数据库:
        - SQLServer、MySQL、Oracle等。
    - 非关系型数据库:
      - 以对象形式存储数据。
      - 优点:
        - 数据不需要转换，就能被程序使用;
      - 缺点:
        - 数据操作效率相对更低;
      - 常见非关系型数据:
        - MongoDB、Redis等

## MongoDB

- 是一个非关系型数据库。
- 存储数据的方式:
  - 文档:
    - 每个对象以一个文档形式存在。
    - 比如:
      - admin的数据对象以一个文档形式存在;
      - zhangsan的数据对象以一个文档形式存在;
  - 集合:
    - 一类对象数据以一个集合形式存在。
    - 比如:
      - 所有用户对象文档以一个用户集合形式存在;
      - 所有电影对象文档以一个电影集合形式存在;
- 环境搭建
  - 下载:https://www.mongodb.com/try/download/enterprise
  - 安装:
    - 一路next;
    - 取消官方图形化界面安装;

![img](C:\StudyRecords\08NodeJS\notes\NodeJS.assets\0ed7dbc1c94c4dc3b74c0d516f7f33d0.png)

## Navicat

- 一个数据库图形化界面软件。

## MongoDB常用命令

- 判断指定集合是否存在，如果存在，则删除该集合

```javascript
db.getCollection("集合名称").drop();
```

- 创建指定名称集合

```javascript
db.createCollection("集合名称");
```

- 向指定名称的集合添加对象数据

```javascript
db.getCollection("集合名称").insert([    对象1,    对象2,    ......]);
```

## MongoDB数据导入与导出

- 导出:选中目标数据库->右键->转存储脚本文件->数据和结构->保存(选择要保存的位置和文件名称)
- 导入:选中目标数据库->右键->运行脚本文件->找到目标数据库文件->开始

# Mongoose

## 概述

- 是Nodejs环境中可以使用的一个第三方包。
- 该包提供了操作mongodb数据库的数据相关API。

## 下载

```
npm i mongoose
```

## 连接数据库

- 新建dbConnect.js，内容如下:

```javascript
let mongoose = require("mongoose");

let myUrl = "mongodb://127.0.0.1:27017/movieM";
mongoose.connect(myUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", function () {
  console.log("mongodb启动");
});
```

## 操作数据库数据

引入mongoose，并接收`Schema`和`model`函数

```javascript
let {Schema,model} = require('mongoose');
```

创建目标集合数据模型对象

- 注意:属性名称要与数据库中属性名称对应，数据类型首字母大写，mongodb与JavaScript数据对应关系如下:

|   mongodb    |      JavaScript       |
| :----------: | :-------------------: |
| Int32和Int64 |        Number         |
|    Double    |        Number         |
|    String    |        String         |
|     数组     |         Array         |
|    对象ID    | Schema.Types.ObjectId |

```javascript
let 变量名称=new Schema({   
  属性名称:数据类型, 
  ......
},{ 
  versionKey: false 
});

let operaSchema = new Schema({  
  name: String,   
  address: String,  
  phone: String,  
  movies: Array,  
  img_Src: String
},{ 
  versionKey: false 
});
```

建立数据模型与目标集合对象关系

- 关系名称:在系统中要唯一，不能重复；
- 目标集合名称:必须与数据库中集合名称一致(不一致会导致查询无结果);

```javascript
model('关系名称',数据模型对象,'目标集合名称')
model('operaModel', operaSchema, 'opera');
```

操作数据库数据

```javascript
async function(){  
  let 变量名称=await model('关系名称').find({});
}

router.get('/test', async function (req, resp) { 
  //操作数据库   
  let re = await model('operaModel').find({});   
  //响应给客户端   
  resp.send({    
    code: 200,   
    message: '查询成功!',  
    data: re  
  })
})
```

# Mongoose之CRUD

## 概述

- CRUD:`创建`(Create)、`读取`(Read)、`更新`(Update)和`删除`(Delete)。

## 新增

- `create`

  - 新增指定对象到目标集合，并返回该对象。

  ```javascript
  async function(){  
    let 变量名称=await model('关系名称').create({ 
      属性名称:值,   
      ......
    });
  }
  ```

  ```javascript
  router.get("/add", async function (req, res) {
    let re = await model("userModel").create({
      account: "xwg",
      password: "112233",
      age: 44,
    });
    res.send({
      code: 200,
      msg: "添加成功",
      data: re,
    });
  });
  ```

## 删除

- `deleteMany`

  - 删除满足指定条件的对象，并返回结果对象，该结果对象中存在`deletedCount`属性，记录了删除的对象个数，可以用于判断是否删除成功。

  ```javascript
  async function(){  
    let 变量名称=await model('关系名称').deleteMany({   
      条件   
    });
  }
  ```

  ```javascript
  router.get("/del", async function (req, res) {
    let re = await model("userModel").deleteMany({
      account: "xwg",
    });
    res.send({
      code: 200,
      msg: "删除成功",
      data: re,
    });
  });
  ```

## 修改

- `updateMany()`

  - 更新符合指定条件的对象属性值，并返回修改结果对象，该结果对象中的`modifiedCount`属性，记录了修改的对象个数，可以用于判断是否修改成功。

  ```javascript
  async function(){ 
    let 变量名称=await model('关系名称').updateMany({  
      条件 
    },{    
      新的属性值 
    });
  }
  ```

  ```javascript
  router.get("/update", async function (req, res) {
    let re = await model("userModel").updateMany(
      {
        account: "xwg",
      },
      {
        password: 11111111,
      }
    );
    res.send({
      code: 200,
      msg: "修改成功",
      data: re,
    });
  });
  ```

## 查询

- 查询所有

```javascript
async function(){ 
  let 变量名称=await model('关系名称').find({});
}

async function(){   
  let re = await model('operaModel').find({});
}
```

- 根据指定属性值查询

```javascript
re=await model('userModel').find({
  age:33
})
```

- 根据属性值是否大于指定值查询

```javascript
let re=await model('userModel').find({
  age:{
    $gt:33
  }
})
```

- 根据属性值是否小于指定值查询

```javascript
let re=await model('userModel').find({
  age:{
    $lt:33
  }
})
```

- 根据属性值是否大于等于指定值查询

```javascript
let re=await model('userModel').find({
  age:{
    $gte:33
  }
})
```

- 根据属性值是否小于等于指定值查询

```javascript
let re=await model('userModel').find({
  age:{
    $lte:33
  }
})
```

- 查找指定属性值在指定值中的任意一个

```javascript
re=await model('userModel').find({
  age:{
    $in:[22,33]
  }
})
```

- 查找指定属性值不在指定值中

```javascript
re=await model('userModel').find({
  age:{
    $nin:[22,33]
  }
})
```

- 查询满足指定的所有条件

```javascript
// 两个条件都满足
re = await model("userModel").find({
  $and: [
    {
      age: {
        $gt: 22,
      },
    },
    {
      age: {
        $lt: 44,
      },
    },
  ],
});
```

- 查询满足指定条件中任意一个

```javascript
// 条件满足一个即可
re = await model("userModel").find({
  $or: [
    {
      age: {
        $lte: 22,
      },
    },
    {
      age: {
        $gt: 44,
      },
    },
  ],
});
```

- 查询指定属性值满足指定正则规则

```javascript
// 正则表达式
re=await model('userModel').find({
  account:{
    $regex:/[2w]/
  }
})
```

# END
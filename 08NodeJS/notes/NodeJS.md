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

# HTTP

## 概述

- HTTP（Hypertext Transfer Protocol）超文本传输协议。
- 超文本资源(web资源)在网络中传输的标准、规范。

## 流程

- 一个请求只能请求一个资源，只能对应一个响应。
- 流程:
  - 浏览器获取服务器资源(确定资源URL)，向服务器发送请求数据包(request，req)，该数据包包含浏览器要告诉给服务器的信息；
  - 服务器接收到请求数据包后，会解析请求数据包，明确目标资源，根据资源路径，找到目标资源;
  - 将目标资源内容，作为响应数据包(response,resp)内容发送给浏览器,响应数据包包含服务器要告诉给浏览器的信息;

## mine type

- 互联网中资源类型的通用表示。

![img](C:\StudyRecords\08NodeJS\notes\NodeJS.assets\953d89be55bb4b63b0f5250c5d98b6b3.png)

## 请求(Request)

- 浏览器发送给服务器的数据包，该数据包主要包含浏览器的一些环境信息以及用户相关数据。
- 结构:
  - 请求首行:
    - `请求类型 资源路径 HTTP版本`
  - 请求头(键值对，Header):
    - Accept:可以接收处理的资源类型。
    - Accept-Encoding:可以接收处理的压缩格式。
    - Accept-Language:可以处理的语言。
    - Cache-Control:是否使用缓存控制。
    - Connection:是否保持活连接(不马上注销连接，可以实现多个请求和响应使用同一个连接)。
    - User-Agent:当前浏览器系统环境信息。
    - Content-Length:请求正文内容大小。
    - Content-Type:请求内容的类型。
    - Referer:发起请求的相关资源URL。
  - 请求正文(Body):
    - 浏览器提交给服务器的数据(GET请求没有正文，POST请求可以有正文)。

## 响应

- 服务器发送给浏览器的数据包，该数据包主要包含服务器的一些环境信息以及用户请求的目标相关数据。
- 结构
  - 响应首行
    - `HTTP版本 状态码`
  - 响应头(键值对，Header)
    - Content-Type:响应正文内容类型。
    - Content-Language:响应正文内容类型。
    - Date:响应时间日期。
  - 响应正文(Body)
    - GET:一般为请求的目标资源内容。
    - POST:一般为请求提交的数据处理结果。

## 缓存

- 浏览器第一次发送请求，从服务器获取到目标资源后，对一些不常修改的资源，会保存到当前浏览器本地文件中(缓存文件)，后期浏览器要使用该资源时，会先从本地文件中查找，如果查找到，并未过期，则直接使用该资源(不会重新从服务器获取);
- 从而达到可以优化页面加载速度，提高系统性能的目的;

## Http与Https区别

- 端口号:
  - HTTP默认为80，HTTPS默认为443;
- 数据传输:
  - HTTP数据以明文形式传输;
  - HTTPS数据以密文形式传输;
- 服务器认证:
  - HTTP协议不具备认证目标服务器是否合法、正规的能力;
  - HTTPS协议具备认证目标服务器是否合法、正规的能力;
- 响应速度:
  - HTTP比HTTPS响应速度快。

# 前端请求服务器资源方式

## 地址栏输入URL

- `协议://主机:端口号/资源路径`

## 超链接

- `<a href="URL">文本</a>`
- 当用户点击超链接文本，浏览器会将超链接`href`属性值填充到地址栏，发送请求;
- 一般请求前端静态资源(HTML文件);

## 表单

```html
<form></form>
```

- 通过`action`属性指定请求目标资源路径，`method`属性指定请求方式。
- 当用户点击提交按钮，浏览器会将该表单标签中的表单内容数据，按照键值对形式发送到目标服务器。
- 一般请求后端资源(接口)。

## 异步请求

- 表单和超链接都可以向服务器发送请求，但发送的为同步请求，服务器一旦响应数据后，当前页面内容会被响应数据覆盖。
- 异步请求可以将服务器响应数据异步判断并填充到页面，不会将响应结果整体覆盖到当前页面。

## Ajax

- Asynchronous Javascript And XML（异步JavaScript和XML）
- 异步特点:
  - 浏览器发送异步请求时，如果服务器还没有响应数据，浏览器不会等待服务器的响应数据，会继续执行后面代码，当服务器响应数据被接收到到时，再执行响应数据处理代码;
- 异步请求优点:
  - 执行效率更高;
- 原生:

```javascript
//1.创建请求对象
let xhr = new XMLHttpRequest()
//2.开启请求链接
xhr.open('请求方式','目标资源路径',true)
//3.设置响应监听
xhr.onreadystatechange = function(res){  
  //响应成功时要执行的代码,xhr.response可以获取响应数据  
  console.log(xhr.response)
}
//4.调用send方法发送请求到服务器
xhr.send()
//1.创建请求对象
let xhr = new XMLHttpRequest()
//2.开启请求链接
xhr.open('GET','http://127.0.0.1:3001/movies/getMovies',请求类型true表示异步请求false表示同步请求)
//3.设置响应监听
xhr.onreadystatechange = function(res){ 
  console.log(xhr.response)
}
//4.调用send方法
xhr.send()
```

- jQuery封装的Ajax

```javascript
$.ajax({  
  url:'目标资源路径', 
  method:'请求方式',  
  async:请求类型true表示异步请求false表示同步请求, 
  dataType:'响应内容类型', 
  data:{    
    参数名称:参数值 
  },
  success:function(data){    
    响应成功时要执行的代码,并将响应数据作为实参传入   
  }
})
$.ajax({  
  url: 'http://127.0.0.1:3000/users/login', 
  async: true,   
  method: 'POST', 
  dataType:'json',  
  data:{    
    acc:'admin',
    pwd:'ad123'  
  },  
  success: function (data) {   
    console.log('响应数据接收成功', data); 
  }
})
```

# 异步编程

## 目录

- 概念
- 任务队列与事件循环
- 回调地狱
- Promise
- await与async

## 概念

- JavaScript是单线程的，同一时间只能执行一个指令或代码。

- 同步:按照代码编写顺序执行的过程，被称为`同步执行`，其中被执行的代码被称为`同步代码`。

  - 优点:逻辑清晰，数据加载顺序明确。
  - 缺点:执行效率较低，系统资源利用不高;

- 异步:未按照代码编写顺序执行的过程，被称为`异步执行`，其中被执行的代码被称为`异步代码`。

  - 优点:执行效率相对较高，系统资源利用率更高；
  - 缺点:逻辑性相对更低，数据加载顺序明确性更低；
  - 案例:
    - setTimeout、setInterval;
    - ajax的async属性为true时;
    - jQuery动画:fadeIn、fadeOut、slideDown、slideUp、show、hide、animate;

- 回调函数

  - 将函数作为参数传入另外一个函数内部执行的函数称为回调函数;

  ```javascript
  function forEachPlus(arr, fn) { 
    for (let index = 0; index < arr.length; index++) {  
      fn(arr[index], index, arr); 
    }
  }
  let a = [1, 2, 3, 4];
  forEachPlus(a, function (v) {  
    console.log(v);
  })
  ```

- 回调函数分类

  - 同步回调函数
    - 按照代码编写顺序执行的回调函数，被称为`同步回调函数`。
    - 比如:forEach、filter、map、some、every、reduce等。
  - 异步回调函数
    - 未按照代码编写顺序执行的回调函数，被称为`异步回调函数`。
    - 比如:setTimeout、setInterval、ajax的async属性为true时的success函数、jQuery动画执行完毕时执行的函数;

## 任务队列与事件循环

- 当同步代码与异步代码同时存在时，代码的执行顺序由`任务队列`和`事件循环`决定;
- 流程:
  - 当JavaScript代码被编译执行前，会将要执行的代码加载存储到执行栈中(代码容器);
  - 依次执行同步代码;
  - 遇到异步代码，会将异步代码存储到`任务队列`中，继续执行后面的同步代码;
  - 当执行栈中的同步代码执行完毕后，会从任务队列中取出第一个任务代码执行，执行完毕继续取出下一个任务队列中代码执行；
  - 直到任务队列中不存在待执行代码；
  - 程序进入等待期;
- 将反复从任务队列中的代码取出到执行栈中执行的过程，被称为`事件循环`;

```javascript
console.log(1);
setTimeout(() => {   
  console.log(2);  
  setTimeout(() => { 
    console.log(3);    
    setTimeout(() => {    
      console.log(4);  
    }, 0)  
    console.log(5); 
  }, 0)  
  console.log(6); 
  setTimeout(() => {  
    console.log(7);    
    setTimeout(() => {  
      console.log(8);  
    }, 0)     
    console.log(9); 
  }, 0)
}, 0)
console.log(10);
// 1 10 2 6 3 5 7 9 4 8
```

## 回调地狱

- 背景:
  - 后一个回调函数需要依赖前一个回调函数的数据结果时，可以使用回调嵌套解决。
- 概念
  - 多次回调函数嵌套的现象被称为`回调地狱`。
- 回调地狱存在问题:
  - 代码可读性较差;
  - 可维护性较差;
- 解决回调地狱问题:
  - Promise

## Promise

- 背景

  - 存在回调地狱现象。

- 概念

  - Promise表示承诺的意思，在程序中，表示承诺未来的一个结果。
  - 它是ES6新增的一个构造函数，每个Promise对象可以用于处理一个异步代码结果。

- 语法:

  - `resolve`:类型为函数类型，当异步代码执行成功时要调用执行的函数,可以传入实参到then的回调函数中;
  - `reject`:类型为函数类型，当异步代码执行失败时要调用执行的函数,可以传入实参到catch的回调函数中;

  ```javascript
  new Promise(function(resolve,reject){ 
    //异步代码
  });
  ```

  ```javascript
  let pro = new Promise(function (resovle, reject) {  
    let num = Math.random();    
    if (num > 0.5) {  
      //执行成功  
      resovle('成功:' + num);  
    } else {      
      //执行失败   
      reject('失败:' + num);  
    }
  });
  ```

- 结果处理

  - `then`:当Promise对象的状态值为`resolve(fulfilled)`时，系统会自动调用then函数，并传入`resolve()`函数实参，如果then函数的回调函数没有返回值，则返回当前Promise的同状态克隆对象，否则返回回调函数返回值。
  - `catch`:当Promise对象的状态值为`reject`时，系统会自动调用catch函数，并传入`reject()`函数实参，如果catch函数的回调函数没有返回值，返回当前Promise的同状态克隆对象，否则返回回调函数返回值。

```javascript
目标promise对象.then(function(){  
  异步执行成功时要执行的代码
}).catch(function(){   
  异步执行失败时要执行的代码
})
pro.then(function (data) {   
  console.log('执行成功', data);
}).catch(function (data) { 
  console.log('执行失败', data);
})
```

- 案例

```javascript
let pro = new Promise(function (resovle, reject) {  
  setTimeout(function () {     
    resovle('成功1:');  
  }, 200)
});
let pro2 = new Promise(function (resovle, reject) { 
  setTimeout(function () {   
    resovle('成功2:');  
  }, 100)
});

pro.then(function (data) {   
  console.log('执行成功', data); 
  return pro2;
}).then(function (data) {  
  console.log('执行成功', data);
})
```

## Promise状态

- 每个Promise对象中内置了一个状态属性，该属性取值如下:
  - `pending`:默认值，表示该异步正在进行中(执行过程中),每个Promise对象刚创建时状态取该值;
  - `resolve`或`fulfilled`:表示异步成功，异步执行成功时，调用`resolve()`函数时，会将状态属性值由`pending`改为`resolve`或`fulfilled`；
  - `reject`:表示异步失败，异步代码执行失败时，调用`reject()`函数时，会将状态属性值由`pending`改为`reject`；
- 注意：每个Promise状态属性值，只能改变一次，且只能由`pending`改为`resolve`或者由`pending`改为`reject`;

## Promise.all

- 在指定Promise异步操作都完成后执行then或catch。
  - 所有的异步都成功时，会执行then。
  - 否则，执行catch。

```javascript
Promise.all([promise1,promise2,.....]).then(function(data){  
  //所有异步代码都执行成功时要执行的代码，data存储了所有异步结果
}).catch(function(data){  
  //有一个异步代码执行失败时要执行的代码，data存储失败的异步结果
})

let pro1 = new Promise(function (resovle, reject) {
  let num = Math.random();  
  // console.log(num); 
  if (num > 0.5) {    
    //执行成功  
    resovle('成功1:' + num); 
  } else {   
    //执行失败
    reject('失败1:' + num); 
  }
});

let pro2 = new Promise(function (resovle, reject) {  
  let num = Math.random(); 
  // console.log(num);  
  if (num > 0.5) {     
    //执行成功    
    resovle('成功2:' + num);
  } else {    
    //执行失败  
    reject('失败2:' + num);  
  }
});

Promise.all([pro1, pro2]).then(function (data) { 
  console.log('then:', data);
}).catch(function (data) { 
  console.log('catch', data);
})
```

## Promise.race

- 在指定Promise任意一个异步有结果后，执行then或catch。

  ```javascript
  Promise.race([promise1,promise2,.....]).then(function(data){  
    最先有结果的promise成功要执行的代码
  }).catch(function(data){   
    最先有结果的promise失败要执行的代码
  })
  ```

  ```javascript
  let pro1 = new Promise(function (resovle, reject) { 
    setTimeout(function () {  
      let num = Math.random();    
      // console.log(num);   
      if (num > 0.5) {      
        //执行成功       
        resovle('成功1:' + num);   
      } else {   
        //执行失败   
        reject('失败1:' + num);   
      }   
    }, 100)
  });
  
  let pro2 = new Promise(function (resovle, reject) { 
    setTimeout(function () {        
      let num = Math.random();   
      // console.log(num);   
      if (num > 0.5) {         
        //执行成功     
        resovle('成功2:' + num); 
      } else {          
        //执行失败 
        reject('失败2:' + num);    
      }   
    }, 100)
  });
  
  Promise.race([pro1, pro2]).then(function (data) { 
    console.log('then:', data);
  }).catch(function (data) {  
    console.log('catch', data);
  })
  ```

## async与await

- 概念
  - ES7新增关键字async、await，用于解决异步代码结果处理问题。
- ==async==
  - 用于修饰函数，将目标函数定义为异步函数。
- ==await==
  - 表示等待，可以实现代码阻塞，必须要在异步函数中使用。
  - 阻塞当前异步函数代码执行，直到异步代码有成功结果继续执行当前异步函数后面代码;
- 语法:

```javascript
let pro1 = new Promise(function (resovle, reject) { 
  setTimeout(function () { 
    let num = Math.random();   
    resovle('成功1:' + num);  
  }, 3000)
});
console.log(1);
async function demo() {   
  console.log(2);  
  let re = await pro1;
  //等待目标异步代码执行成功，未成功前代码会阻塞 
  console.log(re);   
  console.log(3);
}
demo();
console.log(4);
```

# 跨域

## 概念

- 浏览器同源策略:
  - 1995年，网景公司在自家浏览器中引入了一个安全策略，该策略要求资源只能访问同源服务器资源。
  - 同源服务器资源:
    - 协议、主机、端口号都一致，被称为同源服务器资源。
- 跨域
  - 解决同源策略限制。

## 解决方案

- jsonp(了解)

  - 利用`<script></script>`标签本身自带跨域效果实现跨域。

  - 实现(jQuery的jsonp)：

    - 前端:

    ```javascript
    $.ajax({ 
      url:'目标资源路径',  
      dataType:'jsonp', 
      success:function(data){  
        console.log(data)  
      }
    })
    ```

    - 后端

    ```javascript
    router.get('/demo',function(req,resp){
      resp.jsonp('数据');
    })
    ```

- cors

  - 让服务器告诉给浏览器不做同源策略限制。

  - 实现:

    - 配置后端服务器响应头(修改后端express项目`app.js`，在一级路由配置之前，添加以下内容)

    ```javascript
    //添加：
    // 设置 CORS 允许跨域
    var allowCrossDomain = function (req, res, next) { 
      // 设置允许哪一个源（域）可以进行跨域访问，* 表示所有源  
      res.header("Access-Control-Allow-Origin", "*"); 
      // 设置允许跨域访问的请求头  
      res.header("Access-Control-Allow-Headers", "X-Requested-With,Origin,Content-Type,Accept,Authorization");
      // 设置允许跨域访问的请求类型 
      res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE");  
      // 设置允许 cookie 发送到服务器 
      res.header('Access-Control-Allow-Credentials', 'true'); 
      next();
    };
    app.use(allowCrossDomain);
    ```

- 代理服务器

  - 同源策略只针对浏览器请求服务器资源时的限制，对服务器请求服务器资源无限制，故可以让同源服务器请求非同源服务器资源后，将响应结果发送给浏览器。
    ![img](C:\StudyRecords\08NodeJS\notes\NodeJS.assets\368d4cc0404041b3ae7a9673ffc3f143.png)

  - 实现:

    - 修改前端项目服务器配置，实现代理服务器功能:(修改`webpack.config.js`)

    ```javascript
    devServer: {   
      port: '前端服务器接口',    
        // open: './html/index.html',   
        hot: true,  
          proxy: {   
            "/": {        
              target: 'http://目标后端服务器IP:端口号/'   
            }   
          }
    }
    ```

    ```javascript
    devServer: {   
      port: '1818', 
        // open: './html/index.html',    
        hot: true,    
          proxy: {    
            "/": {        
              target: 'http://127.0.0.1:3000/'  
            }       
          }
    }
    ```

# 数据加密算法

## 概念

- 将未加密的数据称为`明文`;
- 加密后的数据称为`密文`;
- 明文经过加密算法生成密文的过程被称为`数据加密`;

## 分类

可逆

- 由明文加密成密文后，可以由密文还原成明文(可以解密);
- 分类
  - 对称加密
    - 明文加密成密文时要使用一个密钥(一个字符串);
    - 密文解密成明文时要使用一个密钥;
    - 加密和解密时使用的同一个密钥;
  - 非对称加密
    - 明文加密成密文时要使用一个密钥(一个字符串)，该密钥被称为`公钥`;
    - 密文解密成明文时要使用一个密钥，解密的密钥被称为`私钥`;
    - 加密和解密时使用的不是同一个密钥;

不可逆

- 由明文加密成密文后，不可以由密文还原成明文(不可以解密);
- 相同的明文加密后形成的密文是一致的。
- 比如:使用MD5加密算法对用户密码加密。

## Md5加密

- 为不可以加密算法，可以用于对用户密码进行加密，相同明文会生成相同密文。
- 工具函数`util.js`:

```javascript
function getMd5(pwd) {  
  //引入Nodejs内置的加密模块  
  let crypto = require('crypto'); 
  //创建md5加密对象   
  let md5 = crypto.createHash('md5');  
  //定义变量存储密钥 
  let secret='xumin';   
  //加密数据  
  let mpwd = md5.update(pwd + secret).digest('hex'); 
  return mpwd;
}
module.exports = {  
  getMd5
}
```

- 加密工具函数使用:

```javascript
//引入加密工具函数
let { getMd5 } = require('./../util/util');
//定义变量存储明文
let pwd='A123456';
//加密
let mpwd=getMd5(pwd).digest('hex');
```

# 身份认证

## 背景

- 一些项目资源需要用户身份认证后才可正常访问。

## 主流实现技术

- cookie+session(了解)

  - cookie:存储在浏览器的本地文件;

  - session:存储在服务器的本地文件;

  - 流程:

    - 当客户端第一次请求服务器时，服务器会为每个客户端创建一个`session文件`，该文件有一个唯一的名称(`sessionId`),并将该名称(sessionId)作为响应头响应给客户端浏览器;
    - 浏览器接收到sessionId，会将该sessionId存储到本地`cookie`(cookie中的数据会作为`请求头`中的数据发送到服务器)文件中;
    - 当客户端发起登录请求时，服务器接收到用户登录数据，验证是否合法，如果合法，将用户登录数据，根据请求头中携带的sessionId找到对应session文件，`存储到该session文件中`;
    - 后期客户端要请求服务器需要身份认证后才可访问资源时，服务器会根据请求头携带的sessionId查找对应session文件，是否存在登录信息，如果存在，则正常响应请求内容，否则响应提示用户登录;

    ![img](C:\StudyRecords\08NodeJS\notes\NodeJS.assets\8e4d7256994244f489378abed85cfa23.png)

  - 存在问题:

    - 服务器会为每个客户端创建一个session文件，服务器内存压力较大;

- 本地存储(了解)

  - 登录成功后，将用户登录数据直接存储到浏览器本地存储中，一旦要请求登录后才可访问的资源时，客户端浏览器先从本地存储获取登录数据，并将登录数据发送到服务器，服务器验证数据无误后，响应请求目标资源，否则响应登录提示;
  - 存在问题:
    - 用户登录数据存储在本地浏览器，存在用户数据泄露风险;

- token(掌握)

  - 登录成功后，服务器根据用户登录数据加密形成token(密文)，将token响应给客户端浏览器，客户端浏览器将token本地存储，一旦要请求登录后才可访问的资源时，客户端浏览器先从本地存储获取token，并将token发送到服务器，服务器验证token无误后，响应请求目标资源，否则响应登录提示;

## jwt

- Json Web Token:一种利用JSON生成Token解决Web身份认证问题的技术解决方案。
- 流程

![img](C:\StudyRecords\08NodeJS\notes\NodeJS.assets\7aca0526450f47998c6b41b6e48f2f17.png)

## jwt实现身份认证

生成Token

- 前端

  - 发送登录请求到服务器，并将服务器响应的Token存储到本地存储;

  ```javascript
  $.ajax({  
    url:'登录URL',  
    method:'请求方式', 
    data:{    
      参数 
    },
    success:function(data){    
      操作响应数据获取Token，并将Token存储到本地存储 
    }
  })
  ```

- 后端

  - 处理登录请求，并根据登录数据生成Token，将Token响应给客户端浏览器;

  - 实现:

    - 下载`jsonwebtoken`

    ```
    npm i jsonwebtoken
    ```

    - 生成Token

    ```javascript
    //引入jsonwebtoken模块
    let jsonwebtoken=require('jsonwebtoken');
    //定义变量存储用户登录数据
    let userObj={acc:'admin',pwd:'ad123'};
    //定义变量存储密钥
    let secret='xumin';
    //定义变量存储Token过期时间，单位为秒
    let secodes=86400;//24*60*60
    //根据用户登录数据和密钥生成Token，并配置过期时间，单位为秒
    let token = jsonwebtoken.sign(userObj, secret, { expiresIn: secodes });
    //将Token响应给前端
    响应对象.send({ 
      code:200,   
      message:'登录成功!', 
      data:token})
    ```

验证Token是否合法有效

- 前端

  - 从本地存储获取Token，将Token作为请求头发送给服务器，处理服务器响应的401;
  - 实现:

  ```javascript
  function getPromiseAuth(url, method, data) {  
    //从本地存储获取Token
    let token = sessionStorage.getItem('token');   
    if (!token) { 
      alert('请先登录!');
      location.href = '/html/login.html';  
      return; 
    }
    return new Promise(function (resolve, reject) {  
      $.ajax({    
        url,     
        method,       
        data,       
        // 请求头传递token
        headers: {    
          Authorization: 'Bearer ' + token   
        },         
        success: function (data) {   
          resolve(data);      
        },       
        error: function (err) {    
          if (err.status == 401) {  
            alert('鉴权失败!请重新登录!');   
            location.href = '/html/login.html';  
          } else {   
            reject(err);     
          }    
        }      
      }) 
    });
  }
  //要鉴权的请求发送
  let movieRe = await getPromiseAuth(`/movie/findById?id=${id}`, 'GET', null);
  let operaRe = await getPromiseAuth(`/opera/findByMovieId?movieId=${id}`, 'GET', null);
  ```

- 后端

  - 接收前端发送的Token，验证是否合法有效，如果合法有效正常响应请求内容，否则响应401；

  - 实现

    - 下载`express-jwt`

    ```
    npm i express-jwt
    ```

    - 编写鉴权配置文件`auth.js`

    ```javascript
    //引入express-jwt模块
    const { expressjwt } = require('express-jwt');
    //获取配置对象
    const config = expressjwt({  
      secret: '密钥', 
      algorithms: ['HS256'],    
      credentialsRequired: false
      //是否对不带Token的请求进行鉴权验证,false:表示对请求头中不存在Token的请求，不进行校验(鉴权);true:无论请求头是否存在Token，都要校验(鉴权)，如果不存在，则响应401
    }).unless({   
      //配置白名单，不需要鉴权，可以是字符串类型:直接配置目标URL，也可以是正则:资源URL符合目标正则规则会作为白名单目标 
      path: [白名单]
    });
    module.exports = config;
    ```

    ```javascript
    //引入express-jwt模块
    const { expressjwt } = require('express-jwt');
    //获取配置对象
    const config = expressjwt({  
      secret: 'xumin',   
      algorithms: ['HS256'],  
      credentialsRequired: false
      //是否对不带Token的请求进行鉴权验证,false:表示对请求头中不存在Token的请求，不进行校验(鉴权);true:无论请求头是否存在Token，都要校验(鉴权)，如果不存在，则响应401
    }).unless({ 
      // path: ['/user/login', '/user/register']//配置白名单，不需要鉴权，可以是字符串类型:直接配置目标URL，也可以是正则:资源URL符合目标正则规则会作为白名单目标   
      path: [/\/user\//]
    });
    module.exports = config;
    ```

    - 应用鉴权配置到系统中(修改`app.js`，在一级路由配置代码前添加以下代码)

    ```javascript
    //引入鉴权代码，参照app.js指定路径
    let config = require('auth文件路径');
    //应用到系统
    app.use(config);
    ```

    ```javascript
    //引入鉴权代码
    let config = require('./util/auth');
    //应用到系统
    app.use(config);
    ```

根据Token获取登录数据

- 前端

  - 从本地存储取出Token发送到后端服务器，接收并处理后端服务器响应的登录数据;

  ```javascript
  //从本地存储获取
  Tokenlet token = sessionStorage.getItem('token');
  if (!token) { 
    如果本地存储不存在Token要执行的代码 
    return;
  }
  $.ajax({
    url:'根据Token获取用户数据的后端接口URL', 
    method:'请求方式', 
    headers: {     
      Authorization: 'Bearer ' + token 
    },
    success: function (data) {   
      成功获取用户登录数据后要执行的代码 
    }, 
    error: function (err) {    
      if (err.status == 401) {   
        用户Token过期失效要执行的代码    
      } else {        
        reject(err);
      }  
    }
  })
  ```

  ```javascript
  function getUserInfor(url, method, data) { 
    //从本地存储获取Token 
    let token = sessionStorage.getItem('token');  
    if (!token) {     
      $('header .txt').text('你好!请登录!');  
      return;  
    }   
    return new Promise(function (resolve, reject) { 
      $.ajax({    
        url,     
        method,       
        data,     
        headers: {    
          Authorization: 'Bearer ' + token   
        },   
        success: function (data) {  
          $('header .txt').text(`你好!${data.data.acc}!`);  
        },    
        error: function (err) {    
          if (err.status == 401) {    
            $('header .txt').text('你好!请登录!'); 
          } else {        
            reject(err);    
          }          
        }   
      })  
    });
  }
  import { getUserInfor } from '@util/util.js'
  getUserInfor('/user/getUserInfor', 'GET', null);
  ```

- 后端

  - 接收前端发送额Token，根据Token解密得到明文登录数据，并将解密结果响应给前端;

  ```javascript
  router.get('/配置二级路由', function (req, resp) {
    //获取客户端传入的Token 
    let token = req.get('Authorization').split(' ')[1];
    //根据Token获取登录数据(解密)  
    let userObj = jsonwebtoken.verify(token, '密钥');  
    //解密后的登录数据响应给客户端 
    resp.send({     
      code: 200,  
      message: '获取成功!',     
      data: userObj   
    })
  })
  ```

  ```javascript
  router.get('/getUserInfor', function (req, resp) { 
    //获取客户端传入的Token  
    let token = req.get('Authorization').split(' ')[1]; 
    //根据Token获取登录数据(解密)    
    let userObj = jsonwebtoken.verify(token, 'xumin'); 
    //解密后的登录数据响应给客户端 
    resp.send({ 
      code: 200,    
      message: '获取成功!',
      data: userObj 
    })
  })
  ```

# END
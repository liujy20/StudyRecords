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

# END
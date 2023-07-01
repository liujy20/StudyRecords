# Nodejs

## 概述

- 一个可以独立运行JavaScript的服务器环境。
- 底层基于谷歌浏览器V8引擎实现。
- 官网:https://nodejs.cn/

## 环境搭建

- 下载Nodejs安装包:https://registry.npmmirror.com/binary.html?path=node/

  - 推荐下载v14，过高的版本后期可能存在兼容问题;
  - windows系统根据系统位数下载对应`.msi`文件

- 安装nodejs

  - 一路next;(建议安装在默认路径下)

- 测试环境

  - 打开命令行窗口(win+R打开运行窗口，输入`cmd`回车);

  - 输入系统命令，检查nodejs版本;

    ```
    node -v
    ```

## 执行JS文件(基于VSCode)

- 创建目标JS文件；

- 选中目标JS文件，鼠标右键`在集成终端中打开`；

- 输入执行JS文件命令

  ```
  node 目标JS文件名称
  ```

## 注意

- nodejs只支持ECMAScript语法，不支持BOM和DOM；

## 作用

- 使用nodejs内置的`npm`命令下载项目常用的第三方库(包)。
- 可以实现后端代码编码运行(可以用JavaScript语法编写后端程序);

# npm

## 背景

在实际开发中，使用第三方包存在的问题:

- 对于各种第三方包的下载不方便;
- 在项目合并时，包不好管理控制；

## 概念

- npm(node package management)简称node包管理工具。
- 是nodejs自带的包管理工具，可以实现包的下载、卸载、版本控制等功能。

## 操作流程

- 创建项目文件;
- 选中项目文件夹，右键`z在集成终端中打开`，打开命令行窗口;
- 初始化项目:
  - `-y`:一律确认为`yes`

```
npm init -y
```

- 使用`npm`下载项目所需要的第三方包(包名全小写);

```
npm install jquery
```

## 文件介绍

- `node_modules`:存放使用`npm`命令下载的第三方包，每个包以一个文件夹的形式存在；

- `package-lock.json`:用于记录依赖包信息，后期使用git上传时用于版本控制;

- `package.json`

  :实时记录当前项目包的依赖信息;

  - 使用`npm`下载的第三方包，每个包会在`package.json`中以`dependencies`或`devDependencies`对象中的一个属性形式存在;

## 常用命令

查看当前服务器中可用版本

- 查看目标包默认下载版本

```
npm view 包名 versionnpm view jquery version
```

- 查看目标包所有可下载版本

```
npm view 包名 versionsnpm view jquery versions
```

下载目标包

- 下载默认版本目标包

```
npm install 包名npm i jquery
```

- 下载指定版本目标包

```
npm install 包名@版本号npm install jquery@1.9.1
```

- 可以将`install`简写为`i`

```
npm i 包名@版本号npm i jquery@1.9.1
```

卸载目标包

```
npm uninstall 包名npm uninstall jquery
```

- 可以将`uninstall`简写为`uni`

```
npm uni 包名npm uni jquery
```

同时下载多个指定包

```
npm i 包名1@版本号 包名2@版本号 ......npm i jquery bootstrap
```

同时卸载多个指定包

```
npm uni 包名1 包名2 .....npm uni jquery bootstrap
```

下载`package.json`中配置的第三方包;

```
npm i
```

## 镜像地址

- 默认镜像地址`https://registry.npmjs.org/`
- 查看镜像地址

```
npm config get registry
```

- 修改镜像地址

```
npm config set registry 镜像地址
npm config set registry https://registry.npm.taobao.org/
```

- 淘宝镜像地址:`https://registry.npm.taobao.org/`

## 全局安装与局部安装

- 全局安装

  - 所有项目都要使用的包或`环境`可以使用全局安装(全局环境中查找目标，不能基于项目查找);

  ```
  npm i 包名 -g
  ```

  - `-g`：表示global(全局)。
  - 查看全局安装位置(默认：`C:\Users\thinkpad\AppData\Roaming\npm\node_modules`)

  ```
  npm root -g
  ```

- 局部安装(常用)

  - 默认安装方式，基于当前项目下载安装包，只在当前项目中使用。

  ```
  npm i 包名
  ```

## 开发依赖与生产依赖

- 开发依赖

  - 在项目开发(编码)过程中要使用的包，被称为`开发依赖`。
  - 一般用于解决开发效率或资源管理问题的包。
  - 比如:webpack；
  - 使用`npm`下载的开发依赖，会在`package.json`中以`devDependencies`中每个属性形式存在;
  - 命令:

  ```
  npm i 包名 -Dnpm i 包名 --save-dev
  ```

- 生产依赖

  - 项目运行过程中要使用的包，被称为`生产依赖`。
  - 项目开发和运行都要使用的包。
  - 使用`npm`下载的开发依赖，会在`package.json`中以`dependencies`中每个属性形式存在;
  - 命令:(默认下载包为生产依赖)

  ```
  npm i 包名npm i 包名 -Snpm i 包名 --save
  ```

# webpack

## 概述

- 一个前端资源的打包工具，可以实现前端工程化，有助于前后端分离。
- 官网:https://webpack.docschina.org/
- 核心功能:
  - 兼容处理:
    - 实现代码向下兼容;
  - 实现各种资源的模块化:
    - 可以实现非JS资源的模块化;
  - 减少文件资源数量:
    - 一个页面关联的相关资源会自动进行合并，一个页面所有关联的CSS或SASS文件会合并为一个CSS文件，一个页面所有关联的JS文件会被合并为一个JS文件。
  - 实现资源内容的压缩和混淆:
    - 压缩:将资源内容中的换行、空格、注释等去除，减少资源文件大小，提高加载速度;
    - 混淆:将代码转为浏览器能直接识别的语法，以达到保护代码的目的，提高解析速度;

## 创建项目

- 创建项目文件夹
- 初始化npm项目

```
npm init -y
```

## 安装下载

```
npm i webpack webpack-cli -D
```

## 初始化文件夹

- src:存放源码文件夹。
  - css:存放css文件。
  - scss:存放scss文件。
  - js:存放JavaScript文件。
  - html:存放HTML文件。
  - image:存放图片。
  - util:存放工具资源文件。

## 初体验

- 创建webpack配置文件
  - 文件名称为`webpack.config.js`，位置在当前项目的根目录下;
- 配置`webpack.config.js`

```javascript
const path = require('path');
console.log(__dirname);//获取当前项目的绝对路径
module.exports = {   
  mode: 'production',//打包模式  
  entry: {//打包入口(确定哪些关联资源需要被打包)    
    index: './src/js/index.js'//参照当前配置文件位置查找目标文件  
  },  
  output: {//配置出口     
    path: path.resolve(__dirname, 'dist'),//路径拼接 F:\studentInfo\34\program\week2\day07\myWebpack\dist   
    filename: './js/[name].js'//配置文件打包后以什么名字进行输出,基于path文件查找目标文件  
  }
}
```

- 执行打包命令(`npx`用于执行第三方包中的命令)

```
npx webpack
```

## 核心配置

==mode==:配置打包模式。

- `development`:开发模式。不会对项目资源进行压缩合并处理。
- `prodaction`:生产模式。会对项目资源进行压缩合并处理。

==entry==:配置打包入口，确定要打包的资源。

- 每个页面会有一个主JS文件(一般主JS会与对应页面同名)，将要打包的页面主JS以一个`entry`属性的形式添加;
  - `entry`属性名:自定义，后期webpack运行期间会以该名称定位该JS文件。
  - `entry`属性值:要打包的目标主JS的文件路径(参照配置文件查找)。

==output==:配置打包出口，打包后的资源输出配置。

- `path`

  :用于配置打包后的资源存储的父文件路径。

  - `path.resolve`:做文件路径拼接函数。
  - `__dirname`:动态获取当前项目的绝对路径。

- `filename`

  :配置打包后的资源存储在父文件夹的具体位置和名称(参照父文件夹路径)。

  - `[name]`表取打包目标资源的标志名称(`entry`对应的属性名称)。

==module==:配置打包规则。

==plugins==:打包插件(第三方包)。

- 打包非JS和JSON文件需要借助第三方插件实现。

==devServer==:配置打包服务器。

## 打包JS

主要作用

- 将当前JS关联的其它JS按统一模块合并为一个JS文件。

实现:

- 配置==entry==打包入口,确定要打包的资源。
  - `entry`属性名:自定义，后期webpack运行期间会以该名称定位该JS文件。
  - `entry`属性值:要打包的目标主JS的文件路径(参照配置文件查找)。

```javascript
entry:{  
  属性名称:属性值,  
    .....
}

module.exports = {  
  mode: 'production',//打包模式   
  entry: {//打包入口(确定哪些关联资源需要被打包)    
    index: './src/js/index.js',//参照当前配置文件位置查找目标文件    
    login: './src/js/login.js' 
  }
}
```

- 配置==output==打包出口，打包后的资源输出配置。
  - `path`:用于配置打包后的资源存储的父文件路径。
  - `filename`:配置打包后的资源存储在父文件夹的具体位置和名称(参照父文件夹路径)。

```javascript
output:{ 
  path: '打包后的资源存储的父文件路径',
    filename:'打包后的资源存储在父文件夹的具体位置和名称(参照父文件夹路径)'
}

const path = require('path');//引入系统path模块，可以实现路径操作
module.exports = {  
  mode: 'production',//打包模式  
  entry: {//打包入口(确定哪些关联资源需要被打包)  
    index: './src/js/index.js',//参照当前配置文件位置查找目标文件  
    login: './src/js/login.js'  
  },   
  output: {//配置出口     
    path: path.resolve(__dirname, 'dist'),//路径拼接 F:\studentInfo\34\program\week2\day07\myWebpack\dist     
    filename: './js/[name].js'//配置文件打包后以什么名字进行输出,基于path文件查找目标文件 
  }
}
```

- 执行打包命令

```
npx webpack
```

配置代码优化

```javascript
const path = require('path');//存储要打包的页面名称
let pageArr = ['index', 'login'];//根据要打包的页面生成entry值
function getEntry(arr) {   
  let entryObj = {};  
  arr.forEach(pageName => {    
    entryObj[pageName] = `./src/js/${pageName}.js` 
  })  
  return entryObj;
}
module.exports = {   
    mode: 'production',//打包模式   
  entry: getEntry(pageArr),   
  output: {//配置出口  
    path: path.resolve(__dirname, 'dist'),//路径拼接
    filename: './js/[name].js'//配置文件打包后以什么名字进行输出,基于path文件查找目标文件
  }
}
```

## 打包HTML

主要作用

- 将当前HTML文件相关资源自动引入的当前HTML中。

补充

- 在引入外部`js`文件时，添加`defer`属性表示该文件以异步的方式加载;

```html
<script defer="defer" src=".././js/index.js"></script>
```

实现:

- 下载打包HTML的插件包

```
npm i html-webpack-plugin -D
```

- 配置`webpack.config.js`，实现HTML打包配置

  - 引入`html-webpack-plugin`插件

  ```javascript
  let htmlWebpackPlugin=require('html-webpack-plugin');
  ```

  - 配置打包插件信息

  ```javascript
  plugins:[ 
    new htmlWebpackPlugin({ 
      template:'要打包的HTML文件路径(参照当前配置文件位置查找目标文件)',  
      filename:'打包后的HTML文件存储在父文件夹的具体位置和名称(参照父文件夹路径)',  
      chunks:['要引入的主JS文件名称(entry属性名)']  
    }), 
    ......
  ]
  ```

  ```javascript
  plugins: [  
    new htmlWebpackPlugin({ 
      template: './src/html/index.html', 
      filename: './html/index.html',  
      chunks: ['index']  
    }), 
    new htmlWebpackPlugin({    
      template: './src/html/login.html',  
      filename: './html/login.html',  
      chunks: ['login']  
    })
  ]
  ```

  - 执行打包命令

  ```
  npx webpack
  ```

优化配置

```javascript
//引入HTML打包插件
let htmlWebpackPlugin = require('html-webpack-plugin');//存储要打包的页面名称
let pageArr = ['index', 'login'];//根据要打包的页面生成plugin值
function getHTMLPlugin(arr) {   
  let htmlArr = [];  
  arr.forEach(pageName => {     
    htmlArr.push(new htmlWebpackPlugin({    
      template: `./src/html/${pageName}.html`,   
      filename: `./html/${pageName}.html`,   
      chunks: [pageName]  
    })); 
  }) 
  return htmlArr;
}
module.exports = {  
  ......
  plugins: [  
    ...
    getHTMLPlugin(pageArr)//配置CSS插件  
  ]
}

```

## 打包CSS

主要作用

- 将当前HTML相关CSS文件合并为一个CSS，并在当前HTML中引入。

实现

- 下载打包CSS的插件、包

```
npm i mini-css-extract-plugin css-loader@5.1.0 -D
```

- 配置`webpack.config.js`，实现CSS打包配置

  - 引入插件

  ```javascript
  let miniCssExtractPlugin=require('mini-css-extract-plugin');
  ```

  - 配置打包插件信息

  ```javascript
  plugins: [  
    .....  
    new miniCssExtractPlugin({   
    filename:'打包后的CSS文件存储在父文件夹的具体位置和名称(参照父文件夹路径)'  
    })
  ]
  ```

  ```javascript
  //引入CSS打包插件
  let miniCssExtractPlugin = require('mini-css-extract-plugin');
  module.exports = {  
    ...... 
    plugins: [  
      ......   
      //配置CSS插件   
      new miniCssExtractPlugin({   
        filename: './css/[name].css'//[name]表示取主JS的entry属性名称  
      })  
    ]
  }
  ```

  - 配置打包规则

  ```javascript
  module:{ 
    rules:[ 
      {         
        test:指定要打包的CSS文件正则,      
        exclude:排除不打包资源的路径正则,   
        use: [miniCssExtractPlugin.loader,'css-loader'] 
      }  
    ]
  }
  ```

  ```javascript
  module.exports = { 
    ...... 
    module: {   
      rules: [      
        {         
          test: /\.css$/i,     
          exclude: /node_modules/,    
          use: [miniCssExtractPlugin.loader, 'css-loader']     
        }     
      ] 
    }
  }
  ```

- 在要使用CSS样式的HTML页面对应主JS中使用`import`语法引入目标CSS文件

```javascript
import '目标CSS文件路径(参照当前主JS查找)'
import './../css/header.css';import './../css/nav.css';
```

- 执行打包命令

```
npx webpack
```

## 打包SCSS

主要作用:

- 将当前HTML页面相关的SCSS文件内容转为CSS语法，并将转换后的结果合并到当前HTML的CSS文件中;

实现:

- 下载包

```
npm i sass-loader sass -D
```

- 配置`webpack.config.js`，实现SCSS资源打包配置:

```javascript
module: { 
  rules: [ 
    ...... 
    //SCSS     
    {        
      test:要打包SCSS资源确定的正则,  
      exclude:排除不打包资源的路径正则,    
      use: [miniCssExtractPlugin.loader, 'css-loader','sass-loader']  
    }  
  ]
}
module.exports = {  
  ......   
  module: {  
    rules: [    
      ......   
      //SCSS     
      {          
        test: /\.s[ca]ss$/i,
        exclude: /node_modules/,  
        use: [miniCssExtractPlugin.loader, 'css-loader', 'sass-loader']    
      }     
    ] 
  }
}
```

- 在要使用SCSS的HTML对应主JS文件中引入目标SCSS文件

```javascript
import '目标SCSS路径(参照当前主JS文件查找)'
//引入SCSS资源
import './../scss/footer.scss';
```

- 执行打包命令

```
npx webpack
```

## 打包图片

主要作用

- 将图片打包并重命名，将小于指定大小的图片转为Base64格式，嵌入到资源文件中。

实现

- 下载包

```
npm i url-loader file-loader html-withimg-loader -D
```

- 配置`webpack.config.js`，实现图片打包配置

```javascript
module.exports = {  
  ......  
  module: {    
    rules: [       
      ......     
      //CSS文件中图片打包配置   
      {        
        test:确定要打包的图片资源正则,  
        type:'javascript/auto',   
        use:{            
          loader:'url-loader',  
          options:{             
            limit:确定转Base64格式的图片大小限制(单位:字节),   
            outputPath:'确定打包后的图片存储在dist的位置',  
            esModule:false       
          }       
        }     
      }, 
      //html文件中图片打包配置      
      {       
        test: 确定要打包的图片资源正则,      
        use: ['html-withimg-loader']     
      }    
    ]   
  }
}
module.exports = {   
  ...... 
  module: {  
    rules: [      
      ......    
      //图片      
      //CSS文件中图片打包配置       
      {        
        test: /\.(png|jpe?g|gif|svg|webp)$/i,  
        type: 'javascript/auto',         
        use: {                 
          loader: 'url-loader',   
          options: {              
            limit: 8 * 1024,//8KB    
            outputPath: './image/',    
            esModule: false          
          }            
        }     
      },       
      //html文件中图片打包配置     
      {         
        test: /\.(htm?l)$/i,      
        use: ['html-withimg-loader']     
      }    
    ]   
  }
}
```

- 执行打包命令

```
npx webpack
```

## 文件复制

主要作用

- 将不需要打包的文件原封不动的复制到打包目录(dist)中。

实现

- 下载包

```
npm i copy-webpack-plugin -D
```

- 配置`webpack.config.js`，实现文件复制配置

```javascript
//引入文件复制插件
let copyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {  
  ...... 
  plugins: [ 
    ......   
    new copyWebpackPlugin({ 
      patterns:[   
        {            
          from:'要复制的文件路径(参照当前配置文件查找)',     
          to:'复制到那个文件中(参照dist查找)'   
        }      
      ]
    })    
  ]
}
```

- 执行打包命令

```
npx webpack
```

## 取别名

主要作用:

- 将指定值用指定名称代替。

实现

- 配置`webpack.config.js`，实现取别名配置

```javascript
module.exports = {   
  ......  
  resolve: {   
    alias: {    
      "别名": 值,      
      ......    
  	}   
  }
}
module.exports = { 
  ...... 
  resolve: {   
    alias: {  
      "@css": path.resolve(__dirname, './src/css'),    
      "@scss": path.resolve(__dirname, './src/scss'),   
      "@js": path.resolve(__dirname, './src/js'),   
      "@util": path.resolve(__dirname, './src/util')  
    }  
  }
}
```

- 使用别名

```javascript
//引入CSS资源
import '@css/header.css';
import '@css/nav.css';
//引入SCSS资源
import '@scss/footer.scss';
//引入JS资源
import '@util/util.js'
```

- 执行打包命令

```
npx webpack
```

## 引入jquery

- 下载jquery

```
npm i jquery
```

- 配置`webpack.config.js`，实现全局使用配置

```javascript
let webpack=require('webpack');
module.exports = {
  ......  
  plugins: [   
    ......  
    new webpack.ProvidePlugin({    
      "$": "jquery"  
    }) 
  ]
}
```

- 在要使用jquery语法的JS中直接使用`$`语法
- 执行打包命令

```
npx webpack
```

## 配置打包服务器

主要作用

- 提供服务器功能，自动检测源码文件改动情况，自动实现资源打包。
- 注意:打包服务器的打包结果存储在内存中

实现

- 下载包

```
npm i webpack-dev-server -D
```

- 配置`webpack.config.js`，实现服务器配置

```javascript
module.exports = { 
  ......
  devServer:{   
    port:'端口号',     
    open:'自动打开的页面路径',   
    hot:布尔值，是否开启热部署(自动检测源码文件改动，重新打包),     
    proxy:配置代理服务器功能
  }
}
module.exports = {  
  ......    
  devServer: {    
    port: '1818',
    open: './html/index.html',  
    hot: true   
  }
}
```

- 执行命令，实现服务器启动(自动打包)

```
npx webpack serve
```

# ES6面向对象

## 类

- 关键字:`class`
- 概念:
  - 具有相同属性(变量)和行为(函数)的一组实体(对象)集合，为该类的所有实体提供了统一的抽象描述。
- 案例:
  - 比如:人类、鸟类、鱼类等。
  - 描述:
    - 静态描述(属性、变量)
      - 姓名
      - 年龄
      - 身高
      - 体重
      - 等
    - 动态描述(函数)
      - 吃饭
      - 睡觉
      - 打豆豆
      - 学习
      - 思考
      - 等

## 对象

- 对象是类的实例，是类的具体实现。

## 语法

- 类

```javascript
class 类名{ 
  constructor(形参列表){  
    this.属性名称=属性值;    
    ......  
  }  
  函数名称(形参列表){
    函数体;
    ......
  }
}
    
class Person {    
  constructor(name, age, height, weight) {  
    //属性定义
    this.name = name;   
    this.age = age;     
    this.height = height;      
    this.weight = weight;  
  } 
  eat(foodName) {  
    console.log(`${this.name}正在吃${foodName}`);
  } 
  sleep() {   
    console.log(`${this.name}正在睡觉~`);
  }
}
```

- 对象
- 创建对象

```javascript
let 对象变量名称=new 类名(实参列表);
let wzObj = new Person('汪圳', 21, 180, 120);
let sgmObj = new Person('宋光明', 20, 181, 119);
```

- 操作属性

```javascript
对象变量名称.属性名称=值;
let 变量名称=对象变量名称.属性名称;
wzObj.name='无名氏';
let n=wzObj.name;
```

- 操作行为

```javascript
let 变量名称=对象变量名称.行为名称(实参列表);
wzObj.sleep();
sgmObj.eat('粽子');
```

## constructor

- 一个特殊函数，被称为`构造函数`、`构造器`。
- 特殊:
  - 结构:没有自定义函数名称，固定为`constructor`;
  - 数量:每个类有且只有一个(如果未显示声明构造函数，系统会自动创建一个无参空构造);
  - 作用:对对象的属性进行初始化(属性定义和赋值);
  - 调用方式:在创建目标类对象时调用，一般在`new`关键字后调用;

## static

- 表示`静态`，该关键字可以用于修饰类属性和行为，表示该属性和行为属于**类**级别，不属于**对象**级别。

- 分类:

  - 类属性

    - 类属性被该类所有对象所共享，属于类级别，可以通过类名直接访问;
    - 语法:

    ```javascript
    class 类名{ 
      //类属性  
      static 属性名称=值; 
    	......
    }
    ```

    ```javascript
    class Person { 
      static waterNum = 90;
    }
    Person.waterNum=60;
    console.log(Person.waterNum);
    ```

  - 类行为

    - 类行为被该类所有对象所共享，属于类级别，可以通过类名直接调用;
    - 注意:在类行为中`this`指代`当前类`;
    - 语法

    ```javascript
    class 类名{  
      static 函数名称(形参列表){  
        函数体; 
      }
    }
    ```

    ```javascript
    class Person{  
      static waterNum = '90%';   
      static water() {   
        if (this.waterNum > 50) {   
          this.waterNum -= 50;   
          console.log(`脱水为:${this.waterNum}`);  
        } else {       
          console.log(`缺水!`);  
        }   
      }
    }
    Person.water();
    ```

- 有`static`通过类名调用，没有`static`通过对象调用;

## this指向

- 在对象行为(函数)中，`this`指代当前对象(谁调用指代谁);
- 在类行为(函数)中,`this`指代当前类(谁调用指代谁);
- 在全局环境中，`this`指代`window`对象;
- 在监听器函数中，`this`指代绑定事件的元素;
- 在箭头函数中，`this`指代当前箭头函数的外层函数环境中的`this`指向值;
- jQuery环境中，`each()`中`this`指代遍历的JS元素;
- 补充:兼容模式下，非特定环境中，`this`默认指向`window`，而严格模式下，非特定环境中，`this`默认指向`undefined`;

# 继承

## 概念

- 面向对象三大特征:==继承==、==封装==、==多态==。
- 生活中:
  - 继承财产;
  - 继承武功;
- 程序中:
  - 继承:从已有类派生出新的类，新的类吸收已有类的属性和行为的同时，在其基础上扩展新的属性和行为;
    - 如:动物类派生出鱼类、鸟类等。
  - 其中，`已有类`被称为`父类`、`超类`、`基类`；派生出的`新类`被称为`子类`、`派生类`;
    - 动物类被称为`父类`，鱼类和鸟类被称为动物类的`子类`;

## 语法

```javascript
class 子类名称 extends 父类名称{    
  constructor(形参列表){    
    super(实参列表);    
    扩展新的属性 
  }  
  扩展新的行为
}
class Animal {  
  constructor(name, color, age) { 
    this.name = name;      
    this.color = color;  
    this.age = age;  
  }  
  eat(foodName) { 
    console.log(`${this.name}正在吃${foodName}`);
  }
}
class Fish extends Animal {  
  constructor(n, c, a, f) {    
    //super关键字指代父类   
    super(n, c, a);     
    //扩展新的属性     
    this.fin = f;   
  } 
  swimming() {    
    console.log(`${this.name}正在游泳`); 
  }
}
let fish = new Fish('小黄鱼', '黄色', 1, 4);
console.log(fish);
fish.eat('虾');
```

# END
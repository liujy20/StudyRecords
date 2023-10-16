## webpack专题

### webpack概念

前端资源静态打包工具。

实际上webpack默认只能打包js代码。

开发过程中，文件尽量拆分很细。

文件越多，相互依赖，相互引入。

代码在运行过程中，希望前端减少对服务器请求。尽量减少js文件

webpack----将复杂的js依赖关系，进行依赖梳理，打包生成最终js代码。



### webpack作用

分析：相互依赖的文件系统，webpack可以分析文件关联关系。打包将核心内容，结合在一起。

压缩：借助于第三方一些工具，对我们代码进行压缩。

打包代码：将负责文件系统，打包称为独立的前端静态资源。html、css、js、png、font



### webpack好处

1. 开发的文件有10M，通过webpack打包工具后，压缩混淆。1M(减少代码体积)
2. 减少文件数量（一个页面都引入20多个外部资源。）
3. 提高整个页面加载速度。



### webpack常见配置

plugins、loader

plugins：插件，扩展了webpack功能。本身webpack内置的工具比较少的。默认提供功能用于打包基础js代码。

但是插件生态非常丰富。你可以根据自己情况来引入插件，进行打包

HtmlWebpackPlugin：打包html代码。webpack默认不能打包html代码。这个插件可以帮助webpack打包html

MiniCssExtractPlugin：打包css代码插件

CopyWebpackPlugin：打包的时候，指定某些文件不经过打包流程，直接copy指定目录



loader：加载器，webpack将一切文件都视为模块。webpack原生只能解析js代码。你想要打包其他资源就必须用到loader。loader作用就是让webpack能够支持非js代码的加载

loader进行用于解析不同文件的。

css-loader、styles-loader、scss-loader、less-loader、url-loader、file-loader、vue-loader



loader就是一种特殊插件。只要因为loader作用针对具体某类文件，主要编译各种文件



### loader何plugins区别

loader也是一种特殊的插件。主要各种我文件文件加载解析。

loader本质是一个函数，改函数可以对接收到内容进行转换。返回解析完成结果。

plugin插件。webpack运行过程中广播很多事件，plugin可以监听这些事件，在不同阶段，执行不同plugin



### webpack优化

1. 如何提高打包速度
   - **优化 Loader**：Loader越多，打包越来。代码抽象AST,AST转化为前端代码
   - **HappyPack**：这个插件plugin中配置，打开多线程的打包。多个loader同时进行
   - **DllPlugin**：将特定一些类库提前打包。下次就不会在重复打包
   - **代码压缩**：默认uglify.js来压缩我们文件。你可以自己配置webpack-parallel-uglify-plugin

1. 如果压缩打包结果
   - 按需加载，比如你们项目中懒加载。路由懒加载。
   - Tree Shaking：可以实现没有使用的插件组件，打包过程中直接去掉。
   - **Scope Hoisting**：分析模块的作用，模块依赖关系。提取公共业务。






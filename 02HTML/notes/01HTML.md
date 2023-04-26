03-HTML

## 一、前端发展

网页开发、web开发、网站开发、移动端开发、微信小程序

91年，第一个网页出现了，早期的网页用于论文传输，学术性研究

Tim Berners-Lee Lee博士，互联网之父

94年，PHP诞生，实现数据的交互和动态的页面模板引擎，为web 2.0时代做了铺垫

lee博士建立W3C组织联盟，主要负责制定前端的开发规则，包含了HTML+CSS+JavaScript等等规则

- web 1.0：页面的内容是写死的，静态页面
- web 2.0：页面中的数据是动态渲染，动态页面

95年，JavaScript出现，只能实现页面动态交互，页面中动画效果

99年，ajax技术和异步技术，标准web 2.0时代的到来

2007年，第一部IPhone发布

14年，HTML 5发布

20年，Vue3.0发布

前端学习的三部分：HTML（网页的骨架） CSS（网页的样式，美化网页） JavaScript（网页的动态效果）

## 二、HTML

Hyper Text Markup Language 超文本标记语言，用于搭建网页结构

- 超文本：通过一系列的超链接将不同空间的资源组合在一起形成一个网状结构。超文本其实就是超媒体的概念，不仅仅指的是页面中纯文本，还包含图片、视频、音频等等
- 标记：指的是标签，一个超文本就需要一个标签去包裹

### html特点：

- 简单性：没有复杂逻辑结构，只需要合理搭配标签就可以构建网页
- 可扩展性：每种HTMLb标签都有自己的用途，新增一种标签就新增一种用途
- 跨平台性：网页运行环境是浏览器，只要设备上有浏览器，就可以让网页正常显示
- 通用性：网页之间是可以相互嵌套，可以正常进行显示

## 三、网页的结构

html文档就是用来描述网页

HTML文本包含了文本和标签

W3C 网址：https://www.w3school.com.cn/

### 1、文档结构

```
<!DOCTYPE  html><html>    <head>        <meta charset="utf-8">        <title>我的第一个网页</title>    </head>    <body>        欢迎来到蜗牛学苑    </body></html>
```

- `<!DOCTYPE html>`：代表网页的文档类型，告诉了浏览器解析网页的规则，大小写均可

- `<html>`：根标签，每个网页只有一个根标签

- `<head>`：代表网页的头部，`<title>`代表网页的标题，内容会显示在浏览器的窗口栏上，`<meta charset="utf-8">`定义网页的编码集

  ```
  <!-- 定义网页的关键字 --><meta name="keywords" content="IT培训,Java开发培训,Web前端培训, 软件测试培训, UI设计培训,网络安全培训, Python测试开发培训,大数据开发培训,程序员培训, IT培训机构, 编程入门教程, IT学习资料"><!-- 定义网页的描述 --><meta name="description" content="致力于培养符合产业发展和创新需求的IT人才，Java开发、Web前端、软件测试、UI设计、网络安全、大数据开发…方向应有尽有，项目驱动教学，大牛全程授课，学习完66个工作日未成功就业退全款，解决你的一切后顾之忧！">
  ```

  - `meta`标签可以定义网页的关键字和网页的描述，有利于SEO优化

- `<body>`：代表网页的主体，内容区域，以后书写网页的结构代码都放入body中

### 2、doctype

H5：既可以采用严格模式，又可以采用混杂模式

```
<!DOCTYPE  html>
```

H4:

```
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

XHTML 1.0 Strict:

```
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
```

作用：

1. 声明文档的类型
2. 声明html的版本，告诉浏览器采用哪个版本的解析规则去解析网页
3. 决定网页的加载模式，告诉浏览器是采用严格模式还是混杂模式来解析网页

#### 网页的加载模式

- 严格模式（标准模式）：严格按照W3C的规范解析网页
- 混杂模式（兼容模式）：浏览器按照自己的规范解析网页

注意：

- 如果doctype和dtd约束条件都声明正确，浏览器采用严格模式解析网页
- 如果doctype不写或dtd约束条件没写或写错了，浏览器采用混杂模式解析网页

## 四、开发工具

- 记事本：太麻烦了

- Dreamweaver：更新太慢

- Hbuilder：vue推荐使用一款开发工具，可以一边开发一边可以看到页面效果，比较耗内存

- webstorm：默认内置了很多的插件，有些不用的插件提前安装好了，导致电脑出现卡顿

- vs code：目前市场上比较主流的开发工具

  微软开发一款软件，不仅仅可以开发前端，还可以开发后端。前端需要使用哪些插件就安装哪些插件，后端需要使用哪些插件就按照哪些插件，不会安装不用的插件。

### 1、插件的安装

1. `Auto Rename Tag`：自动补全标签
2. `Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code`：汉化
3. `HTML CSS Support`：在html支持css提示
4. `HTML Snippets`：自动生成html代码结构，专门针对html代码，h5的结构代码
5. `IntelliSense for CSS class names in HTML`：在html总提示css代码中的class名
6. `Live Server`：将vscode作为一台服务器，让浏览器进行访问，数据是实时更新
7. `open in browser`：可以指定浏览器打开网页，不会实时更新，需要刷新网页
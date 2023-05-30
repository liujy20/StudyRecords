## 网页三大核心技术

- ==HTML==：超文本标记语言
- ==CSS==：层叠样式表
- ==JavaScript==：脚本语言
  - JavaScript核心技术
  - DOM操作
  - BOM操作

### 1、网页交互流程

![image-20230529095031439](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/zhangrui/20230529095038.png)

## DOM简介

### 1、概念

- DOM（Document Object Model）文档对象模型，网页在解析过程中，JavaScript会将页面中所有的标签解析看成一个document的对象，这个对象中包含了一系列的api可以操作页面中的标签，比如标签的增删查改、或修改css样式等等

### 2、浏览器加载流程

#### （1）流程

- 当浏览器加载页面时，先检查是否是html页面
- 将所有的html标签挂载到document对象上面，形成一颗DOM树
- 当浏览器发现有css代码或文件，立即启动CSS解析器，解析css代码
- 当浏览器发现有js代码或文件，立即启动js引擎来解析js代码（v8引擎）
- 最后将css代码和DOM树向相结合，进行页面渲染

#### （2）DOM树

- JavaScript为了方便操作页面中的标签，会将html页面中所有的标签和内容和标签上的属性形成一颗有层结构的文档结构，我们称为“DOM”，因为按照层级进行描述，有点类似一颗倒挂的树，所以称为 DOM 树。
- ![DOm](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/zhangrui/20230529100137.gif)
- 注意：每个html标签都是一个节点，其中属性和文本内容都是一个节点
  - 元素节点：每个html标签就是一个元素节点
  - 属性节点：标签上的每个数据都是一个属性节点
  - 文本节点：标签里文本内容

#### （3）document对象

- 方法：
  - `document.write()`：在页面中输出
- 属性：
  - **`document.body`**：快速获取页面中的body标签
  - **`document.documentElement`**：快速获取页面中的html标签
  - `document.title`：获取title标签中的内容
  - `document.URL`: 获取当前页面的完整地址

## DOM基本操作

### 1、获取HTML标签

#### （1）getElementById()

- 通过标签上的id名获取html标签

- 语法：

  ```javascript
  let 标签变量名=document.getElementById("id属性值");
  ```

- 注意：只能获取到页面中唯一的一个标签，id名是唯一。

#### （2）getElementsByClassName()

- 通过标签上的class名获取标签

- 语法：

  ```javascript
  let 标签变量名=document.getElementsByClassName("class属性值")
  ```

- 注意：

  - 可以获取到页面中所有该class名的标签，是一个类数组的对象，我们可以通过下标获取数据，也可以通过for循环来获取到每个html标签，但是不可以使用`forEach`，会报错

![image-20230529104153707](https://woniumd.oss-cn-hangzhou.aliyuncs.com/web/zhangrui/20230529104153.png)

#### （3）getElementsByTagName()

- 通过标签名获取指定的标签

- 语法：

  ```javascript
  let 标签变量名=document.getElementsByTagName("标签名");
  ```

- 注意：

  - 可以获取到页面中所有该标签名的标签，是一个类数组的对象，我们可以通过下标获取数据，也可以通过for循环来获取到每个html标签，但是不可以使用forEach，会报错

#### （4）querySelector() & querySelectorAll()

- 通过css选择器来获取页面中的标签

- 语法：

  ```javascript
  let 标签变量名=document.querySelector("css选择器")
  
  let 标签变量名=document.querySelectorAll("css选择器")
  ```

- 区别：

  - `querySelector()`：获取的是满足css选择器条件的第一个标签
  - `querySelectorAll()`：获取的是满足css选择器条件的所有标签

- 注意：

  - `querySelectorAll()`获取到的是一个`NodeList`的类数组对象，我们可以通过下标和for循环获取里面的每个标签，也可以使用forEach()来遍历获取到每个html标签，但是不能使用其他的数组相关api。

  ```javascript
  let items = document.querySelectorAll(".container .item");//获取所有满足条件的标签
  console.log(items); 
  console.log(items[0]);
  
  // for
  for(let i=0;i<items.length;i++){   
    console.log(items[i]);
  }
  
  // forEach()
  items.forEach(elem=>{    
    console.log(elem);
  })
  ```

### 2、修改HTML标签

流程：

1. 先获取需要操作的标签
2. 再获取/修改标签上的内容或属性

#### （1）获取/修改标签的内容

##### innerText

- 获取/修改标签内容的文本内容

- 语法：

  ```javascript
  1. 获取标签的内容标签
  变量名.innerText
  
  2. 修改标签的内容标签
  变量名.innerText = 新数据;
  ```

##### innerHTML

- 获取/修改标签内的HTML代码（包含子标签和文本内容）

- 语法：

  ```javascript
  1. 获取标签的内容标签
  变量名.innerHTML
  
  2. 修改标签的内容标签
  变量名.innerHTML = 新数据
  ```

##### innerText和innerHTML的区别

- `innerText`：获取标签内的所有纯文本，只包含纯文本；修改内容时不会将标签进行解析，会原样输出。
- `innerHTML`：获取标签内的所有代码，包含了子标签和文本；修改内容时会把完整的标签进行解析

#### （2）获取/修改标签的属性

##### 获取属性

- `getAttribute()`：获取某个标签上的属性名对应的属性值

- 语法：

  ```javascript
  1. 获取某个属性名对应的属性值标签
  变量名.getAtrribute("属性名");
  
  2. 获取标签上自带的属性标签
  变量名.属性名标签变量名.attributes;//获取标签上所有的属性标签
  变量名.attributes[2];//获取当前标签上某个属性标签
  变量名.id标签变量名.className//js中class属性的关键字
  ```

##### 修改属性

- `setAttribute()`：设置标签上指定的属性名的属性值

- 语法：

  ```javascript
  1. 设置标签上自带的属性标签
  变量名.属性名 = "属性值";
  
  2. 设置标签上某个属性名的属性值标签
  变量名.setAttribute("属性名","属性值")
  ```

##### 删除属性

- `removeAttribute()`：将标签上指定的属性名删除

- 语法：

  ```javascript
  标签变量名.removeAttribute("属性名")
  ```

## 事件基础

### 1、事件概念

- 我们通常把用户根页面之间所有交互动作成为事件。每一个动作就是一个事件，比如：点击，双击，鼠标移入，鼠标移出等
- JavaScript可以实现当某个事件触发，可以执行指定的代码。

### 2、事件三要素

- 事件源：触发时间的标签
- 事件类型：
  - 点击
  - 双击
  - 鼠标移入
  - 鼠标移出
- 事件处理程序：当事件发生时，需要执行的执行代码或操作。指定的代码一般会放在一个函数中。

## 事件的基本使用

### 1、DOM发展

- DOM 0级和DOM 1级：早期js操作html标签是浏览器厂商自己实现的，没有统一的标准的，到98年左右，才有第一套标准：DOM 1级

- DOM 1级：可以对`html`标签进行增删查改

- DOM 2级：添加了DOM 对时间以及`css`样式的相关操作，也是目前普及的版本

- DOM 3级：将DOM进行了模块化，添加了很多的新特性，针对XML部分

  根据JS的版本，用的比较多的版本：DOM 0级 和DOM 2级

### 2、添加事件

DOM提供了三种条件事件的方式：

- HTML标签的事件属性
- DOM 0级事件
- DOM 2级事件

#### （1）HTML标签的事件属性

- 语法：

  ```html
  <div  on事件类型="js代码">   
    内容
  </div>
  
  例子：
  <button onclick="demo()">
    按钮1
  </button>
  <script>  
      function demo() {      
        alert('这是一个点击事件');   
        alert("今天周一"); 
        alert("六一儿童节快到了")   
      }
  </script>
  ```

  - `click`就是一个事件类型，代表单击事件

#### （2）DOM 0级事件

- 语法：

  ```javascript
  标签变量名.on事件类型=function(){ 
    当事件触发时需要执行的代码
  }
  ```

- 好处：

  - 将html和js代码分离开了，以后项目维护会比较方便
  - **兼容IE低版本**

- 缺点：

  - 不能在同一个标签上设置多个同类型的事件。比如：同一个标签上不能设置多个点击事件

#### （3）DOM 2级 事件

- 语法：

  ```javascript
  写法一：
  标签变量名.addEventListener("事件类型",function() { 
    当事件触发时需要执行的代码
  })
  
  写法二：
  标签变量名.addEventListener("事件类型",函数名)
  function  函数名() {   
    当事件触发时需要执行的代码
  }
  ```

- 好处：

  - 将html和js代码分离开了，以后项目维护会比较方便
  - 可以在同一个标签上设置多个同类型的事件

- 缺点：

  - 不支持IE8及以下版本

### 3、删除事件

#### （1）HTML标签的事件属性

- 将事件属性从标签上移出

- 语法：

  ```javascript
  标签变量名.removeAttribute("on事件类型");
  ```

#### （2）DOM 0级事件

- 将事件处理程序赋值为null即可

- 语法：

  ```javascript
  标签变量名.on事件类型 = null;
  ```

#### （3）DOM 2级事件

- DOM 2级如果需要删除事件，需要通过`removeEventListener`来删除事件

- 注意：删除和添加事件时的函数名和时间类型必须一致。

- 语法：

  ```javascript
  标签变量名.addEventListener("事件类型",函数名)
  function  函数名() {   
    当事件触发时需要执行的代码
  }
  
  删除事件标签变量名.removeEventListener("事件类型",函数名)
  ```

## 事件流

### 1、概念：

- 概念：事件流是指某个事件在触发时，该事件在嵌套标签之间的触发顺序。也就是说，当父子标签设置同类型的事件时，当触发了子标签的事件，父子标签之间的触发顺序。
- 分类：根据流向不同分为：冒泡和捕获

### 2、冒泡

- 事件触发的顺序是从具体的子标签开始触发，之后父标签触发事件，一直到顶层的html标签触发事件，之后JavaScript还会触发document对象和window进行触发【从子到父】

```javascript
完整冒泡的顺序：span ->div-->body-->html-->document--->window
// DOM 0级
document.querySelector("span").onclick = function () {   
  console.log("span被点击了");
}
document.querySelector("div").onclick = function () {   
  console.log("div被点击了");
}
document.body.onclick = function () {   
  console.log("body被点击了");
}
document.documentElement.onclick = function () { 
  console.log("html被点击了");
}
document.onclick = function () {   
  console.log("document被点击了");
}
window.onclick = function () {  
  console.log("window被点击了");
}
```

### 3、捕获

- 事件触发的顺序跟冒泡顺序完全相反，从window对象到document对象，再到最顶层html标签，依次找到具体的子标签【从父到子】

  ```javascript
  完整捕获的顺序：window-->document-->html-->body-->div-->span
  ```

![image-20230530174102882](C:\StudyRecords\05DOM\notes\DOM.assets\20230530174102.png)

## 事件处理程序

DOM 0级和DOM 2级默认都是冒泡

### 1、DOM 0级

DOM 0级**只支持冒泡**，不支持捕获

### 2、DOM 2级

DOM 2级既可以支持冒泡，也可以支持捕获。

#### （1）添加事件处理程序

- 语法：

  ```javascript
  标签变量名.addEventListener("事件类型",函数名,是否捕获阶段处理)
  function 函数名(){}
  第三个参数：true代表捕获，false代表冒泡，不写默认是冒泡
  ```

#### （2）删除事件处理程序

- 语法：

  ```javascript
  标签变量名.removeEventListener("事件类型",函数名,是否捕获阶段处理)
  第三个参数：true代表捕获，false代表冒泡，不写默认是冒泡
  ```

总结：**如果同时存在冒泡和捕获，先执行捕获，再执行冒泡。**

## END
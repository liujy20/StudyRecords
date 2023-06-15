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

### 3、添加HTML标签

#### （1）使用innerHTML来添加

【流程】

1. 先在页面上使用`innerHTML`获取到标签中原来的内容
2. 将新的标签的字符串拼接到原来的内容之后
3. 再使用`innerHTML`将拼接后的字符串替换掉标签中的内容

```html
<ul class="list"> 
  <li>评论一：该商品好吃不贵</li> 
  <li>评论二: 经济实惠，难吃到死</li>
</ul>
<script> 
  // 用户输入一条评论，在页面添加一条评论   
  let input = prompt("请输入你的评论");   
  console.log(input);  
  let list = document.querySelector(".list"); 
  // 获取之前的内容，进行字符串拼接，将新数据拼接上去
  let temp = list.innerHTML; 
  temp += `<li>${input}</li>`  
  console.log(temp);
  list.innerHTML = temp;
</script>
```

#### （2）使用api来添加html标签

【流程】

1. 先使用`document.createElement()`来新建一个标签
2. 设置新标签的内容和标签上的属性（根据实际情况而定）
3. 再使用`appendChild()`和`insertBefore()`将新标签添加到指定的位置

##### createElements()

- `document.createElement()`：新建一个标签

- 语法：

  ```javascript
  let 标签变量名=document.createElement("标签名");
  ```

- 注意：在程序中新建了一个标签，还没有放入页面中，该标签默认是没有内容和标签上的属性。

##### appendChild()

- `appendChild()`：将新标签作为页面中指定标签的最后一个子标签添加到页面中

- 语法：

  ```javascript
  父标签变量名.appendChild(新标签变量名);
  ```

##### insertBefore()

- `insertBefore()`：将新标签插入到父标签的指定的兄弟标签之前

- 语法：

  ```javascript
  父标签变量名.insertBefore(新标签变量名,兄弟标签变量名);
  ```

### 4、删除HTML标签

#### （1）remove()

- `remove()`：删除指定的HTML标签

- 语法：

  ```javascript
  待删除的标签.remove();
  ```

#### （2）removeChild()

- `removeChild()`：删除父标签中指定的子标签

- 流程：

  1. 找到待删除的标签及其父标签
  2. 通过父标签来调用方法来删除子标签

- 语法：

  ```javascript
  父标签变量名.removeChild(待删除的子标签);
  ```

#### （3）批量删除

- 先找到需要删除的所有标签，通过遍历获取到每个标签，每个标签再调用`remove()`或`removeChild()`来进行删除标签的操作

```javascript
let lis = document.querySelectorAll(".list li");
console.log(lis);
lis.forEach(elem=>{   
  // console.log(elem);   
  elem.remove()
})
```

- 如果删除指定标签里面所有的子标签和内容时，可以使用`innerHTML`或`innerText`来达到快速删除的目的

```javascript
let box = document.querySelector(".box");
console.log(box);
box.innerHTML="";box.innerText="";
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

## 事件委托/代理

- 概念：事件委托指的是多个子标签需要添加同类型的事件，可以将该事件直接添加父标签上，也就是说将子标签的事件委托父标签
- 原理：借助冒泡机制和event对象中even.target
- 流程：
  1. 给父标签添加事件处理程序
  2. 当触发事件时，在实际处理程序中可以通过`event.target`可以获取到当前触发事件的标签
  3. 可以通过当前触发事件标签的id名或class名或内容等来判断执行不同的代码
- 好处：
  - 减少了添加事件处理程序的操作
  - 统一管理子标签的事件处理程序
  - 维护比较方便

### event对象

- 所有事件绑定都会自动生产一个对象，这个对象中包含了事件传递的所有所有信息，通常使用`event`或`e`来接收

### 获取event对象

- 语法：

  ```javascript
  DOM 0级
  标签变量名.on事件类型=function(event){
    
  }
  DOM 2级
  标签变量名.addEventListener("事件类型",function(event){})
  ```

- 注意：形参一般采用`e`或`event`表示

### event对象的属性

| 属性名            | 描述                                                     |
| ----------------- | -------------------------------------------------------- |
| **`target`**      | 获取用户当前操作的标签（即触发事件的标签）               |
| `currentTarget`   | 指的是当前事件执行阶段正在处理的标签                     |
| `pageX/pageY`     | 获取鼠标相对于页面的坐标                                 |
| `clientX/clientY` | 获取鼠标相对于视口的坐标                                 |
| `offsetX/offsetY` | 获取鼠标相对于触发事件的标签的左上角的坐标（不包含边框） |

### event对象的属性

| 方法名                  | 描述                                                         |
| ----------------------- | ------------------------------------------------------------ |
| **`stopPropagation()`** | 阻止事件传播                                                 |
| **`preventDefault()`**  | 阻止标签上的默认行为（比如a标签的跳转或button按钮的提供功能） |

## 关于 DOM 操作表单元素

### 1、value

- `value`针对表单标签，用于获取`input`、`select`以及具有value属性的表单标签的值

- 语法：

  ```javascript
  1. 获取值标签变量名.value
  2. 设置值标签变量名.value = 新数据;
  ```

### 2、输入框事件类型

- `blur`：当标签失去焦点时触发事件
- `focus`：当标签获取焦点时触发事件

### 3、下拉列表

- 可以`value`来获取到标签当前选中的`option`标签上的value值

- 语法：

  ```javascript
  1. 获取值标签变量名.value
  例子：
  <select name="" id="sel">     
  	<option value="身份">身份证</option>       
  	<option value="学生">学生证</option>    
  	<option value="军官">军官证</option>
  </select>
  
  let select = document.querySelector("#sel");
  console.log(select.value);
  ```

### 4、change事件

- `change`：当表单元素的值发生改变时来触发该事件

- 常用于下拉列表

- 语法：

  ```javascript
  let select = document.querySelector("#sel");
  select.onchange = function () {  
    console.log(select.value);
  }
  ```

### 5、单选框&多选框

- 页面中一般不只一个单选框或多选框，我们可以通过选择器来获取到这些标签，通过遍历或事件委托来添加事件。一般使用`click`或`change`事件都可以

#### （1）选中状态

- 可以在单选框或多选框上设置`checked`属性来设置标签是否默认选中

- 语法：

  ```javascript
  1. 获取单选框&多选框选中状态
  标签变量名.checked; // true代表选中状态，false代表未选中状态
  
  2. 设置单选框&多选框选中状态
  标签变量名.checked = true 或false; // true代表选中状态，false代表未选中状态
  ```

## DOM 操作 CSS 样式

### 1、获取&设置CSS样式

- 语法：

  ```javascript
  1. 获取css样式
  标签变量名.style.css属性名；
  2. 设置css样式
  标签变量名.style.css属性名 = "属性值";
  ```

- 注意：

  - css属性名如果是多个单词构成，使用小驼峰命名法
  - 设置或获取的是标签的内联样式，也就是标签上style属性里面的值
  - 无法获取到内部样式和外部样式

### 2、获取所有的css属性值

- 通过`getComputedStyle()`方法来获取指定标签上所有最终的css样式

- 语法：

  ```javascript
  //1. 调用`getComputedStyle()`来获取指定标签上最终的css样式
  let style变量名 = getComputedStyle(标签变量名, null);
  //获取指定标签的伪元素的样式
  let style变量名 = getComputedStyle(标签变量名, "after");//获取的是指定标签的::after的样式
  //2. 通过css属性名来获取指定的CSS样式 
  style变量名.css属性名;//css属性名如果是多个单词构成，使用小驼峰命名法
  ```

## 定时器

- 定时器：是指一段时间之后或每隔一段时间执行指定的代码
- 分类：
  - 延时定时器：能够在一段时间之后执行指定的代码。
  - 间隔定时器：每隔一段时间执行指定的代码

### 1、延时定时器

- 概念：能够在一段时间之后执行指定的代码

- `setTimeout()`：设置延时定时器

- 语法：

  ```javascript
  let  定时器标识符=setTimeout(function(){    
    js代码
  },延时时间)
  ```

  - 注意：时间是以**毫秒**为单位，1s=1000ms

- `clearTimeout`：停止未执行的延时定时器

- 语法：

  ```javascript
  clearTimeout(定时器标识符);
  ```

  - 定时器标识符是每个定时器独有的数字，类似于定时器的`身份证号`。

### 2、间隔定时器

- 间隔定时器：每隔一段时间执行指定的代码

- `setInterval()`：设置间隔定时器

- 语法：

  ```javascript
  let  定时器标识符=setInterval(function(){ 
    js代码
  },延时时间)
  ```

- `clearInterval()`：关闭间隔定时器

- 语法：

  ```javascript
  clearInterval(定时器标识符)
  ```

## 事件类型

### 1、框架/对象事件

| 事件类型 | 说明                                     |
| -------- | ---------------------------------------- |
| `load`   | 在页面加载完成之后、图片加载完成之后触发 |
| `resize` | 当页面尺寸发生变化时触发                 |

#### （1）load

- 加载完成之后触发事件

- 语法：

  ```javascript
  1. 等页面加载完成之后触发
  window.onload = function () { 
    js代码
  }
  
  2. 图片加载完成之后执行指定的代码
  let img= document.querySelector("img");
  img.onload=function(){   
    console.log("图片已经加载完成");
  }
  ```

#### （2）resize

- 当页面发生变化时触发

- 语法：

  ```javascript
  window.onresize=function(){
    
  }
  ```

### 2、鼠标事件

| 事件类型     | 说明                   |
| ------------ | ---------------------- |
| `click`      | 鼠标单击时             |
| `dblclick`   | 鼠标双击时             |
| `mousedown`  | 鼠标按下时             |
| `mouseup`    | 鼠标松开时             |
| `mouseover`  | 鼠标指针进入标签时触发 |
| `mouseout`   | 鼠标指针离开标签时触发 |
| `mouseenter` | 鼠标指针进入标签时触发 |
| `mouseleave` | 鼠标指针离开标签时触发 |
| `mousewheel` | 鼠标滚轮滚动时触发     |

- 注意：
  - `mouseover`和`mouseout`:鼠标移动到自身标签会触发事件，移动到子标签会再次触发事件
  - `mouseenter`和`mouseleave`:鼠标移动到自身标签会触发事件，移动到子标签不会再次触发事件

### 3、键盘事件

| 事件类型   | 说明                       |
| ---------- | -------------------------- |
| `keydown`  | 当键盘按键按下时触发       |
| `keypress` | 当键盘按键按下并松开时触发 |
| `keyup`    | 当键盘按键松开时触发       |

- 顺序：keydown —— keypress ——keyup

### 4、表单事件

| 事件类型 | 说明                                                         |
| -------- | ------------------------------------------------------------ |
| `blur`   | 输入框失去焦点时触发                                         |
| `focus`  | 输入获取焦点时触发                                           |
| `change` | 表单元素改变内容或状态时触发                                 |
| `input`  | 输入框内容发生改变时触发（input或textarea的发生变化）【实时】 |

## BOM

### 1、BOM概念

- BOM（Browser Object Model）浏览器对象模型，指定JavaScript将浏览器抽象成了一个对象，对象中包含很多api，这些api可以实现页面跳转、页面刷新等等相关操作

### 2、BOM和DOM关系

![image-20230324105840671](C:\StudyRecords\05DOM\notes\DOM.assets\zhaijizhe20230324105846.png)

在BOM中，包含了很多对象

- window对象：浏览器窗口对象
- location对象：浏览器url地址对象
- history对象：浏览记录对象
- screen对象：屏幕对象
- navigator对象：浏览器对象
- document对象：文档对象

由于document对象包含了太多的内容， 因此，W3C将document对象单独独立出来，做成一套规范，取名DOM。

## window对象

### 1、window对象的特点

- 在使用window对象时，可以省略`window.`前缀

- 语法：

  ```javascript
  alert("明天周五，后天周六")// 等价于window.alert("明天周五，后天周六")
  ```

### 2、window对象相关api

- `comfirm()`：用于在页面中显示一个确认框，返回的是一个布尔值

- `close()`：用于关闭窗口

- `open()`：用于打开页面

  ```javascript
  open("页面地址","_self或_blank","浏览器窗口的尺寸和位置")
  例子：open("https://www.woniuxy.com","_blank","width=500px,height=200px,top=300px,left=500px")
  ```

- `innerWidth`&`innerHeight`：获取到整屏的宽度和高度

  ```
  console.log(innerWidth, innerHeight);
  ```

- `outerWidth`&`outerHeight`：获取窗口的宽度和高度（即innerWidht+浏览器工具栏的宽度，innerHeight+浏览器工具栏的高度）

## window四大内置对象

### 1、location对象

- 是属于window对象，location本身也是一个对象，内置了一下api，能够实现页面刷新、跳转等

#### （1）获取页面的信息

- **`location.href`**：获取页面完整的地址信息
- **`location.search`**：获取页面地址中从其他页面传递过来的数据，以后可以使用字符串的api来对数据进行处理。

```javascript
let result = decodeURIComponent(location.href);
//http://127.0.0.1:5500/11-location对象.html?username=张三&password=123&mytype=身份&gender=1&hobby=lol&hobby=cj&des=123456
console.log(result);
console.log(decodeURIComponent(location.search));
//?username=张三&password=123&mytype=身份&gender=1&hobby=lol&hobby=cj&des=123456
```

#### （2）页面跳转

- `location.href`：跳转到指定的页面，新建一条浏览历史记录

- `location.assign()`：跳转到指定的页面，新建一条浏览历史记录

- `location.replace()`：跳转到指定页面，替换掉当前的浏览历史记录，无法后退到上一步

- 语法：

  ```javascript
  location.href = "要跳转的页面地址";
  location.assign("要跳转的页面地址")location.replace("要跳转的页面地址")
  ```

#### （3）页面刷新

- `reload()`：可以刷新当前页面

- 语法：

  ```javascript
  location.reload()
  ```

##### 注意：转为中文地址j

- `decodeURIComponent()`：将中文正常显示

- 语法：

  ```javascript
   let 变量名= decodeURIComponent(location.href)
  ```

### 2、history对象

- 主要负责页面前进或后退的操作，和浏览器的历史记录有关

- `history.forward()`：前进一步

- `history.back()`：后退一步

- `history.go()`：前进或后退步数，根据传入的数字的正负来决定是前进还是后退，正数是前进，负数时后退

- 语法：

  ```javascript
  history.forward()
  history.back()
  history.go(2);//前进2步
  history.go(-2);//后退2步
  ```

### 3、navigator

- 保存了浏览器的版本相关信息
- `navigator.userAgent`：保存了浏览器的版本信息

### 4、screen

- 保存了屏幕的相关的信息，作为了解，因为兼容性问题，实用性不强

## 正则表达式

正则对象，我们通常称为正则表达式（Regular Expression），翻译“规则表达式”。

我们可以使用正则表达式来定义一个规则，可以用来对字符串进行验证等操作。

### 1、创建正则

#### （1）字面量形式

- 语法：

  ```javascript
  let regExp=/规则/修饰符;
  ```

#### （2）构造函数形式

- 语法：

  ```javascript
  let regExp=new RegExp('规则',修饰符);
  ```

注意：当我们在创建正则式，规则是必须的，修饰符是可选的。

### 2、正则的方法

| 方法名       | 参数   | 说明                           | 返回值     |
| ------------ | ------ | ------------------------------ | ---------- |
| **`test()`** | 字符串 | 判断字符串中是否匹配正则表达式 | 布尔值     |
| `exec()`     | 字符串 | 根据正则在字符串中查找对应的值 | null或数组 |
| `compile()`  | 字符串 | 修改正则的规则                 | 无         |

### 3、正则的规则

#### （1）方括号规则

| 表达式   | 说明                         |
| -------- | ---------------------------- |
| `[abc]`  | 包含`[]`中任意一个字符       |
| `[^abc]` | 包含除了`[]`之外任意一个字符 |
| `[0-9]`  | 包含任意数字                 |
| `[a-z]`  | 包含小写a-z的字母            |
| `[A-Z]`  | 包含小写A-Z的字母            |

#### （2）元字符

| 元字符 | 说明                                                         |
| ------ | ------------------------------------------------------------ |
| `/\w/` | 包含所有的数字、字母、下划线中任意字符，相当于`/[0-9A-Za-z_]/` |
| `/\W/` | 包含除了数字、字母、下划线以外的其他任意字符，相当于`/[^0-9A-Za-z_]/` |
| `/\d/` | 包含所有的任意的数字，相当于`/[0-9]/`                        |
| `/\D/` | 包含除了数字以外的其他任意字符，相当于`/[^0-9]/`             |
| `/\s/` | 包含空白字符（空格）                                         |
| `/\S/` | 包含除了空白字符以外的其他任意字符                           |

#### （3）量词

| 量词       | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| `/n+/`     | 包含至少一个指定的字符，可以理解为n连续出现的次数为>=1       |
| `/n*/`     | 指定字符可有可无，可以理解为n出现的次数为>=0                 |
| `/n?/`     | 指定的字符出现0次或1次                                       |
| `/n{x}/`   | 指定字符出现的次数为x次                                      |
| `/n{x,}/`  | 指定字符至少出现x次数，可以理解为n出现的次数为 >=x           |
| `/n{x,y}/` | 指定字符至少出现x次数，最多出现y次，，可以理解为n出现的次数为 >=x 并且<=y |

#### （4）开始和结束

| 符号   | 说明             |
| ------ | ---------------- |
| `/^n/` | 是以指定字符开头 |
| `/n$/` | 是以指定字符结束 |

注意：只有对字符串的内容进行验证，都会在正则中添加开头`^`和结束`$`。

#### （5）其它字符

| 字符 | 说明                                                         |          |
| ---- | ------------------------------------------------------------ | -------- |
| `.`  | 大体上可以理解为通配符（实际上不能匹配一些字符，例如换行符、制表符、回车符） |          |
| `    | `                                                            | 表示或者 |
| `()` | 对规则进行分组                                               |          |
| `\`  | 转义字符                                                     |          |

#### （6）修饰符

| 修饰符 | 说明                                                 |
| ------ | ---------------------------------------------------- |
| `i`    | 不区分大小写                                         |
| `g`    | 对所有的字符串进行匹配（而不是找到第一个匹配就结束） |
| `m`    | 多行匹配（即在每行的文本末尾时会继续下一行）         |

- `g`和`m`作为了解

## END




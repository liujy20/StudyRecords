## avaScript简介

### 1、编程语言

- 概念：用于编写程序的计算机语言
- 计算机语言：为了能够让计算机完成人们通过代码编写的程序处理其他的事情，可以让人和计算机进行沟通
- 程序：指的是一堆有序代码的集合，即计算机软件

### 2、常见的编程语言

- C语言
- C#
- C++
- java
- Python
- go语言
- …

## JavaScript介绍

### 1、 发展

- 90年代，浏览器出现之后，普通的用户可以通过浏览器上网进行信息浏览，只是图片和文本，没有太多的交互

- 微软和网景各自开发一套能够直接运行在浏览器上的编程语言，提高了用户体验

  微软和网景为了抢占市场，网景一看打不过，有个程序员花了十天开发了JavaScript

  - 网景：livescript 后面改名成了JavaScript，为了蹭Java的热度
  - 微软：JScript

- 网景一看打不过，将JavaScript交给了欧洲计算机制造商协会（ECMA）

- 网景公司通过国际化组织联盟将JavaScript作为了标准，ECMA在96年提出了第一版正式版本（ECMAscrpt）,因为大家都习惯叫JavaScript，一直沿用至今

### 2、版本

- 99年，发布第3版，普及度比较高，包含了基础核心内容
- 09年，发布了第5版，目前用得比较多的版本，俗称ES 5
- 15年，发布了第6版，官方命名为ECMAScript 2015，俗称为ES6

#### 3、JavaScript组成

- 一个完整的JavaScript是由以下几部分构成：
  - ECMAscript ：JavaScript的核心内容
  - JavaScript BOM：负责和浏览器进行交互
  - JavaScript DOM：负责和浏览器中标签进行交互

## JavaScript基础

### 1、JavaScript的使用

- 在浏览器中的使用

#### （1）内部js

- 在页面中添加`<script>`标签，在标签中书写js代码

- 语法：

  ```html
  <script>js代码</script>
  ```

- 注意：可以在页面中任意位置添加`<script>`来书写js代码，一般放在结构代码之后

#### （2）外部js

- 先创建一个后缀名为`.js`的文件，在里面书写js代码，在通过`<script>`标签引入js文件即可

- 语法：

  ```html
  <script src="连接外部的js文件即可"></script>
  ```

- 注意：

  - 可以在同一个页面中引入多个js文件，每个js文件都需要一个`script`标签进行引入
  - 打开网页时，浏览器会按照`<script>`标签的顺序依次加载js代码，并执行

### 2、注释

- 用于解释说明，不会执行

#### （1）单行注释

- 语法：

  ```javascript
  // 注释  ctrl+/
  ```

#### （2）多行注释

- 语法：

  ```javascript
  /*  
  多行注释 
  alt+shift+A */
  ```

#### （3）文档注释

- 特殊的多行注释，更多用于对一大段代码（函数）进行注释

- 语法：

  ```javascript
  /*** 文档注释
  * 
  * 
  */
  ```

## 二、JavaScript的输入与输出

### 1、JavaScript输出

#### （1）document.write()

- 在页面中输出内容

- 语法：

  ```javascript
  document.write(要输出的内容);
  
  例子： 
  document.write("Hello word!");//Hello word!
  ```

- 注意：

  - 如果输出的内容是字符串，会将引号中的内容原样输出
  - 如果输入的内容是完整的html标签，浏览器会将该标签解析

#### （2）console.log()

- 在浏览器的控制台输出指定的内容

- 语法：

  ```javascript
  console.log(要输出的内容);
  ```

#### （3）alert()

- 在页面中是以弹窗形式输出内容

- 语法：

  ```javascript
  alert(要输出的内容);
  
  例子：
  alert("限购5件");
  ```

### 2、JavaScript输入

#### （1）prompt()

- 可以将用户输入的信息保存在程序中，可以通过输出将信息输出到页面中，也可以通过变量来保存数据

- 语法：

  ```javascript
  prompt(提示性信息);
  ```

- 注意：

  - 如果未输入内容点击确定，得到空字符，如果未输入内容点击取消，得到`null`
  - prompt拿到的数据是字符串类型，如果使用`+`，将字符串的数据拼接在一起。

## 三、变量

- 概念：在程序中，用于保存数据的一个容器，这个容器中的数据可以在程序中重复使用
- 使用：
  1. 先定义变量，声明变量，可以同时保存数据
  2. 通过变量名可以使用所保存的数据

### 1、定义变量

- 语法：

  ```javascript
  var 变量名 = 要保存的数据；
  var 变量名;
  ```

- 变量名命名规范：

  - 变量名是由数字、字母、_和$构成
  - 不能以数字开头，不能包含其他 的特殊符号
  - 不能使用JavaScript的关键字，比如：var，console等
  - 尽量见词达义，比如：age，height等

- 驼峰命名法：

  - 大驼峰：所有的单词的首字母都大写

    比如：MyName、FirstName，常用于类名命名。

  - 小驼峰：第一个单词全小写，其他单词首字母都大写

    比如：myName，firstName等，常用与变量、函数的命名

- 注意：

  - 如果变量只定义，没有保存数据（未赋值），输出得到`undefined`

### 2、使用变量

- 语法：

  ```javascript
  //在程序中直接使用变量名
  a = 1;
  console.log(a);
  ```

- 注意：

  - 如果变量没有直接使用，程序会报错。变量必须先定义再使用。

    ![image-20230518142258954](C:\StudyRecords\04javascript\notes\JavaScript.assets\20230518142306.png)

### 3、修改变量

- 语法：

  ```javascript
  变量名 = 新数据;
  a = 1;
  ```

### 4、var、let、const

var、let、const都可以用于定义变量

- 区别：
  - ==var==：可以重复声明该变量，可以在声明变量之前使用，后续可以更改变量保存的数据
  - ==let==：不可以重复声明该变量，不可以在声明变量之前使用，后续可以更改变量保存的数据
  - ==const==：不可以重复声明该变量，不可以在声明变量之前使用，后续不可以更改变量保存的数据。用于保存常量

## 四、数据类型

### 1、生活中的数据

- 数字：电话号码，身份证号、年龄、余额、收入、支出等等
- 文本：姓名、性别、地址等等
- 日期：出生日期，生产日期等

### 2、程序中的数据类型

![image-20230518150605513](C:\StudyRecords\04javascript\notes\JavaScript.assets\20230518150605.png)

#### （1）基本数据类型（7种）

- `number`：表示数字，比如：1,2,3,4.6等

- ```javascript
  string
  ```

  ：表示字符串，即文本，比如：”中国“，”宋光明”，“hello word”，“123”等

  - 字符串是由一对双引号或单引号包裹的一段文本

- ```javascript
  boolean
  ```

  ：表示布尔值，表示程序中正确或错误，只有两个值

  - `true`：表示正确（真）
  - `false`：表示错误（假）

- ```javascript
  undefined
  ```

  ：特殊值，表示未定义，同时也是每个变量的默认值

  - 未声明的变量：变量未声明直接使用，那么程序会报错
  - 未定义的变量：变量声明了但是没有保存数据（未赋值），它的默认值是undefined

- ```javascript
  null
  ```

  ：特殊值，表示空

  - `typeof null`：得到的是object，浏览器在检测时会将二进制中前三位为0的解析为object，而null的二进制中全为0

- `symbol`:表示唯一值

- `bigint`：表示超大数，常用于科学计数

#### （2）引用数据类型（1种）

- `object`：表示对象，表示引用数据类型，对象是一种复合数据类型，比如对象、数组等等。

##### 查看数据的数据类型

- 语法：

  ```javascript
  typeof  变量名/数据;
  ```

### 3、数据类型之间的转换

#### （1）转为数字类型

##### Number()

- 将字符串或其它类型的数据转为数字类型，如果有小数，则保留

  - 字符串：纯数字的字符串可以转为number，否则得到`NaN`
  - 布尔值：true转为1，false转为0
  - undefined：得到NaN
  - null：转为0

- 语法：

  ```javascript
  Number(数据);
  例子：
  console.log(Number("123"));//123
  console.log(Number("12.3"));//12.3
  console.log(Number("12.3px"));//NaN Not a number 不是一个数字
  console.log(Number("a12.3px"));//NaN Not a number 不是一个数字
  console.log(Number(true));//1
  console.log(Number(false));//0
  console.log(Number(undefined));//NaN
  console.log(Number(null));//0
  ```

##### parseInt()

- 将字符串转为一个整数，不会保留小数部分

  - 字符串：开头是以数字开头的字符串会将整数部分转为数字，其他的不能转换得到NaN

- 语法：

  ```javascript
  parseInt(数据);
  例子：
  console.log(parseInt("123"));//123
  console.log(parseInt("12.3"));//12
  console.log(parseInt("12.3px"));//12
  console.log(parseInt("a12.3px"));//NaN
  console.log(parseInt(true));//NaN
  console.log(parseInt(false));//NaN
  console.log(parseInt(undefined));//NaN
  console.log(parseInt(null));//NaN
  ```

##### parseFloat()

- 将字符串转为数字，会保留小数部分

- 语法：

  ```javascript
  parseFloat(数据);
  例子：
  console.log(parseFloat("123"));//123
  console.log(parseFloat("12.3"));//12.3
  console.log(parseFloat("12.3px"));//12.3
  console.log(parseFloat("a12.3px"));//NaN
  console.log(parseFloat(true));//NaN
  console.log(parseFloat(false));//NaN
  console.log(parseFloat(undefined));//NaN
  console.log(parseFloat(null));//NaN
  ```

#### （2）转为字符串

##### toString()

- `toString()`：将数字转为字符串

- 语法：

  ```javascript
  数据.toString();
  例子：
  let num = 1234;
  let result = num.toString();
  console.log(typeof result);
  ```

#### （3）转为布尔类型

##### Boolean()

- 将数据转为布尔类型，除了0、false、空字符、NaNo、undefined、null这几个数据之外，其他数据都转为true

- 语法：

  ```javascript
  Boolean(数据);
  例子：
  console.log(Boolean(123));//true
  console.log(Boolean("abc"));//true
  console.log(Boolean(0));//false
  console.log(Boolean(false));//false
  console.log(Boolean(""));//false
  console.log(Boolean(NaN));//false
  console.log(Boolean(undefined));//false
  console.log(Boolean(null));//false
  ```
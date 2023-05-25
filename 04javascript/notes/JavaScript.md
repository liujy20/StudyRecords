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

## 运算符

### 一、算术运算符

- `+`：加法

  - 如果`+`两边都是数字，就进行加法运算
  - 如果`+`的其中一边是字符串类型，那么直接拼接字符串，拼接成一个大的字符串

  ```javascript
  console.log(2 + 3);//5
  console.log("2" + 3);//23
  // 隐式转换，将数字转为字符串let num = 3 +"" ;
  ```

- `-`：减法

  - 无论`-`前后是数字或字符串，都是进行减法运算
  - 如果`-`前后有字符串，会将字符串转为数字，再进行减法运算，如果无法转换，则得到`NaN`

  ```javascript
  console.log(2 - 3);//-1
  console.log("2" - "3");//-1
  console.log(2 - "abc");//NaN 
  // 隐式转换let str = "123" - 0;
  ```

- `*`：乘法

- `/`：除法

- `%`：取余，取模，进行整除后，取得是余数

### 二、赋值运算符

- `=`：对变量进行赋值，将等号右边的数据赋值给等号左边的变量

  ```javascript
  let num = 4;
  let sum = 4 * (2 + 1);
  console.log(sum);
  ```

- `+=`：在变量原来的基础上加上指定的数据，并把结果赋值给变量

  ```javascript
  let num = 2;
  num += 3;//等价于 num = num +3console.log(num);//5
  ```

- `-=`：在变量原来的基础上减去指定的数据，并把结果赋值给变量

  ```javascript
  let num = 12;
  num -= 5;// num = num -5console.log(num);//7
  ```

- `*=`：在变量原来的基础上乘以指定的数据，并把结果赋值给变量

  ```javascript
  let num = 12;
  num *= 5;// num = num *5console.log(num);//60
  ```

- `/=`：在变量原来的基础上除以指定的数据，并把结果赋值给变量

  ```javascript
  let num = 12;
  num /= 5;// num = num /5console.log(num);//2.4
  ```

- `%=`：在变量原来的基础上对指定的数据进行取余，并把结果赋值给变量

  ```javascript
  let num = 12;
  num %= 5;// num = num %5console.log(num);//2
  ```

### 三、关系运算符

- 用于判断数据之间的关系的运算符，得到的是一个布尔类型的值

- `>`：判断连个数据是否是大于的关系，不考虑数据类型，得到布尔类型的值

  ```javascript
  console.log(1 > 2);//false
  console.log(3 > 2);//true
  console.log(3 > "2");//true
  ```

- `<`：判断两个数据是否是小于于的关系，不考虑数据类型，得到布尔类型的值

  ```javascript
   console.log(1 < 2);//true
  console.log(3 < 2);//false
  console.log(3 < "2");//false
  console.log(1 < "2");//true
  ```

- `>=`：判断两个数据是否是大于或等于的关系，不考虑数据类型，得到布尔类型的值

  ```javascript
  console.log(2 >= 3);//false
  console.log(2 >= 2);//false
  console.log(1 >= "2");//false
  console.log(2 >= "2");//true
  ```

- `<=`：判断两个数据是否是小于或等于的关系，不考虑数据类型，得到布尔类型的值

  ```javascript
  console.log(2 <= 3);//true
  console.log(2 <= 2);//true
  console.log(1 <= "2");//true
  console.log(2 <= "2");//true
  ```

- `==`：判断两个数据是否是等于关系，不考虑数据类型，得到布尔值

  ```javascript
  console.log( 2 == 2);//true
  console.log( 2 == "2");//true
  console.log( 2 == 3);//false
  ```

- `!=`：判断两个数据是否是不等于关系，不考虑数据类型，得到布尔值

  ```javascript
  console.log( 2 != 2);//false
  console.log( 2 != "3");//true
  console.log( 2 != 3);//true
  ```

- `===`：判断两个数据是否是等于关系（全等），考虑数据类型，得到布尔值

  ```javascript
  console.log(2 === 2);//true
  console.log(2 === "2");//false
  console.log(2 === 3);//false
  ```

#### =、\==、\===之间的区别

- `=`是赋值运算符，`==`和`===`是关系运算符
- `==`：只判断两个数据是否相等，不考虑数据类型，`===`：判断两个数据是否全等，需要考虑数据类型

### 四、逻辑运算符

- `&&`：代表并且的意思，前后的条件都满足时则为true，否则为false【全真则真，一假则假】

  ```javascript
  console.log(3 > 2 && 4 > 3);//true
  console.log(3 > 2 && 4 < 3);//false
  ```

- `||`：代表或者的意思，前后的条件只要满足一个则为true，全部都不满足才为false【一真则真，全假则假】

  ```javascript
  console.log(3 > 2 || 4 > 3);//true
  console.log(3 > 2 || 4 < 3);//true
  console.log(3 < 2 || 4 < 3);//false
  ```

- `!`：代表非，不是的意思，可以对结果进行取反

  ```javascript
  console.log(!(2 > 1));//false
  ```

## 数组

### 1、概念

- 数组是多个数据的”仓库”，一个仓库中可以保存并管理多个数据。
- 官方：数组是一堆有序数据的集合。数组中的每个数据都有自己的编号——`下标（索引）`，用来快速查找数组中的数据。

### 2、定义数组

- 语法：

  ```javascript
  1. 定义空的数组let 
  数组变量名 = new Array();
  let  数组变量名 =[]; //字面量形式，推荐使用
  
  2. 定义带有默认数据的数组let 
  数组变量名 = new Array(数据1,数据2,数据3,...,数据n);
  let  数组变量名 =[数据1,数据2,数据3,...,数据n]; //字面量形式，推荐使用
  ```

### 3、基本使用

#### （1）数组的长度

- 指的是数组有几个数据

- 语法：

  ```javascript
  数组变量名.length
  ```

#### （2）下标（索引）

- 概念：本质上就是一个数字，数组中的每个数据对应了自己的下标，下标决定了数据在数组中的位置，同时我们可以通过下标来访问对应位置上的数据。
- 原理：下标是从`0`开始，后面的数据的下标依次递增，最后一个数据的下标为`数组的长度-1`

#### （3）查询数据

- 通过下标来获取对应位置的数据

- 语法：

  ```javascript
  数组变量名[下标]
  ```

- 注意：如果查找的下标是不存在的，得到的是`undefined`

#### （4）修改数据

- 通过下标来修改数据

- 语法：

  ```javascript
  数组变量名[下标] = 新数据;
  例子：
  let arr = [2,6,3,5];
  arr[2]=7;
  console.log(arr)；// [2,6,7,5]
  ```

#### （5）新增数据

- 数组末尾新增数据

- 中间指定位置插入数据：指定下标及之后的数据都需要向后移动一位，再在指定的下标插入数据

- 语法：

  ```javascript
  1. 在末尾新增数据数组变量名[下标] = 新数据;
  数组变量名[数组变量名.length] = 新数据;
  例子：
  let students = [89, 90, 70, 78, 56, 45, 87, 56, 79];
  students[9]=98;
  students[10]=96;
  students[11]=76;
  students[students.length]=87;
  students[students.length]=88;
  ```

#### （6）删除数据

- 数组末尾删除数据：控制数组的长度

- 在指定位置删除数据：将指定位置后面的所有数据向前移动一位，删除最后一个数据

- 语法：

  ```javascript
  1. 删除最后一个数据数组变量名.length = 数组变量名.length-1;数组变量名.length -=1;数组变量名.length--;2. 清空数组数组变量名.length = 0;
  ```

#### （7）遍历数组

- 依次获取数组中的每个数据

- 语法：

  ```javascript
  let students = [89, 90, 70, 78, 56, 45, 87, 56, 79];
  console.log(students[0]);
  console.log(students[1]);
  console.log(students[2]);// ...console.log(students[students.length-1]);
  
  for循环进行遍历for (var i = 0; i <= 数组变量名.length - 1; i++) {    console.log(arr[i]);
  }
  for (var i = 0; i < 数组变量名.length ; i++) {   
    console.log(arr[i]);
  }
  ```

## 循环结构

- 概念：循环结构指的是可以重复执行指定的代码的代码结构

![image-20230519141116297](C:\StudyRecords\04javascript\notes\JavaScript.assets\20230519141116.png)

### 1、for循环

- 概念：for循环是循环结构中的一种，比较常用的循环结构

- 语法：

  ```javascript
  for(循环变量的初始化语句;继续循环的条件;控制条件语句){  
    每次循环执行的代码---循环体
  }
  例子：
  for (var i = 1; i <= 10; i = i + 1) { 
    console.log("抄写"+i+"遍代码");//循环体
  }
  ```

  - 循环变量的初始化语句：在循环开始之前，循环变量初始化语句对变量进行赋值，这个语句只在循环前执行一次
  - 继续循环的条件语句：当条件为true时，执行循环体中的代码；当条件为false时，则结束循环
  - 控制条件语句：每次执行完循环体后，都会对变量进行操作（变量自增自减等等）；在继续循环条件的判断

- 执行流程

  ![image-20230519142733646](C:\StudyRecords\04javascript\notes\JavaScript.assets\20230519142733.png)

### 2、while循环

- 概念：也是循环结构中 的一种，完成代码的重复执行

- 语法：

  ```javascript
  while(继续循环的条件){  
    条件为true时执行的代码----循环体
  }
  例子：
  let i=1;
  while (i <= 10) {   
    console.log("抄写第" + i + "遍代码");  
    i++;
  }
  ```

- 执行流程：

  ![image-20230522143910118](C:\StudyRecords\04javascript\notes\JavaScript.assets\20230522143910.png)

- while循环与for循环的起步

  - 语法上，for循环提供了变量初始化和变量控制条件语句的书写位置，while循环没有
  - 应用场景上，for循环更多用于循环次数比较明确和循环条件明确的情况，while循环更多适用于循环条件明确，循环次数不明确的情况

### 3、do…while循环

- 也是循环结构中的一种，完成重复执行指定的代码，先执行一次循环体的代码，再判断继续循环的条件

- 语法：

  ```javascript
  do{ 
    循环体
  }while(继续循环的条件)
  ```

- 注意：无论继续循环的条件是否满足，循环体至少执行一次

- 执行流程：

  ![image-20230522162254048](C:\StudyRecords\04javascript\notes\JavaScript.assets\20230522162254.png)

- 三种循环之间的区别

  - 三者都是循环结构，都是用于完成重复执行指定的代码，for和while可以相互替代，do…while不能
  - 语法上不同
  - 应用场景：
    - for循环更适用于循环条件和循环次数都明确的情况
    - while循环更适用于循环条件明确，循环次数不明确的情况
    - do…while更使用于先执行一次循环体的代码，再进行判断情况

## 分支结构

### 1、if结构

- if结构师分支结构中的一种，可以根据某个条件的判断（true或false）来决定执行不同的代码

- 语法：

  ```javascript
  方式一：
  if(条件){ 
    条件为true时执行的代码
  }
  
  方式二：
  if(条件){  
    条件为true时执行的代码
  }else{ 
    条件为false时执行的代码
  }
  
  方式三：
  if(条件1){    
    条件1为true时执行的代码
  }else if(条件2){ 
    条件1为false，条件2为true时执行的代码
  }else if(条件3){  
    条件1和条件2都不满足时，条件3为true时执行的代码
  }else if(条件n){   
    以上所有条件都不满足，条件n为true时执行的代码
  }else{  
    以上所有的条件都不满足时执行的代码
  }
  ```

- 执行流程

![image-20230522111610037](C:\StudyRecords\04javascript\notes\JavaScript.assets\20230522111610.png)

### 2、switch结构

- 属于分支结构，一般用于当有固定的分支的情况时，结构更加简单

- 语法：

  ```javascript
  switch(要判断的数据){  
    case 值1:
      当数据的值为值1时需要执行的代码;
      break;   
    case 值2:
      当数据的值为值3时需要执行的代码;
      break;   
    case 值3:
      当数据的值为值3时需要执行的代码;
      break;    
      ...   
    case 
      值n:
      当数据的值为值n时需要执行的代码;
      break; 
    default:       
      以上所有的值都不满足时执行的代码;break;
  }
  let input = prompt("1.登录  2.注册  3.退出");
  console.log(input);
  switch(input){   
    case "1":     
      alert("登录");    
      break;    
    case "2":  
      alert("注册");     
      break;//跳转整个switch结构   
    case "3":     
      alert("退出");
      break;   
    default://前面所有的值都不满足时   
      alert("无效选项");     
      break;
  }
  ```

- 注意：`break`：跳出switch分支结构

- switch和if的区别

  - switch结构更多用于条件是固定值的情况，if使用任何情况

## 模版字符串

- 是ES 6新增的，用于快速进行字符串拼接的方式

- 语法：

  ```javascript
  `字符串${变量名或表达式}`
  
  例子：
  console.log(`鸡是${i}只,兔子是${j}只`);
  ```

## 二维数组

### 1、概念

- 一维数组：即一个数组中里面的每个数据都是基本数据类型

  ```javascript
  let arr = ["张三",18,"男",undefined,null,true]
  ```

- 二维数组：即一个数组里面，每个数据是一个一维数组

### 2、二维数组的基本使用

#### （1）定义二维数组

```javascript
方式一：
字面量形式，推荐使用
let users = [  
  ["admin1", "ad123"],  
  ["admin2", "ad123"],  
  ["admin3", "ad123"]
]

方式二：
let user1 = ["admin1", "ad123"];
let user2 = ["admin2", "ad123"];
let user3 = ["admin3", "ad123"];
let users = [user1, user2, user3];//二维数组

方式三：
let users = new Array( 
  new Array("admin1", "ad123"),   
  new Array("admin2" "ad123"), 
  new Array("admin3", "ad123"),
)
```

#### （2）获取数据

- 通过下标来获取数组中数据

- 语法：

  ```javascript
  1. 获取某个一维数组数组变量名[一维数组的下标]
  2. 获取某个一维数组中的某个数据数组变量名[一维数组的下标][下标]
  
  例子：// 获取下标为1的数据
  console.log(users[1]);// ["admin2", "ad123"]
  // 获取下标为1的用户名
  console.log(users[1][0]);//"admin2"
  ```

#### （3）修改数据

- 根据下标来修改数据

- 语法：

  ```javascript
  1. 修改某个一维数组数组变量名[一维数组的下标]=新数据；//新数据是一个一维数组
  2. 修改某个一维数组中的某个数据数组变量名[一维数组的下标][下标]=新数据；
  ```

#### （4）新增数据

- 在末尾新增一个数据

- 语法：

  ```javascript
  数组变量名[数组变量名.length]=新数据;//新数据是一个一维数组
  ```

#### （5）删除数据

- 在末尾删除一个数据

- 语法：

  ```javascript
  数组变量名.length --;
  数组变量名.length=数组变量名.length-1;
  数组变量名.length-=1;
  ```

#### （6）数组遍历

- 通过for循环来遍历数组

- 语法：

  ```javascript
  for(let i=0;i<=users.length-1;i++){   
    console.log(users[i]);//获取到的是二维数组中的每个一维数组 
    for(let j=0;j<users[i].length;j++){    
      console.log(users[i][j]);//获取到的是二维数组中的某个一维数组的每个数据  
    }
  }
  ```

## 函数

### 1、函数基础

- 概念：函数是一大段代码的容器，一个函数里面包含了一大段代码，代码可以在页面中任何地方使用。

- 语法：

  ```javascript
  1. 定义函数
  （1）函数表达式
  let  函数名=function(){  
    被执行的一段代码——函数体
  }
  （2）函数声明式——推荐使用
  function 函数名(){   
    被执行的一段代码——函数体
  }
  
  2. 调用函数
  函数名();
  ```

- 注意：

  - 如果不调用函数，函数体中的代码是不会执行
  - 每调用一次函数，函数体中的代码会执行一次
  - 函数声明式可以在定义函数之前调用函数，函数表达式在定义之前不能调用，只能在定义函数之后使用函数
  - 函数内部定义的变量不能在函数外使用，函数外定义的变量，后续都可以使用

## API概念

- 应用程序编程接口（Application Programing Interface），指的编程语言已经写好的代码，开发人员可以直接使用，能够解决实际开发中常见的操作。
- JavaScript针对数组提供一系列的api，可以完成对数组的基本操作
- 每个api是JavaScript内置好的函数

## 数组常见的api

### 1、操作方法

| 方法        | 说明                     | 原数组是否发生改变 | 返回值                   |
| ----------- | ------------------------ | ------------------ | ------------------------ |
| `push()`    | 向数组末尾追加数据       | 是                 | 新数组的长度             |
| `pop()`     | 删除数组末尾最后一个数据 | 是                 | 被删除的数据             |
| `unshift()` | 向数组开头添加数据       | 是                 | 新数组的长度             |
| `shift()`   | 数组开头删除一个数据     | 是                 | 被删除的数据             |
| `splice()`  | 完成指定位置的插入和删除 | 是                 | 被删除的数据形成的新数组 |

#### （1）push()*

- 先数组末尾追加数据，返回的是添加数据后数组的长度

- 语法：

  ```javascript
  数组变量名.push(数据1,数据2,...,数据n);
  ```

#### （2）pop()*

- 删除数组中最后一个数据，返回的是被删除的数据，可以使用变量来接收返回值

- 语法：

  ```javascript
  let 变量名=数组变量名.pop();
  ```

#### （3）unshift()

- 向数组开头添加一个或多个数据，返回的是添加数据后数组的长度

- 语法：

  ```javascript
  数组变量名.unshfit(数据1,数据2,...,数据n);
  ```

#### （4）shift()

- 在数组开头删除一个数据，返回的是被删除的数据，可以使用变量来接收返回值

- 语法：

  ```javascript
  let 变量名=数组变量名.shift();
  ```

#### （5）splice()*

- 完成指定位置（下标）的插入数据和删除数据，返回的是被删除数据形成的新数组

- 语法：

  ```javascript
  数组变量名.splice(开始插入或删除的下标, 删除的数量, 要添加的数据1,要添加的数据2,....,要添加数据n)
  ```

### 2、数组转字符串

| 方法     | 说明                           | 原数组是否发生改变 | 返回值 |
| -------- | ------------------------------ | ------------------ | ------ |
| `join()` | 能够将数组里面的数据拼接字符串 | 否                 | 字符串 |

#### （1）join()*

- ` 能够将数组里面的数据拼接字符串，会将拼接后的字符串返回出来

- 语法：

  ```javascript
  let 字符串变量名 = 数组变量名.join("符号");
  例子：
  let arr = [67, 87, 76, 74, 89, 88, 78];
  1. 输出67-87-76-74-89-88-78
  let result = arr.join("-")//67-87-76-74-89-88-78
  2. 输出是以逗号隔开
  let result = arr.join();//67,87,76,74,89,88,78
  3. 输出以空格隔开
  let result =arr.join(" ");//67 87 76 74 89 88 78
  ```

### 3、查询方法

| 方法            | 说明                                   | 原数组是否改变 | 返回值             |
| --------------- | -------------------------------------- | -------------- | ------------------ |
| `indexOf()`     | 获取某个数据在数组中第一次出现的下标   | 否             | 下标，没有则返回-1 |
| `lastIndexOf()` | 获取某个数据在数组中最后一次出现的下标 | 否             | 下标，没有则返回-1 |
| `includes()`    | 获取某个数据是否在数组中               | 否             | true或false        |

- 语法：

  ```javascript
  let  变量名 = 数组变量名.indexOf(某数据);
  let  变量名 = 数组变量名.lastIndexOf(某数据);
  let  变量名 = 数组变量名.includes(某数据);
  ```

#### 4、数组合并和截取

| 方法       | 说明                         | 是否改变原数组 | 返回值         |
| ---------- | ---------------------------- | -------------- | -------------- |
| `concat()` | 可以将多个数组合并成一个数组 | 否             | 合并后的新数组 |
| `slice()`* | 截取数组中某一部分的数据     | 否             | 截取后的新数据 |

- 语法：

  ```javascript
  1. concat()
     let 新数组变量名 = 数组1变量名.concat(数组2,数组3,…,数组n)
  
  例子：
  let arr1 = [1, 2, 3];
  let arr2 = [4, 5, 6, 7];
  let arr3 = [8, 9];
  let result = arr1.concat(arr2,arr3);
  console.log(result);// [1, 2, 3, 4, 5, 6, 7, 8, 9]
  ```

2.slice()
let 变量名=数组变量名.slice(开始下标,结束下标【不包含】)

注意：如果从开始下标一直截取到数组末尾，可以只写开始下标，结束下标可以省略不写

### 5、排序
|方法    | 说明                   | 原数组是否改变 | 返回值         |
| -------- | ---------------------- | -------------- | -------------- |
| `sort()` | 对数组中的数据进行排序 | 是             | 排序后的新数组 |

#### （1）sort()*
- 对数组中的数据进行排序，原数组发生改变- 语法：  

  ```js
  1. 默认排序 0~9，A-Z a-z  
  arr.sort(); 
  
  2. 自定义排序  
  数组变量名.sort(function(a,b){    
    return 排序规则；// a-b 升序  b-a降序 
  }) 
  例子： 
  // 升序  
  arr.sort(function (a, b) {   
    return a - b; 
  }) 
  // 降序 
  arr.sort(function (a, b) {    
    return b-a;
  })
  ```

  ## 原生对象

  ### 1、对象的概念

- 原生对象是JavaScript中专门针对用来描述复合类型的数据的数据类型（即对象）
  - 复合类型的数据本身是一个整体，该数据包含了很多歌基本数据类型。（万物皆对象）

  ```javascript
  电脑：
  ——name：华为
  ——price:2000
  ——cpu：inter
  
  女朋友：
  ——name:小红
  ——gender：男
  ——height：170
  ——weight：100
  ```

  ### 2、对象的创建

  - 语法：

    ```js
    创建一个空的对象let   对象变量名=new Object()；
    let   对象变量名 = {}; //字面量形式，推荐使用
    
    2. 创建一个带有默认值的对象let  
    对象变量名 = {   
      属性名1:属性值1,  
      属性名2:属性值2,   
      属性名3:属性值3,   
      ...  
      属性名n:属性值n
    };
    
    例子：let student = {   
      name:"宋光明",   
      "age":18, 
      "gender":"女"
    }
    ```
  
  - 注意：
  
    - `属性名1:属性值1`：又称为键值对，属性名是键，属性值是值
  - 属性值可以是任意类型的数据
    
    - 对象的属性名是字符串类型（引号可以省略不写）
  
  ### 3、对象中的属性
  
  - 对象中的属性指的就是对象中一个数据，属性名是该数据的名字，属性值是该数据本身。
  
  #### （1）获取对象中的某个属性
  
  - 语法：
  
    ```js
    对象变量名.属性名对象变量名["属性名"]
    例子：
    let student = {  
      name: "宋光明",
      "age": 18,   
      gender: "女"
    }
    //获取对象中的某个属性
    console.log(student.name);//"宋光明"
    console.log(student.age);//18
    console.log(student["age"]);//18
    console.log(student.height);//undefined
    ```
  
  - 注意：如果访问对象中不存在的属性，得到的结果是`undefined`；
  
  #### （2）修改或添加一个属性

  - 语法：
  
    ```js
    对象变量名.属性名 = 新数据;
    对象变量名["属性名"] = 新数据;
    
    例子：
    student.gender = "男";
    student["age"] = 20;
    student.height = 170;
    student["weight"] = 160;
    ```
  
  - 注意：如果属性名已存在，那么就是修改数据，如果属性名不存在，那么则新增属性和对应的值
  
  #### （3）对象的遍历
  
  - 获取对象中每个属性的值，通过`for-in`来遍历对象
  
  - 语法：
  
    ```js
  for(let 变量名 in 对象变量名){   
      // for-in 每次将对象中的当前遍历的属性的属性名赋值给该变量 prop   
      console.log(prop);//拿到的是对象中的每个属性名   
      // console.log(typeof prop);//变量拿到的字符串类型  "name"   
      console.log(对象变量名[prop]);//拿到对象中每个属性名对应的属性值
    }
    
    例子： for (let prop in student) {  
      // for-in 每次将对象中的当前遍历的属性的属性名赋值给该变量 prop 
      console.log(prop);//拿到的是对象中的每个属性名    
      // console.log(typeof prop);//变量拿到的字符串类型  "name"
      console.log(student[prop]);//拿到对象中每个属性名对应的属性值 
    }
    ```
  
  ## 对象的嵌套
  
  - 是指一个一维数组中的每个数据都是一个对象，对象的属性值也可能是一个数组或一个对象
  
    ```js
    let students = [   
      {      
        id: 1, 
        name: "小红",   
        age: 18,    
        teacher: { id: 7, name: "bobo", message: "前端讲师" },   
        study: ["第一阶段", "第二阶段"]  
      },  
      {      
        id: 2,  
        name: "小明", 
        age: 20,   
        teacher: { id: 8, name: "倩倩", message: "Java讲师" },    
        study: ["第一阶段", "第二阶段", "第三阶段"]  
      }
    ]
    console.log(students[0].teacher.name);//bobo
    console.log(students[0].study[1]);//"第二阶段"
    ```
  


## END
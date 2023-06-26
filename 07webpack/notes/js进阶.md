变量原理

# 变量原理(ES5)

## 变量分类

```javascript
var a = 1;
function one() {   
  var b = 2;   
  console.log('one:', a);//1  
  console.log('one:', b);//2
}
one();
console.log(a);//1
console.log(b);//报错
```

- JavaScript根据变量的定义位置不同，将变量分为全局变量与局部变量。

- 变量分类

  - 全局变量
    - 定义在函数外部的var变量，为全局变量，在当前整个页面都可以使用。
  - 局部变量
    - 定义在函数内部的var变量，为局部变量(函数级局部变量)，只能在当前声明变量所在的函数内部使用。

- 注意:

  - 如果一个变量未声明直接使用，该变量会被系统提升为全局变量。

    ```javascript
    function two() { 
      a = 1;
    }
    two();
    console.log(a);
    ```

## 作用域

- 概念

  - 变量的作用域指变量的作用范围;
  - 全局变量和局部变量拥有不同的作用域，分别为全局作用域和局部作用域;

- 分类

  - 全局作用域

    - 当前全局变量，可以在当前整个页面使用;

  - 局部作用域

    - 当前局部变量，只能在该变量声明的函数内部使用;

      ```javascript
      var a = 1;
      function one() {  
        var b = 2;  
        console.log('one:', a);//one:1  
        console.log('one:', b);//one:2
      }
      function two() { 
        var c = 3;  
        console.log('two:', a);//two:1  
        console.log('two:', b);//报错
        console.log('two:', c);//two:3
      }
      one();
      two();
      console.log('global:', a);//global:1
      console.log('global:', b);//报错
      console.log('global:', c);//报错
      ```

- 练习

  ```javascript
  var a = 1;function one() {   
    var b = 2; 
    console.log(`one:${b}`);//one:2   
    function two() {  
      var c = 3;     
      console.log(`two:${c}`);//two:3  
      function three() {        
        var d = 4;   
        console.log(`three:${d}`);//three:4    
      }    
      function four() {    
        var e = 5; 
        console.log(`four:${e}`);//four:5  
        console.log(`four:${b}`);//four:2    
        console.log(`four:${d}`);//报错     
      }    
      three(); 
      console.log(`two:${b}`);//two:2   
      four();    
      console.log(`two:${e}`);//报错  
    }  
    two(); 
    console.log(`one:${c}`);//报错
  }
  one();
  console.log(`global:${a}`);//globle:1
  ```

## 作用域链

- 当作用域发生嵌套时，会形成变量的链式访问结构，被称为作用域链;

- 作用域链决定了变量的访问顺序(就近原则):

  - 访问目标变量时，会在代码所在的作用域中查找目标变量，如果存在，则直接使用，否则会将查找目标切换为上层作用域；
  - 如果存在，则直接使用，依次类推；
  - 直到查找全局作用域，未查到目标变量，则`程序报错`;

  ```javascript
  var a = 1;
  function one() {  
    var a = 6;  
    function two() {    
      function three() {     
        console.log(`three:${a}`);//three->two->one->6    
      }     
      three();     
      console.log(`two:${a}`);//two->one->6 
    }  
    two(); 
    console.log(`one:${a}`);//one->6
  }
  one();
  console.log(`global:${a}`);//global->1
  ```

## 声明提升

- 在作用域中声明定义变量或函数时，会发生声明`提升现象`;

- `声明提升现象`是指将声明操作提升到当前作用域顶部(最开始)，所以如果在当前作用域中声明了变量或函数，可以在当前作用域任意位置进行访问，与声明位置无关;

  ```javascript
  console.log(v);
  var v = 1;
  console.log(v);
  ```

  ```javascript
  one();
  var one = function () {  
    console.log('one');
  }
  one();
  ```

  ```javascript
  one();
  function one() {  
    console.log('one');
  }
  one();
  ```

- 练习：

```javascript
function one() { 
  console.log(`one:${a}`);//one:undefined  
  a = 1;   
  console.log(`one:${a}`);//one:1   
  var a;   
  console.log(`one:${a}`);//one:1
}
one();

//------------------------------------------
console.log(`global:${a}`);//报错
function one() {   
  console.log(`one:${a}`);//报错 
  a = 1; 
  console.log(`one:${a}`);//one:1
}
one();
console.log(`global:${a}`);//global:1
```

## 底层原理

- 作用域代码`执行前`，JavaScript解析引擎会先创建对应作用域对象。

- 作用域对象

  - ==GO==(Global Object)
    - 全局对象，用于存储全局作用域可访问的变量与函数。
    - 初始化对象:
      - 创建`this`、`window`、`document`等属性;
      - 检查全局作用域中的声明函数，在GO对象中为每个声明函数添加一个同名属性，属性值为该函数的引用地址;
      - 检查全局作用域中的`var`变量，在GO对象中为每个`var`变量添加一个同名属性，属性值为`undefined`，如果该`var`变量对应的属性名称已经存在，系统会自动忽略该属性声明；
  - ==AO==(Activation Object)
    - 执行对象，用于存储局部作用域可访问的变量与函数。
    - 初始化对象:
      - 创建`arguments`属性(`arguments`为函数内置的对象数组，可以获取所有实参，箭头函数不能使用`arguments`)；
      - 检查当前局部作用域中的声明函数，在当前AO对象中为每个声明函数添加一个同名属性，属性值为该函数的引用地址;
      - 检查当前局部作用域中的`var`变量，在当前AO对象中为每个`var`变量添加一个同名属性，属性值为`undefined`，如果该`var`变量对应的属性名称已经存在，系统会自动忽略该属性声明；

- 案例

  ```javascript
  a();
  a = 1;
  a();
  var a;
  function one() {  
    b = 2;  
    c = 3; 
    var c;
  }
  one(1,2,3);
  function a() {  
    console.log('a');
  }
  function two() {  
    console.log('two');
  }
  ```

  ![img](C:\StudyRecords\07webpack\notes\js进阶.assets\99628b04ce954e8bb98de955949c9b11.png)

- 作用域链

  - 作用域链是由一个GO对象以及一系列AO对象组成，形成链式访问结构；
  - 查找变量或函数时，会优先在当前作用域对象中查找是否存在同名属性，如果存在，则对应属性值为查找目标，否则，会将查找目前切换为上曾作用域对象，依次类推，直到查询Go对象中不存在目标变量或函数，程序报错；

## 腾讯面试题

```javascript
var a = 100;
function fn() {
  alert(a);//undefined  
  var a = 200;  
  alert(a);//200 
  alert(b);//b函数对象  
  function b() {     
    var b = 1;     
    alert(a);//200 
  }
  b();
}
fn();
alert(a);//100
var a;
alert(a);//100
function a() {    
  console.log('a函数');
}
var a = 300;
alert(a);//300
```

![img](C:\StudyRecords\07webpack\notes\js进阶.assets\8f054c4940e247b0a45798a0d604a156.png)

# 块级作用域(ES6)

## 概念

- ES6新增块级作用域，用于现在变量作用域范围，为代码块作用范围。
  - 代码块:`{}`
  - 在循环中声明定义块级变量，用于当前循环作用域范围;
- ES6新增`let`、`const`用于定义块级作用域变量和常量;

## let

ES6新增定义块级作用域变量的关键字，使用与`var`类似;

语法:

```javascript
let 变量名称;
```

`let`与`var`区别：

1. `var`变量最小作用域范围为函数，而`let`变量最小作用域范围为代码块;
2. `let`变量在声明定义前不能使用，此期间被称为`暂时性死区(TDZ)`，如果在`暂时性死区`期间使用该变量，程序会报错，而`var`不存在`暂时性死区`;

1. `let`同一个作用域中，不允许同名变量存在，如果同名，程序报错，而`var`可以;

推荐使用`let`定义变量;

## const

概念

- ES6新增`const`关键字用于定义常量;
- 常量:值不能发生改变;
- 一般为常量命名使用全大写;

语法

```javascript
const 常量名称=值;
```

`let`与`const`区别

1. `let`可以先声明，再赋值，而`const`必须在声明时赋值;
2. `let`值在程序运行期间可以改变，而`const`值在程序运行期间不可以改变;

面试题

```javascript
const OBJ = { id: 1 };
OBJ.id = 2;//不报错
console.log(OBJ);
const ARR = [1];
ARR[0] = 2;//不报错
console.log(ARR);
```

![img](C:\StudyRecords\07webpack\notes\js进阶.assets\4ec1f3a3c1f54e638a754a7421a0550d.png)

## `let`与`var`、`const`区别

- `let`与`const`为`es6`新增关键字，用于定义变量或常量，其作用域最小为块级作用域，存在`暂时性死区`现象，同一个作用域中不能同名变量或常量;而`var`用于定义变量，其作用域最小为函数级作用域，不存在`暂时性死区`现象，同一个作用域中可以存在同名变量;
- `let`用于定义变量，可以声明再赋值，程序运行期间值可以改变;而`const`用于定义常量，必须在声明时赋初始值，且程序运行期间，不能改变其值;

ES5之严格模式

# 严格模式(ES5)

## 概述

- 由于JavaScript早期设计缺陷，导致语法存在一些不合理、不严格的情况，为了解决该问题,ES5新增严格模式。

  ```html
  <script>
    a = 2;//报错 未定义
  </script>
  ```

## 分类

- 兼容模式：JavaScript的默认模式，对语法要求不严格;
- 严格模式:使用`"use strict"`将编码模式切换为严格模式，对语法要求严格;

## 语法

- 在要使用严格模式语法的作用域最前面使用`"use strict"`声明;

```javascript
"use strict"
// 严格模式语法代码

"use strict"
a = 2;
```

## 核心特性

- 不能使用为声明的变量;

  ```javascript
  "use strict"a = 2;//报错 Uncaught ReferenceError: a is not defined
  ```

  1. 不允许函数形参重名;

  ```javascript
  "use strict"function demo(a, a) {//报错 Uncaught SyntaxError: Duplicate parameter name not allowed in this context   
    console.log(arguments);
  }
  demo(1, 2);
  ```

  1. 非全局`this`指向为`undefined`

  ```javascript
  "use strict"console.log(this);//window对象
  function demo() { 
    console.log(this);//undefined
  }
  demo();
  ```

- 变量名称不能使用保留字;

  - 如:`arguments`、`eval`、`implement`、`interface`、`package`、`private`、`protected`、`public`、`static`、`yield`等。

  ```javascript
  "use strict"
  function demo() {
    let arguments = 0;//报错 Uncaught SyntaxError: Unexpected eval or arguments in strict mode    
    console.log(arguments);
  }
  demo();
  ```

# 立即执行函数

## 概念

- `IIFE`(Immediately Involved Function Expression)为立即执行函数表达式。是一个在定义函数时就被执行的函数，一旦函数执行完毕，该函数的内存空间就会被释放掉。

## 格式

- 由两个小括号组成，第一个小括号中声明要执行的函数，第二个小括号去调用执行该函数。

```javascript
(function(形参列表){函数体})(实参列表)

(  
  function demo(a, b) {      
    console.log('demo', a, b); 
  }
)(1, 2)
```

## 作用

- 隔离出一个单独的作用域，避免变量污染。

  ```javascript
  for (var i = 0; i < 5; i++) {//同步执行 
    setTimeout((function (a) {//异步执行代码,IIFE函数隔离出独立的作用域，a变量的值不会受外部i变化影响        
      console.log(a); 
    })(i), 1000);
  }
  console.log('end');
  ```

# 闭包

## 概念

- 闭包(closure)，当函数发生嵌套时，将内部函数作为外部函数返回值返回，则形成闭包。

## 形成条件

- 函数嵌套;

  ```javascript
  function outer(){  
    function inner(){ 
    }
  }
  ```

- 内部函数作为外部函数返回值返回;

  ```javascript
  function outer(){ 
    let count=1; 
    function inner(){ 
      console.log(count); 
    }
    return inner;
  }
  ```

## 作用

- 内部函数可以访问外部函数的变量，保证变量的内存不会被释放的同时，限制变量内存的可访问操作;

```javascript
//工具制造者
let count = 1;
function outer() { 
  console.log(count++);
}
//工具使用者outer();
outer();
//---------------------------------------
//工具制造者
function outer() {
  let count = 1;   
  function inner() {   
    console.log(count++);//先取值，再加加 
  }   
  return inner;
}
//工具使用者
let result = outer();
result();
result();
```

## 应用场景

- 函数柯里化
- 防抖与节流

# 函数柯里化

## 概念

- 将接受多个参数的函数，拆分为接受单一参数的函数并返回处理余下参数的函数现象，被称为`函数柯里化`。

## 案例

- 未柯里化

```javascript
function concat(str1, str2) {  
  return str1 + str2;
}
let r1 = concat('Hello', ' World!');
let r2 = concat(r1, 'Hello Woniu!');
console.log(r2);
```

- 柯里化

```javascript
function concatPlus(str1) { 
  let result = str1;
  return function (str2) {
    result += str2;   
    return result;   
  }
}
let method = concatPlus('Hello');
method('World!');
let r=method(' Hello,woniu!');
console.log(r);// Hello World! Hello,woniu!
```

## 作用

- 消除参数重复性，简化代码。



# 函数防抖与节流

## 概念

- 函数防抖与节流是可以优化JS高频执行的一种技术手段。
- JS常用的一些事件，触发频率较高，导致对应监听器函数调用执行频率过高，浏览器效率较低，为了优化，可以使用函数防抖与节流;
- 触发频率较高的常见事件:
  - `mousemove`:鼠标移动事件
  - `resize`:窗口调整大小事件
  - `scroll`:滚动条滚动事件
  - `input`:表单元素键入内容事件

## 防抖

- 概念

  - 在事件触发n秒后，再调用执行目标回调函数，如果期间又触发了事件，则重新计时;

- 思路

  - 利用延时器执行目标回调函数代码，如果存在延时器，则取消之前的延时器，重新创建新的延时器;

- 语法:

  ```javascript
  function outer(){  
    //定义要使用的变量或函数   
    let timer=null;   
    return function(){  
      if(timer){     
        clearTimeout(timer);
        timer=null;   
      }    
      timer=setTimeout(function(){ 
        //要执行的任务代码       
        timer=null;  
      },要延迟执行的毫秒值); 
    }
  }
  事件源.on事件=outer();
  ```

- 案例(鼠标移动次数统计)

  - 未防抖

    ```javascript
    function countMouseMoveOld() { 
      let count = 0;  
      return function () { 
        //要执行的目标代码    
        document.querySelector('body').innerText = `鼠标移动了${++count}`; 
      }
    }
    window.onmousemove = countMouseMoveOld();
    ```

  - 防抖

    ```javascript
    function countMouseMove() { 
      let count = 0;  
      let timer = null; 
      return function () {   
        //如果存在延时器，则取消之前的延时器任务  
        if (timer) {       
          clearTimeout(timer);  
          timer = null;   
        }   
        //创建新的延时器 
        timer = setTimeout(function () { 
          //要执行的目标代码    
          document.querySelector('body').innerText = `鼠标移动了${++count}`;
          //目标代码执行完毕后，重置延时器变量    
          timer = null; 
        }, 500);  
      }
    }
    window.onmousemove = countMouseMove();
    ```

## 节流

- 概念

  - 每隔指定的n秒内，只调用执行一次目标回调函数。

- 思路

  - 利用延时器执行目标回调函数代码，如果已经存在延时器，则不再创建新的延时器;

- 语法:

  ```javascript
  function outer(){  
    //定义要使用的变量或函数   
    let timer=null;   
    return function(){
      if(!timer){        
        timer=setTimeout(function(){   
          //要执行的任务代码    
          timer=null;  
        },要延迟执行的毫秒值);   
      }  
    }
  }
  事件源.on事件=outer();
  ```

- 案例(鼠标移动计数)

  - 未节流

    ```javascript
    function outer() { 
      let count = 0;  
      return function () {  
        document.querySelector('body').innerText = `鼠标移动了${++count}次`;  
      }
    }
    window.onmousemove = outer();
    ```

  - 节流

    ```javascript
    function outer() {  
      let count = 0; 
      let timer = null;  
      return function () { 
        if (!timer) {    
          timer = setTimeout(function () {   
            document.querySelector('body').innerText = `鼠标移动了${++count}次`;    
            timer = null; 
          }, 750);  
        } 
      }
    }
    window.onmousemove = outer();
    ```

## 防抖与节流区别

- 防抖目标代码执行时间大于等于指定时间，而节流目标代码执行时间等于指定时间;
- 相同指定时间下，防抖的执行频率比节流低；

# 扩展运算符(ES6)

## 概述

- 扩展运算符又称`REST`运算符，可以是对数组、字符串、对象进行语法层面展开，达到语法简化的目的。

## 语法

- `...数组名称`

  - 罗列目标数组中每个元素，元素与元素之间使用逗号分隔。

    ```javascript
    let arr = ['a', 'b', 'c', 'd'];
    // console.log('a', 'b', 'c', 'd');
    // console.log(...arr);
    //在当前数组元素基础上添加新的数据，形成新的数组
    // let arr2 = [];
    // for (let index = 0; index < arr.length; index++) {
    //     arr2.push(arr[index]);
    // }
    // let arr2=['a', 'b', 'c', 'd'];
    let arr2 = [...arr, 'e', 'f'];
    console.log(arr, arr2);
    arr[0] = 'g';
    console.log(arr, arr2);
    ```

  - `...字符串名称`

    - 罗列目标字符串的每个字符，字符与字符之间使用逗号分隔。

      ```javascript
      let str = '362718';
      console.log('H', 'e', 'l', 'l', 'o');
      console.log(...str);//获取存储指定字符串中每个字符的数组
      let arr = [...str];
      ```

  - `...对象名称`

    - 罗列目标对象每个属性(属性名和属性值)，属性与属性之间使用逗号分隔。

      ```javascript
      let obj = {
        id: 1,  
        name: 'admin',  
        age: 22,  
        gender: '男'
      };
      //创建一个新对象，该对象拥有目标对象的所有属性及值(克隆)
      let obj1 = {    ...obj};
      console.log(obj, obj1);
      obj.id = 2;
      console.log(obj, obj1);
      ```

## REST参数

- 当REST运算符出现在形参列表中(作为最后一个形参)，会将对应实参值存储REST运算符后指定名称的数组中。
  - 可以用于解决箭头函数不能使用`arguments`的问题。

```javascript
function demo(a, ...params) {   
  arguments[0] = 9;    
  console.log(params, arguments);
}
demo(1, 2, 3, 4, 5)
let arr = [1];
// arr.forEach( ()=> {
//     console.log(arguments);
// });
arr.forEach((...p) => {  
  console.log(p);
});
```

# 解构赋值(ES6)

## 概念

- 对数组、字符串、对象进行展开，并将数据赋值给对应变量，达到简化语法的目的。

## 语法

```javascript
let [变量名称1,.....]=目标数组名称
```

- 罗列目标数组中所有元素，并将元素值赋值给对应变量。

  ```javascript
  let arr = [1, 2, 3, 4];
  // let a=arr[0];
  // let b=arr[1];
  // let c=arr[2];
  
  //取出所有
  // let [a, b, c,d] = arr;
  // console.log(a, b, c,d);
  
  //取部分
  // let [a, , , c] = arr;
  // console.log(a, c);
  
  //取多了
  // let [, , , , e] = arr;
  // console.log(e);
  
  //取出部分，余下的存储到指定数组
  let [a, ...newArr] = arr;
  console.log(a, newArr);
  
  let url = 'id=1&name=大话西游&actor=周星驰'
  let re=url.split('&');
  let [n,v]=re[0].split('=');
  ```

  `let [变量名称,.....]=目标字符串名称`

  1. 罗列目标字符串中所有字符，并将字符赋值给对应变量。

```javascript
  let str = 'Hello';  
//取出全部 
// let [a, b, c, d, e] = str;  
// console.log(a, b, c, d, e);  

//取部分 
// let [, , , d, e] = str; 
// console.log(d, e); 

//取多了 
// let [a, b, c, d, e, f = '默认值'] = str; 
// console.log(a, b, c, d, e, f);

//存储部分，余下存储到指定数组 
let [a, ...newArr] = str;
console.log(a, newArr);
let {变量名称,......}=目标对象名称
```

- 罗列目标对象中所有属性，并将属性值赋值给同名变量。

```javascript
let obj = { 
  id: 1,   
  name: '宋光明', 
  age: 22
};
//取出全部
// let { id, name, age } = obj;
// console.log(id, name, age);

//取出部分
// let { name } = obj;
// console.log(name);

//取出全部
// let { id, name, age, gender = '默认值' } = obj;
// console.log(id, name, age, gender);

//取出部分，余下的存储对象中
let { id, ...newObj } = obj;
console.log(id, newObj);
```

- 如果变量名称与赋值目标属性名称不一致，可以使用以下语法

  `let {属性名称:变量名称,......}=目标对象名称`

  ```javascript
  let obj = { 
    id: 1, 
    name: '宋光明', 
    age: 22
  };
  function demo({ name: n }) {   
    console.log(n);
  }
  demo(obj);
  ```

# Set(ES6)

## 概念

- 一种与数组类似的数据结构，被称为单列集合，`集`。

## 特点

- 元素唯一不重复的;
- 不支持索引，元素顺序按照插入顺序;
- 查询效率比数组低，但新增删除数据效率比数组高;

## 语法

- `let 变量名称=new Set()`

  ```javascript
  let mySet=new Set();
  ```

- `let 变量名称=new Set(数组)`

  ```javascript
  let arr = ['a', 'b', 'c', 'a', 'e'];
  let mySet = new Set(arr);
  ```

## API

- 属性

  - `size`

    - 获取元素个数。

    ```javascript
    let arr = ['a', 'b', 'c', 'a', 'e'];
    let mySet = new Set(arr);
    console.log(mySet.size);
    ```

- 函数

  - `当前Set对象 add(value)`

    - 向Set添加一个元素。

      ```javascript
      let arr = ['a', 'b', 'c', 'a', 'e'];
      let mySet = new Set(arr);
      mySet.add('g');
      ```

  - `boolean has(value)`

    - 判断当前Set是否存在指定元素，如果存在返回true，否则返回false;

      ```javascript
      let arr = ['a', 'b', 'c', 'a', 'e',{ id: 1 }];
      let mySet = new Set(arr);
      console.log(mySet.has({ id: 1 }));
      ```

  - `forEach(function(value,value,Set对象){函数体})`

    - 遍历当前Set中元素，对每个元素执行指定回调函数内容。

      ```javascript
      let arr = ['a', 'b', 'c', 'a', 'e'];
      let mySet = new Set(arr);
      mySet.forEach(function (v, v1, s) { 
        console.log(v, v1, s);
      })
      ```

  - `boolean delete(value)`

    - 从当前Set中删除指定元素，如果删除成功返回true，否则返回false;

      ```javascript
      let o={id:1};
      let arr = ['a', 'b', 'c', 'a', 'e',o];
      let mySet = new Set(arr);
      mySet.delete(o);
      ```

  - `clear()`

    - 清空当前Set中所有数据;

      ```javascript
      let arr = ['a', 'b', 'c', 'a', 'e'];
      let mySet = new Set(arr);
      mySet.clear();
      ```

# Map(ES6)

## 概述

- 一种存储键值对的数据结构，被称为`双列集合`。

## 特点

- 一个元素由两部分组成，分别为`键`和`值`，且`键`与`值`之间存在映射关系;
- 类型不限，一般`键`使用字符串类型;
- `键`是唯一、不重复，`值`可以重复;

## 语法

- `let 变量名称=new Map()`

  ```javascript
  let myMap=new Map();
  ```

  1. `let 变量名称=new Map(二维数组)`

  ```javascript
  let arr = [ 
    ['id', 1], 
    ['name', 'admin'],   
    ['age', 22],   
    [true, 13]
  ];
  let myMap = new Map(arr);
  ```

## API

- 属性

  - `size`

    - 存储元素个数。

    ```javascript
    let arr = [  
      ['id', 1], 
      ['name', 'admin'],  
      ['age', 22],
      [true, 13]
    ];
    let myMap = new Map(arr);
    console.log(myMap.size);
    ```

- 函数

  - `当前Map对象 set(key,value)`

    - 向当前Map中添加指定键值对。

      ```javascript
      let arr = [  
        ['id', 1], 
        ['name', 'admin'], 
        ['age', 22],  
        [true, 13]
      ];
      let myMap = new Map(arr);
      myMap.set('gender', '男');
      ```

  - `value get(key)`

    - 根据指定键获取对应值。

    ```javascript
    let arr = [  
      ['id', 1],   
      ['name', 'admin'],
      ['age', 22],  
      [true, 13]
    ];
    let myMap = new Map(arr);
    console.log(myMap.get('name'));
    ```

  - `boolean has(key)`

    - 判断当前Map中是否存在指定键，如果存在返回true，否则返回false。

    ```javascript
    let arr = [  
      ['id', 1],  
      ['name', 'admin'],
      ['age', 22],  
      [true, 13]
    ];
    let myMap = new Map(arr);
    console.log(myMap.has('a'));
    ```

  - `forEach(function(value,key,当前Map对象){函数体})`

    - 遍历Map中每个元素，对每个元素执行指定回调函数内容。

    ```javascript
    let arr = [    
      ['id', 1], 
      ['name', 'admin'], 
      ['age', 22],   
      [true, 13]
    ];
    let myMap = new Map(arr);
    myMap.forEach(function (v, k, m) {   
      console.log(v, k, m);
    })
    ```

  - `boolean delete(key)`

    - 从当前Map中删除指定键对应的键值对。

    ```
    let arr = [    ['id', 1],    ['name', 'admin'],    ['age', 22],    [true, 13]];let myMap = new Map(arr);myMap.delete(true);
    ```

  - `clear()`

    - 清空当前Map中所有元素。

    ```
    let arr = [    ['id', 1],    ['name', 'admin'],    ['age', 22],    [true, 13]];let myMap = new Map(arr);myMap.clear();
    ```

## 数组、Set、Map核心特点

- 数组:存在索引，单列集合
- Set:元素唯一不重复，单列集合
- Map:双列集合(数据之间有映射关系)

## Map与对象核心区别

- Map的键类型不限，可以使用对象或者函数，而对象不行;

  ```
  let o = { id: 1 };function demo() {    console.log('demo');}let obj = {    o: 2,    demo: 3};let myMap = new Map();myMap.set(o, 2);myMap.set(demo, 3);console.log(obj, myMap);
  ```

- Map提供更多API实现数据操作，而对象需要自行实现，比如:遍历或获取元素个数;

```
  let obj = {      id: 1,      name: 'admin',      age: 22  };  for (let f in obj) {      console.log(f, obj[f]);  }  let myMap = new Map();  myMap.set('id', 1);  myMap.set('name', 'admin');  myMap.set('age', 22);  myMap.forEach(function (v, k) {      console.log(k, v);  })
```

# END
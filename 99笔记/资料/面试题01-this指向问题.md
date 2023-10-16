## 面试题01-this指向问题

### 一. 普通函数中this指向

>this是程序中一个占位符,一定返回一个对象,this在不同环境下使用,表示不同对象

```js
function show(){
    console.log(this)
}
```

代码运行在浏览器中this指向window

window ---> document

```js
window.show()
```

总结:

1. 普通函数中的this指向是一个对象.
2. 普通函数中this,谁调用这个函数,this指向谁

### 二. 对象中this指向

```js
let obj = {
    id:1,
    //普通函数  function sayName()
    sayName(){
        console.log(this)
    }
}
console.log(obj.sayName()) ===> obj
```

总结:

1. sayName是普通函数,放在对象中,obj调用这个sayName得到结果就是obj

### 三. 事件中我们的this

```js
const oul = document.querySelector("ul")
oul.onclick = function(){
    console.log(this);
    this.style.sxxx
    this.getAttribute()
}
```

在事件函数中我们输出this,返回的就是当前事件源对象

### 四.  构造函数中this

```js
function Person(name){
    this.name = name
    console.log(this)
}
//类被加载的时候,age就会在内存分配空间
Person.age = 10
const p = new Person("xiaowang")
```

构造函数中的this指向的new出来的对象.new堆内存才会有这个对象空间.

类属性经常都被使用

```js
Math.random()

function Math(){
    
}
Math.random = function(){
    
}
class Math{
    static random(){
        
    }
    static round(){
        
    }
    static floor(){
        
    }
    static cile(){
        
    }
    static abs(){
        
    }
}
```



### 五.箭头函数中this

箭头函数内部没有this指向的.

箭头函数中的this指向来源于 父级作用域.

作用域:

1. 全局作用域
2. 函数作用域

```js
var name = "lisi"
const stu = {
    name:"zhangsan",
    sayName(){
        console.log(this.name)
    }
}
stu.sayName() ---> zhangsan
```

```js
var name = "lisi"
const stu = {
    name:"zhangsan",
    sayName:()=>{
        console.log(this.name)
    }
}
stu.sayName() ---> lisi
```

变化

```js
var name = "lisi"
const stu = {
    name: "zhangsan",
    sayName:function(){
        return ()=>{
            console.log(this.name)
        }
    }
}
stu.sayName()() --->zhangsan
```

变化

```js
var name = "lisi"
const stu = {
    name: "zhangsan",
    sayName:function(){
        //this-->zhangsan
        console.log(this.name)
        return function(){
            console.log(this.name);
        }
    }
}
const fun =  stu.sayName()
fun()
```

练习:

```js
var name = 'window'
var person1 = {
  name: 'person1',
  foo1: function () {
    console.log(this.name)
  },
  foo2: () => console.log(this.name),
  foo3: function () {
      //----this-->person2
    return function () {
      console.log(this.name)
    }
  },
  foo4: function () {
      
    return () => {
      console.log(this.name)
    }
  }
}

var person2 = { name: 'person2' }
person1.foo1();    //person1
person1.foo1.call(person2);  //person2
person1.foo2(); //window
person1.foo2.call(person2); //window
person1.foo3()(); //window
person1.foo3.call(person2)(); //window
person1.foo3().call(person2); //person2
person1.foo4()();  //person1
person1.foo4.call(person2)();  //person2
person1.foo4().call(person2);   //person1
```


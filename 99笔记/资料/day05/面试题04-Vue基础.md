## 面试题04-Vue基础

### 一、题目

1. vue模版（template）加载的流程？
2. 使用 Object.defineProperty() 来进行数据劫持有什么缺点？
3. Computed 和 Watch 的区别
4. slot是什么？有什么作用？原理是什么？
5. vue中过滤器的作用，如何实现一个过滤器
6. 常见的事件修饰符及其作用？
7. v-if、v-show、v-html 的原理
8. v-model 是如何实现的，语法糖实际是什么？

### 二、vue模版（template）加载的流程？

```html
<template>
    <div v-bind:index = "msg"></div>
     <div v-on:></div>
    <div v-html=""></div>
</template>

<script>
	data(){
        return {
            msg:"xiaowang"
        }
    }
</script>
```

如果直接将这些代码放在浏览器运行，无法识别Vue代码。

Vue文件再打包的时候，通过vue-loader来进行打包。打包为js

解析模板，读取模板内容，

将模板内容通过AST抽象为语法树，抽象语法树

```js
[
    {tag:"div",attr:["v-bind"],children:[]}
]
```

抽取为一个JS对象，解析这个对象，对象中对应的vue语法替换为js的内容。

```js
[
    {tag:"div",attr:["v-bind"]}--->{tag:"div",attr:[{"index":"xiaowang"}]}
]
```

最终我们虚拟dom参考我们ast抽象语法树。

render渲染，渲染是你解析过后模板。

将js对象编程html模板代码

```js
<div index="xiaowang"></div>
```



###   三、使用 Object.defineProperty() 来进行数据劫持有什么缺点？

Vue2 中我们数据都采用数据劫持的方式来进行动态更新。

```js
Object.defineProperty(obj,key,value) 
```

一次只能劫持一个属性

```js
Object.keys(obj).forEach(item=>{
    Object.defineProperty(obj,item,value) 
})
```

遇到复杂的数据结构，还需要使用递归

```js
let users = [
    {id:1,name:"xiaowang",classes:{
        id:1,name :"web22",teacher:{
            
        }
    }}
]
```

效率问题：

采用数据劫持，数据量比较少的时候，效率比较高。

一旦数据比较复杂，数据量比较大的时候，底层递归。内存消耗、时间复杂度提升。

动态给一个对象新增属性，无法检测

```js
users.address = "武侯区"
```

数组通过下标来操作，无法检测

```js
let array = [1,2,3,4]
array[1] = 10
```

Vue2检测 不到你修改了array的值

必须通过splice来操作数组，才能vue检测到。

### 四.Computed 和 Watch 的区别

Computed :计算属性，依赖原数据，返回一个新结果

Watch ：代表监听数据，监听原数据，一般不会返回结果，可以更新原来数据

1. 缓存。再一个地方重复Computed ，默认缓存起来。watch没有这个功能
2. 执行复杂的业务，比如异步任务，必须Watch，Computed 处理异步，效率非常低。

### 五、slot是什么？有什么作用？原理是什么？

slot在Vue中代表插槽。

父子组件数据通信，我们可以props来进行传递。

你可以传递基本数据类型、传递对象、回调函数

父组件要传递一个模块到子组件，模板可以通过数据来传输。解析过程中比较麻烦

slot插槽，可以允许在父组件使用时候，传递一个UI模块到子组件，

子组件接受这个模块，slot这个占位符来接受。

直接将父组件传递过模块，放在子组件指定位置显示。

```
<Tabs>
	<div></div>
</Tabs>
```

默认插槽：slot没有 名字

具名插槽：slot增加一个名字，父组件传递指定这个名字，模板放在这个位置

作用域插槽：父组件传递过来模块，在使用的时候，可以将子组件数据，通过插槽传递回去

elementUI的表格组件

```html
<el-table :data="data">
	<el-header></el-header>
</el-table>
```

原理：当子组件(vm)实例化的时候，获取到父组件传递过去的slot标签内容，存放在vm.$slot对象中。默认插槽vm.$slot.default.具名插槽，vm.$slot.xxx.当组件渲染的时候，遇到组件又slot标签，使用$slot这个对象里保存的数据拿来替换slot标签。解析template模板

```js
<slot></slot>
```

### 六、vue中过滤器的作用，如何实现一个过滤器

过滤器主要针对页面上渲染的数据进行过滤转化

过滤器提供两种

1. 局部过滤器

   ```js
   export default{
       data(){
           return {}
       }
       filters:{
       	"过滤器名字":function(val){
               //处理传递过来val，return返回新的结果
           }
   	}
   }
   
   <div>{{msg | 过滤器名字 | 过滤器名字2}}</div>
   ```

   一般用于渲染数据，针对局部数据进行转化

   电话号码，一般显示出来，将中间4位变成*

   

2. 全局过滤器

   需要在全局引入

   ```js
   Vue.filter ("过滤器名字",function(val){
       
   })
   ```

   以后再任何个一个组件中都可以直接使用这个过滤器

### 七、常见的事件修饰符及其作用？

```html
<div @click.stop="check"></div>
methods:{
	check(event){
		event.stopPropagation()
	}
}
```

stop:阻止冒泡

prevent：阻止默认事件

once：绑定一次事件

capture:捕获



### 八、v-if、v-show、v-html 的原理

v-if：底层会调用addIfCondition这个函数，生成Node的时候，忽略当前这个节点。render不会渲染

v-show，会生成虚拟Node，render的时候也会渲染一个真实节点，默认会给当前节点添加内联样式display

v-html：默认先移出当前这个节点下面所有节点，调用html方法，通过addProp添加innerHTML，归根揭底v-html底层innerHTML



### 九、v-model 是如何实现的，语法糖实际是什么？

v-model的是下面代码语法糖

```js
<input 
v-bind:value="message"
v-on:input="message=$event.target.value"
>

```

v-model还可以在子组件上面使用

```html
<Child :value="message" @input="function(e){message=e}"></Child>
<Child v-model="message"></Child>

Child:props:["value"]
```


## 面试题08-Vue核心

### 一、Vue中父子组件执行顺序

在父组件中加载子组件

```vue
<template>
	<Child></Child>
</template>
```

加载和渲染过程

1. 父组件beforeCreate
2. 父组件created
3. 父组件beforeMount 组件即将挂载
4. 子组件beforeCreate
5. 子组件created
6. 子组件beforeMount
7. 子组件Mounted
8. 父组件Mounted

更新过程

父组件beforeUpdate

子组件beforeUpdate

子组件updated

父组件updated



销毁过程

父组件breforeDestory

子组件breforeDestory

子组件destoryed

父组件destoryed



### 二、一般异步请求放在哪个生命周期执行

created：组件创建完毕后，发送异步请求

breforeMount这个钩子函数发送请求

mounted这个生命周期发送请求，公司里面更多的是在这个地方发送异步请求

### 三、keep-alive有哪些生命周期

内置组件，抽象组件，这个组件不会跟DOM有关联。

activated：进入指定的某个组件的时候，执行这个生命周期

deactivated：离开这个组件的时候，我们会执行这个生命周期

一旦组件被缓存，以后不会销毁这个组件，下次进来我要检测到组件有变化，需要使用这两个生命周期钩子函数来实现。

### 四、组件通信

父组组件

1. props 、$emit

2. props来获取数据，父组件传递一个回调函数

   ```html
   <template>
       <Child :data="data" :check="function(){}"></Child>
   </template>
   
   props:["check"]
   check()
   ```

3. $parent和$children

   在当前这个组件中，Vue内置了$parent和$children这些属性。

   你可以在这个组件中this获取$parent，找当前这个组件的父组件

   你也可以获取$children，当前这个组件的子组件是谁。

4. $attr和$listeners:遇到隔代的组件，我们可以使用这种方案来传递

5. provider和inject方式来传递数据

6. EventBus也可以上实现，这种方式不推荐使用。



### 五、VueRouter的懒加载

```js
const router = new Router({
    routes:[
        {path:"/list",component:"List"}
    ]
})
```

懒加载写法:当我真正访问这个路由，调用函数。

```js
const router = new Router({
    routes:[
        {path:"/list",component:()=>import("./List")}
    ]
})
```

```js
const router = new Router({
    routes:[
        {path:"/list",component:resolve=>require(["List"],resolve)}
    ]
})
```

webpack默认依赖于Nodejs环境来运行，require正好是我们Node模块化。

webpack打包项目，将模块require引入到项目

### 六、路由模式

开发的时候理由提供两种模式

1. hash：默认的模式，一个URL地址带#，#/users这个就是hash值。hash值会出现在url地址里面，但是不会出现请求中，对后端完全不会有影响。改变hash值不会重新加载页面。

   原理

   ```js
   //原生js代码中有一个专门监控hash值变化的事件
   window.onhashchange = function(){
       //执行代码
   }
   ```

2. history

   histroy路径中没有#，使用的是传统的路由分发模式，

   history模式底层采用H5的一些技术点

   HTML5的 History对象，pushState、replaceState可以用于进行页面跳转，记录日志或者不记录日志。

   还包含back、go、forward等等方法

你可以切换我们路由模式

```js
new VueRouter({
    mode:"history"
})
```

### 七、$Router和$Route区别

$Route代表路由信息对象，包括 path、params、hash、query等等。

$Router，代表路由实例对象，相当于我们开发过程中，new Router 这个对象返回的结果。

### 八、守卫

针对我们路由访问的一些验证。

访问某个路由的时候，我可以进行守卫操作。动态决定你是否能够访问

全局前置守卫：beforeEach、afterEach

路由独享：beforeEnter

组件内：beforeRoterEnter、beforeRouterUpdate、beforeRouterLeave

一般我们会用守卫来实现动态访问权限，动态路由等等功能

守卫要是慎用，如果用的过程中优化不好，效率性能很低。








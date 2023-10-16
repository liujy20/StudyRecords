## 面试题07-Vue核心概念

上节课：$nextTick原理、混入、keepalive原理

### 一、Vue自定义指令

Vue中如果你要涉及到对DOM进行操作。使用到自定义指令。

定义方式：

全局：Vue.directive()

局部：direvtives:{}

提供很多钩子函数

bind:只调用一次，表示将这个指令绑定到元素身上的时候执行

inserted：被绑定的元素插入到父节点的时候，执行一次，当前这个节点已经开始加载

update：所有组件Vnode更新的时候，

```js
export default{
    data(){
        return {
            
        }
    },
    //v-red
    directives:{
        "red":{
            bind(node){
                
            }
        }
    }
}

<button v-red="value">
```

全局指令，一般会再项目目录下面单独创建一个directive文件夹。再这个文件夹创建js文件

```js
import Vue from "vue"
Vue.directive("指令名字",绑定钩子函数)
```

使用场景：

Vue需要对底层dom进行操作，可以使用自定义指定。

按钮级别权限，我们可以将业务封装指定指令，通过指令动态显示和隐藏按钮

页面懒加载也使用自定义指定。

### 二、Vue依赖收集概念

Vue初始化每个组件的时候，都会对Data进行初始化，普通对象就会变成响应式对象。

这个过程会进行依赖收集。

```js
//Dep属性watcher对象收集者
const Dep = new Dep()
Object.defineProperty(obj,key,{
    get(){
        if(Dep.target){
            //这个地方依赖收集，
           dep.append()
         }
    },
    set(){
        //让dep来通知所有watcher进行页面更新
    }
})
```

```js
<div>{{user.name}}</div>
user.name = "xiaowang"
```

Dep对象

```js
class Dep{
    
}
```

Watcher对象

```js
class Watcher{
    
}
```

确认好当前我们数据是否被使用，如果被使用，给当前这个数据创建一个Watcher对象，需要将Watcher放在Dep中，Dep统一来触发指定的Watcher进行页面更新。

Watcher中render，render可以实现页面更新

观察者模式

### 三、React和Vue异同

相同：

1. 都是将核心的代码放在一个库里面 react.js  vue.js，其他内容，路由状态机都是其他模块来解决
2. 都有自己的构建工具，vue/cli  create-react-app
3. 都用了虚拟dom，减少对dom操作
4. 都有单项数据流概念，props接受外部数据
5. 采用组件化的思想来进行设计，达到页面复用

不同：

1. 数据流：Vue数据默认支持双向绑定，React提供单项数据流，我们需要自己页面修改后数据更新。

2. 虚拟DOM：Vue2的虚拟dom，再渲染过程中，会跟踪每一个依赖，不需要重新渲染整个组件树

   React每当一个组件状态发生变化，他所有子组件都要重新渲染，PureComponent/shouldComponentUpdate、useMemo来解决父组件更新后，子组件一起更新问题

3. 组件化：Vue提供模板来变成，template模板，将模板采用AST算法形成语法树，

   React采用JSX，babel将JSX代码编译为JS

4. 监听数据变化原理不同：

   Vue采用数据劫持，get、set来动态获取变化的数据，更新的地方。

   React默认采用比较引用的方式来进行判断，数据修改了，需要比较当前数据引用的是否发生变化，如果发生变化页面才会更新，修改一个一个对象，页面更新不了。

   ```js
   return {...state}
   ```

### 四、Vue框架性能优化

（编译阶段）

1. 尽量减少data中的数据，data中数据越多，数据劫持花费时间时间。
2. v-if和v-for尽量不要同时使用
3. 可以使用事件代理的方式来完成事件绑定，可以不用给每个元素绑定一个事件，v-for
4. keep-alive来缓存某些组件
5. v-if和v-show合理使用
6. v-for绑定唯一key
7. 路由懒加载、异步组件

(打优优化)，主要配置webpack

1. 压缩代码
2. Tree-Sharking技术，不用内容可以不打包
3. 使用cnd加速一些资源
4. 开启多线程打包。

### 五、Vue初始化页面闪动问题

```js
<div>{{user.name}}</div>
```

页面一进来就被加载，div不归Vue管，Vue主要data。

我们写的代码再还没有解析情况，可能出现花屏现象

看到类似于{{user.name}}

可以采用css代码来解决

```js
[v-clock]{
    display:none
}
```

v-clock是一个指令，当页面没有加载完之前先隐藏这个节点，等数据加载完了，渲染出来






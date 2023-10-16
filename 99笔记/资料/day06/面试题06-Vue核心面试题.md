## 面试题06-Vue核心面试题

### 一、题目

1. 对keep-alive的理解，它是如何实现的，具体缓存的是什么？
2. LRU （least recently used）缓存策略
3. $nextTick 原理及作用
4. Vue 中给 data 中的对象属性添加一个新的属性时会发生什么？如何解决？
5. Vue 单页应用与多页应用的区别
6. Vue data 中某一个属性的值发生改变后，视图会立即同步执行重新渲染吗？
7. 简述 mixin的作用。

### 二、对keep-alive的理解，它是如何实现的，具体缓存的是什么？

keepalive是一个组件，这个组件Vue内部提供。

并不会在页面进行DOM渲染。

缓存包裹的组件

(1)keepalive常见属性

1. include：字符串和正则表达式，匹配组件名字，
2. exclude：字符串和正则表达式。匹配组件的名字
3. max：这个组件换成最大值，最多可以换成多少个组件

源码：

keepalive.vue

```js
<keepalive include="header">
    <Header></Header>
</keepalive>
```

```js
export default {
    name:"keep-alive",
    abstract:true //抽象组件，自身不会渲染dom原生。也不会出现父组件中
    
    props:{
    	include:正则、字符串,
    	exclude:正则、字符串,
    	max:[String,Number]
	}
    created(){
        //cache这个属性用于存在组件
        this.cache = Object.create(null)
        //保存换成哪些组件，名字
        this.keys = ["header"]
    }
	destoryed(){
        //清空cache换成和keys保存组件名字
        for(const key in this.cache){
            pruneCacheEntry(this.cache,this.keys)
        }
    }
	mounted(){
        //include、exclude发生变化，根据最新的来决定cache和keys里面数据是否动态变化
        this.$watch("include",val=>{
            //监控include这个属性发生变化，进行判断是否缓存
            pruneCache(this,()=>{})
        })
        this.$watch("exclude",val=>{
            //监控include这个属性发生变化，进行判断是否缓存
            pruneCache(this,()=>{})
        })
    }
}
```

实现步骤：

1. 获取keep-alive这个组件下面第一个子组件实例，通过名字获取这个组件
2. 通过当前include和exclude这个属性匹配组件的名字，判断当前组件是否需要缓存，如果需要缓存，返回当前vnode，
3. 需要缓存，判断他当前是否已经在cache这个对象中，名字keys里面
4. 存在：将原来位置的key移出，同时给这个key数组添加一个新的key。LRU算法
5. 不存在，将key放在数组中，判断当前key是否已经超过最大max，超过了最大max，采用削减策略将最长不活动组件删除，将这个组件加入缓存中
6. 最后将这个缓存组件，设置一个keep-alive：true

### 三、LRU （least recently used）缓存策略

LRU：从内存中找出最久未使用的组件，并用新的组件进行替换。

LRU算法根据数据的访问历史记录来进行淘汰数据，如果某个数据被访问过，将来被访问几率就会很大，将之前某个组件删除，将最近的组件存放缓存中。max决定我们缓存多少。

用到了链表的算法。

1. 新数据插入到链表头部，
2. 每当缓存命中（缓存数据被访问），就会将这个数据移动到链表头部
3. 链表已经满了，将链表最后数据丢弃。

### 四、$nextTick 原理及作用

当我们Vue中节点挂载完毕，DOM重新渲染后，默认执行$nextTick

mouted代表挂载完成。

$nextTick：界面渲染完毕，

```js
window.onload = function(){
    //执行js代码。
}
```

底层核心采用Promise、setTimeout、setInterval等等技术来上实现

```js
this.$nextTick(()=>{
    
})
```

运行到这段代码的时候，默认()=>{}放在任务队列中，等待页面挂载完成后，在从任务队列中调用函数，执行这个函数，

底层原理：事件循环。微任务队列。

```js
created(){
    this.$nextTick(()=>{
        const app = document.getElementById("app")
    })
}
```

### 五、Vue 中给 data 中的对象属性添加一个新的属性时会发生什么？如何解决？

Object.defineProperty 缺点

新增一个属性，这个属性无法被识别，无法做成响应式变化结果。

数据劫持在程序运行的时候已经执行完毕，动态给对象新增属性，数据劫持检测不到。

```js
this.$set(this.obj,"address","wuhouqu")
```

强行触发数据劫持在执行一遍，address属性就能响应式变化

#### 六、Vue 单页应用与多页应用的区别

SPA：单页面应用开发：整个项目只有一个页面，其他的都通过组件来进行页面构造

一个html中动态替换显示内容，最终实现很多种页面。

MPA：多页面应用开发：每个页面都是一个独立html文件，每个HTML文件中也可以引入其他组件。

SPA开发效率会更高一些，灵活性更高。SEO优化，这种开发方式不利于SEO。

```js
1. 浏览器第一次访问服务器，index.html，此刻html页面啥数据都没有
2. 发送异步请求获取数据，动态渲染。
3. 搜素引擎爬虫，找index.html 啥数据都没有
```

MAP：开发会更加繁琐，但是利用SEO优化，

项目开发：首页需要做SEO，采用后端渲染SSR,其他页面正常单页面开发。

三阶段做考试系统，MPA开发，多页开发。



### 七、Vue data 中某一个属性的值发生改变后，视图会立即同步执行重新渲染吗？

```js
export default{
    data(){
        return {
            msg:"xiaowang",
            username :"xiaoliu"
        }
    }
    methods:{
    changeData(){
        this.msg = "xiaofei"
        this.msg = "xiaoliu"
        
        this.username = "wanger"
    }
}
}
```

Vue不会同步执行页面渲染，Vue的响应式不会再data发生变化后立即dom更新，按照一定的策略进行更新。

Vue再更新DOM的是异步的任务，只要侦听到数据变化，开启一个队列，并缓冲再同一个事件循环中执行的数据变更，同一个Watcher调用多次，只会往队列中推一次，在缓存中会取出重复的数据，避免不必要dom操作。

### 八、简述 mixin的作用。

一个页面如果遇到重复UI，一般会提取为公共组件。

但是一个页面重复JS代码，采用混入将JS代码提取出去。

提取出去的代码，要和你当前代码柔和在一起，这个过程混入

```js
import a from "///"
export default {
    minxin:["a","b"]
    data(){
        return{
            msg:"xiaowang"
        }
    }
}
```

a.js

```js
export default {
    data(){
        return {
            msg:"xiaofei",
            username:"xiaowang"
        }
    }
    created(){
        
    }
}
```

混入后结果

```js
import a from "///"
export default {
    minxin:["a","b"]
    data(){
        return{
            msg:"xiaowang"，
            username:"xiaowang"
        }
    }
	created(){
        
    }
}
```



如果内部数据和混入数据一样.混入过后结果和原始数据发生冲突，原始数据为主。
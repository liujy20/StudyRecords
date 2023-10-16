## Vue3面试题

### 一、Vue2和Vue3区别

#### 响应式原理发生变化

Vue2基于数据劫持+观察者模式来实现的。

Vue3底层采用的是Proxy+Reflect

#### 数据检测发生变化

Vue3基于Proxy代理来实现响应式。检测到对象属性增删改查。

#### Vue3开发过程文档片段

Vue2templayte模板，默认要有根标签

Vue3template标签不需要根标签

DOM的一个片段。

```js
documentFragment
```

React中文档片段

```js
<Fragment>
    <h1></h1>
<Fragment/>
```

Vue3默认底层引入了文档片段。类似于React，节点可以默认放在文档片段中，统一的挂载和处理



#### 开发语法不同

Vue2数据放在data中。

Vue3中放在ref和reactive中



#### api不同

选项式api：vue2全是选项式api（Options api）

```js
export default {
    methods:{
        
    },
    created(){
        
    },
    watch:{
    }
}
this.$watch()
```



响应式api：Vue3采用响应式api（Composition api）

```js
import {ref,reative,watch,watchEffect} from "vue3"

const num = ref(0)
```



####  生命周期函数

Vue2中8个标准生命周期函数

标准8个+keep-alive*2+组件守卫*3

4个阶段。八个生命周期函数



Vue3中：

三个阶段：常见使用6个。

```js
import {onMounted} from "vue3"
onMounted(()=>{
    
})
```



### 二、Object.defineProperty和Proxy区别

数据劫持的一些问题：

1. 数据劫持再第一次进来初始化的，遍历对象所有的key，对象嵌套比较深，效率比较低
2. 检测不到对象属性添加和删除。$set方法，或者修改原来data对象地址，才能重新劫持
3. 检测不到数组下标操作数据的变化。
4. 不支持Map和Set这种数据解构
5. 底层Wacther和Dep实例占用内容比较多

Proxy好处：

1. Proxy代理是整个对象，不是某个属性。只需要一层代理就可以了。无需考虑对象深度
2. Proxy解决数组、对象无法检测的问题
3. 实现响应式，能够减少一些性能消耗。

代理对象

```js
const obj = {
    name:"xiaowang",
}

//代理的就是你们指定的对象
//代理对象和原来对象一模一样。甚至代理对象比原来对象功能更加丰富
let objProxy = new Proxy(obj,{
    get(target,key){
        console.log(`get=捕获到操作了对象获取${key}`);
        //你可以做很多操作
        return target[key]
    },
    set(target,key,value){
        console.log(`set=捕获到操作了对象操作${key}`);
        target[key] = value
    }
})

console.log(obj.name);
console.log(objProxy.name);
objProxy.name = 'xiaofeifei'
console.log(objProxy);
console.log(obj);

```

### 三、Diff算法优化

只要数据发生变化，页面就会更新。

中间引出虚拟DOM概念，patch过程。

Vue3中优化：

Vue3中很多模块内容都标注为静态化。只要是静态化的内容，再进行对比过程中。非常快

1. 事件缓存：@click---> 但是Vue3将这部分代码标注为静态代码
2. 静态提升：第一次创建节点，标注静态，下一次就可以直接使用。
3. 添加静态标记：给节点添加静态标记，优化diff过程（减少了我们频繁对比）

区别：

Vue2是全量diff

Vue3静态标记+非全量diff

diff算法比较消耗时间的地方再对比

### 四、Vue3语法

setup函数

```js
export default {
	setup(){
        ref()
    }
}
```

setup属性

```js
<script setup>
    
</script>
```

### 五、Vue3中常见的api

数据类型：
ref：ref定义数据，每个数据都返回变量。template标签中使用，直接用这个变化。修改 变量.value

```js
<temnplate>
 	<p>{{data}}</p>   
 </template>
const data =  ref(0)

data.value = 10
```

reactive:定义响应式数据变化，里面可以存放复杂的数据类型。修改比较麻烦 。

```js
const rea = reactive({
    count:10
    user:{
        id:1
	}
})

rea.count = 20
rea.user = {id:1} //页面不会更新，直接操作user。rea.user.splice()
```

建议用ref来定义数据

### 六、Vuex和pinia


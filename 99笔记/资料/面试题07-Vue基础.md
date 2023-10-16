## 面试题07-Vue基础

### 一、关于data的特点

页面中使用有两种方式

页面A：

```html
<html>
    <head>
        <div id="app">
            <p>{{msg}}</p>
        </div>
        <script src="./node_module/vue/dist/vue.js"></script>
        <script>
        	const app = new Vue({
                el:"#app",
                data:{
                    msg:"xiaowang"
                },
                methods:{
                    
                },
                computed:{
                    
                }
            })
        </script>
    </head>
</html>
```

页面B

```html
<html>
    <head>
        <div id="app">
            <p>{{name}}</p>
        </div>
        <script src="./node_module/vue/dist/vue.js"></script>
        <script>
        	const app = new Vue({
                el:"#app",
                data:{
                    name:"xiaowang"
                },
                methods:{
                    
                },
                computed:{
                    
                }
            })
        </script>
    </head>
</html>
```

脚手架开发

main.js中

```js
new Vue({
   data(){
       return{
           
       }
   },
    render:(app)=>h(app)
    routes,
    store
}).$mount("#app")
```

组件中data只能是函数

D组件

```js
export default {
    data:{
        
    }
}
```

A组件引入D组件,,B组件引入D组件

```html
<head>
<script src="1.js"></script>
<script>
    let a = 10
</script>
</head>
```

### 二、数据更新问题

Vue底层数据劫持。

代码加载的时候，读取data数据，Vue底层获取data数据，进行数据劫持。

```js
data(){
    return{
        user:{id:1,name:"xiaowang"}
    }
}

methods:{
    change(){
        this.user.address = "wuhouqu"
    }
}
```

vue官方提供了一个方法

```js
$set(对象，属性，值)
```



对数组的操作

1. 基本上改变原数组的内容，vue都能检测到。
2. 操作数组，得到一个新数组，页面不会更新
3. 直接操作下标，页面不会更新

```js
class Vue{
    static set(){
        
    }
    $set(){
        
    }
}
new Vue().$set()
Vue.set()
```

### 三、组件通信

父组件：Parent

```vue
<div>
    <Child msg="xioawnag" id=1></Child>
</div>
```

子组件：Child

```vue
export default {
	props:["msg"]
	created(){
		console.log(this.$attrs) ===>{id:1}
	}
}
```




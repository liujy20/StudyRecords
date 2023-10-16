## 面试题08-Vuejs基础

### 一、mixin

遇到多个页面有相同UI部分内容，我们考虑抽取出组件。

如果多个组件中，export default（JS）中代码是高度重复的内容（data、methods、computed、watch）都提取到混入中，引入部分内容

混入的代码和组件中自己代码产生冲突。

user.js

```js
export default{
    data(){
        return{
            msg:"xiaowang",
            name:"武侯区"
        }
    }
}
```

组件中

```js
export default{
    mixin:[""],
    data(){
        return{
            msg:"xiaozhang"
        }
    }
}
```

### 二、插槽

我们自己封装的组件，在使用过程中当成标签使用

```js
<Header>
    <div>123</div>
</Header>
```

Header

```vue
<div>
	<div>
        <slot></slot>
    </div>
</div>
```

插槽：

1. 匿名
2. 命名
3. 作用域

封装组件应该考虑哪些问题？

目的：

1. 简化当前页面的布局，将进行页面模块化。方便后期维护，代码修改
2. 提取公共模块。达到页面复用的效果。减少冗余代码。减少业务差异
3. 组件样式的穿透或者样式对其他组件

封装流程：

1. 封装的组件内部的数据要动态变化。比如Table组件。针对数据进行校验，校验不通过进行警告或抛出异常
2. 考虑UI部分的动态变化，可以运行用户通过插槽的方式。自定义组件某块UI的布局，Table表头可以传递进去，ElementUI采用插槽的方式将表头传递进去。antd将表头作为数据，传递进去

Element：

```vue
<el-table>
	<el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
</el-table>
```

antd:

```js
<Table dataSource={dataSource} columns={columns} />;
```








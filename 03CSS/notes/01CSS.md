## CSS

网页主要是由三大部分构成：

- ==HTML==：搭建网页的骨架，网页的页面结构设计
- ==CSS==：网页的样式，用于美化网页
- ==JavaScript==：动态脚本，控制页面中动态交互效果，点击效果

### 1、基本概念

CSS（Casacding Style Sheets）层叠样式表，用来控制网页的样式，不能直接使用，作用在页面上的标签上的，控制标签的样式

层叠：css样式代码可以书写在多个地方，首先检查代码中有没有css样式，如果有将内联样式、内部样式、外部样式、浏览器默认样式、用户自定义的样式叠加在一起，形成最终的一套样式，相同的属性进行层叠，不同的属性直接作用在标签上。

样式表：指的是css样式代码，页面中在标签上`style`属性中书写的代码、`style`标签中通过选择器书写的代码、外部的css文件中通过选择器来书写的代码。

### 2、样式来源

所有的标签默认是没有样式

#### （1）浏览器默认的样式

- 浏览器在渲染页面时，默认会给不同的标签添加不同的样式，比如`h`标签、`p`标签、`a`标签等。

#### （2）浏览器用户自定义的样式

- 浏览器默认给每个标签添加了样式，还提供了用户可以更改对应的部分样式，比如：字体大小、字体样式等

#### （3）内联样式（自己编写的）

- 通过在标签上添加style属性，在属性值中书写css样式代码

- 语法：

  ```html
  <p style="css属性名1:css属性值1;css属性名2:css属性值2;css属性名3:css属性值3;">内容</p>
  ```

- 注意：style属性是每一个标签都有。

- 好处：

  - 哪个标签需要样式就在哪个标签上添加即可

- 缺点：

  - 多个标签同时设置相同的样式时，需要每个标签添加
  - 结构代码和样式代码混淆在一起

#### （4）内部样式（自己编写的）

- 在`<head>`标签中添加`<style>`标签，在标签里面通过选择器来书写的css代码

- 语法：

  ```html
  <head>   
    <style>    
      选择器{   
        css属性名1:css属性值1; 
        css属性名2:css属性值2 ;       
        css属性名3:css属性值3;  
      }  
    </style>
  </head>
  ```

- 好处：

  - 多个标签如果同时设置相同的样式时，可以提取公共样式
  - 结构代码和样式代码基本分离
  - 结构代码更加的清晰，便于后期维护

- 缺点:

  - 结构代码和样式代码没有完全分离

#### （5）外部样式（自己编写的）

- 先创建一个后缀名为`.css`的文件，在文件中通过选择器来书写css样式代码，再在`<head>`标签中通过`<link>`标签引入外部的css文件即可

- 语法：

  ```html
  <head>   
    <link rel="stylesheet" href="连接需要引入的css文件的文件路径">
  </head>
  ```

- 好处：

  - 结构代码和样式代码完全分离开

注意：

- 在相同选择器时，内联样式优先级最高，内部和外部采用就近原则，离标签近的优先作用
- 如果同一个标签上设置相同的css属性时，后面的样式会覆盖前面的样式

## 选择器

- 找到页面中满足条件的标签来作用css样式代码

### 1、标签选择器

- 通过标签上的标签名找到满足条件的标签来作用css样式代码，在没有规定作用范围时，默认找到页面中所有满足条件的的标签

- 语法：

  ```css
  标签名{    
    css属性名1: css属性值1;    
    css属性名2: css属性值2; 
    css属性名3: css属性值3;
  }
  ```

### 2、类选择器

- 又称为class选择器，通过标签上的class名找到满足条件的标签来作用css样式代码

- class名可以重复使用，多个标签上设置相同的class名，可以用来提取公共样式

- 语法：

  ```css
  .class名{ 
    css属性名1: css属性值1;  
    css属性名2: css属性值2;  
    css属性名3: css属性值3;
  }
  ```

- 注意：

  - 标签上的class名可以设置多个，中间使用空格隔开

    ```html
    <p class="box item">内容</p>
    ```

  - 选择器可以组合在一起使用，中间没有空格，代表并且的意思

    ```css
    /* 找到标签上的class名中既包含ob又包含op的标签 */
    .ob.op{
      color: yellow;
    }
    ```

### 3、id选择器

- 通过标签上的id名找到满足条件的标签来作用css样式代码

- id是唯一，同一个网页中同名的id只能有一个，只能找到一个标签

- id命名方式：

  - 是由字母、数字、_和-构成
  - 不能以数字开头，不能包含特殊的符号

- 语法：

  ```css
  #id名{  
    css属性名1: css属性值1;   
    css属性名2: css属性值2;   
    css属性名3: css属性值3;
  }
  ```

### 4、后代选择器（派生选择器）

- 找到指定标签里面所有满足条件的后代标签，找到儿子、孙子、重孙子….

- 中间使用`空格`隔开

- 语法：

  ```css
  找到class名为box的标签里面所有的后代a标签
  .box a{
    
  }
  ```

### 5、子元素选择器

- 找到指定标签里面满足条件的直接子标签，只找儿子，不找孙子、重孙子….

- 中间使用`>`间隔

- 语法：

  ```css
  找到class名为box的标签里面的直接子标签a标签
  .box > a{
    
  }
  ```

### 6、相邻兄弟选择器

- 找到指定标签后面满足条件相邻的第一个兄弟标签

- 中间使用`+`间隔

- 语法：

  ```css
  找到class名为box后面相邻的第一个兄弟a标签
  .box + a{
    
  }
  ```

### 7、后续兄弟选择器

- 找到指定标签后面所有满足条件的兄弟标签

- 中间使用`~`间隔

- 语法：

  ```css
  找到class名为box的标签后面所有的兄弟a标签
  .box ~ a{
    
  }
  ```

### 8、属性选择器

- 通过标签上的属性名和属性值找到满足条件的标签

| 选择器             | 说明                                                         |
| ------------------ | ------------------------------------------------------------ |
| `[属性名]`         | 找到标签上带有指的的属性名的标签                             |
| `[属性名=属性值]`  | 找到标签上带有指定的属性名和属性值的标签【==精确匹配==】     |
| `[属性名*=属性值]` | 找到标签上指定的属性名中包含指定的属性值的标签【==模糊匹配==】 |

### 9、伪元素选择器

- 通过css代码给html标签添加一块渲染的区域，该区域可以设置内容和css样式

| 选择器           | 说明                                   |
| ---------------- | -------------------------------------- |
| `::before`       | 向标签的内容之前添加一块渲染区域       |
| `::after`        | 向标签的内容之后添加一块渲染区域       |
| `::first-letter` | 向标签中第一个字符区域添加样式【了解】 |
| `::first-line`   | 向标签中第一行区域添加样式【了解】     |
| `::selection`    | 向标签中被鼠标选中区域添加样式【了解】 |

- 注意：【重点】
  - `::before`和`::after`必须和`content:"内容"；`一起使用才有效
  - `::before`和`::after`渲染的是一个行内元素，如果需要设置宽度和高度，可以转为行内块级元素或块级元素
  - `::before`和`::after`渲染的是标签中的子元素

### 10、通配符选择器

- 找到页面中所有的标签

- 语法：

  ```css
  *{  
    css代码
  }
  ```

### 11、伪类选择器

- 一般用于添加一些功能性

| 伪类选择器 | 描述                         |
| ---------- | ---------------------------- |
| `:link`    | 向未被访问过的超链接添加样式 |
| `:visited` | 向访问过的超链接添加样式     |
| `:hover`   | 向鼠标悬停的标签添加样式     |
| `:active`  | 向被激活的标签添加样式       |
| `:focus`   | 向获取焦点的标签添加样式     |

### 13、选择器分类

- 基础选择器：标签选择器、类选择器、id选择器、属性选择器、伪元素选择器、伪类选择器、通配符选择器
- 组合选择器：后代选择器、子元素选择器、相邻兄弟选择器、后续兄弟选择器

### 14、选择器优先级（权重）

1. 选择器相同时，内联样式权重最高，内部和外部采用就近原则

2. 不同的选择器时，基础选择器的权重（优先级）：

   ID选择器>类选择器（属性选择器）>标签选择器>通配符选择器>继承的样式

3. 组合选择器是由多种基础选择器构成，它的权重就需要通过计算得到

#### 1、加法运算

- 将所有基础选择器的权重值相加，对比权重值的大小，值大的权重越高
  - 内联样式的权重值为1000
  - id选择器的权重值为100
  - 类（属性）选择器的权重值为10
  - 标签选择器的权重值为1
- 注意：不满足满10进1的规则，十几个标签选择器都没有一个类选择器的权重高

#### 2、4个0

（0,0,0,0）

- 第一个0：代表有无内联样式，有则为1，没有则为0
- 第二个0：代表id选择器的个数
- 第三个0：代表类（属性）选择器的个数
- 第四个0：代表标签选择器的个数

从第一个0的位置开始对比，值大的权重越高，值相同，对比下一个0的位置的值，依次类推，直到对比到最后一个0的位置。如果最后一个0的位置的值相同，权重是一样，后面盖住前面的样式

3、`!important`【拓展】

- 语法：

  ```css
  选择器{   
    color:red  !important;
  }
  ```

- 注意：`!important`比较暴力，会无视权重的大小，直接将css样式作用在标签上，比内联样式优先级还高，慎用。

## 常用标签

### 1、超链接标签

- 用于在网页中进行页面跳转

- 语法：

  ```html
  <a href="设置打开网页的文件路径"  target="设置打开网页的的方式">点击的内容</a>
  ```

  - `href`：设置打开网页的文件路径，可以是网络路径
  - `target`：设置打开网页的方式
    - `_self`：默认值，当前窗口打开网页
    - `_blank`：新开窗口打开网页

#### （1）超链接样式

| 伪类选择器 | 描述                         |
| ---------- | ---------------------------- |
| `:link`    | 向未被访问过的超链接添加样式 |
| `:visited` | 向访问过的超链接添加样式     |
| `:hover`   | 向鼠标悬停的标签添加样式     |
| `:active`  | 向被激活的标签添加样式       |

例子：

```css
/* 向未被访问过的超链接添加样式 */
a:link { 
  color: red;
}
/* 向访问过的超链接添加样式 */
a:visited {  
  color: green;
}
/* 向鼠标悬停的标签添加样式  :hover只能放在:link和:visited之后*/
a:hover {   
  color: yellow;
}
/* 向被激活的标签添加样式 :active需要翻转:hover之后 */
a:active { 
  color: blue;
}
```

- 注意：
  - `:link`和`:visited`是超链接特有的
  - 给超链接添加样式时，`:hover`必须放在`:link`和`:visited`之后，`:active`必须放在`:hover`之后（顺序：==L-V-H-A==）

### 2、普通输入框

- 语法：

  ```html
  <input  type="text" placeholder="设置输入框中提示性的信息">
  ```

#### （1）更改placeholder的样式

- 语法：

  ```css
  input::placeholder{ 
    color:red;
  }
  ```

#### （2）取消input获取焦点的样式

- 语法：

  ```css
  input:focus{  
    outline:0px; 
    或    
    outline:none;
  }
  ```

- `:focus`：伪类选择器，设置标签获取焦点的样式

- `outline`：设置边框外的一圈轮廓线，设置方式`outline:宽度 类型 颜色;`

### 3、换行标签

一个br标签就可以换一行

- 语法：

  ```html
  <br>
  或
  <br/>
  ```

## 背景样式

### 1、设置背景颜色

`background-color`：设置背景颜色

- `单词`
- `#十六进制`
- `rgb(0~255,0~255,0~255)`

### 2、设置背景图片

`background-image`：设置背景图片

```css
background-image:url(引入背景图片的文件路径)
```

- 如果背景图片和背景颜色同时存在，背景图片会盖住背景颜色

### 3、设置背景图片是否重复铺设

`background-repeat`：设置背景图片是否重复铺设

- `repeat`：默认值，沿着x轴和y轴方向同时平铺
- `repeat-x`：沿着x轴进行平铺
- `repeat-y`：沿着y轴进行平铺
- `no-repeat`：不平铺

### 4、设置背景图片的显示位置

`background-position`：设置背景图片的显示位置

背景图片默认显示在盒子的左上角

```css
background-position: x轴  y轴；
```

- 单词：`left`左 `right`右 `center` 居中 `top`上 `bottom`下，两两搭配使用
- 像素：0px 0px代表盒子的左上角
- 百分比：50% 50% 相当于`center` `center` ，默认是参考的盒子的宽度和高度，如果设置， 背景图片固定在页面上时，参考的是显示区域的宽度和高度

### 5、设置背景图片的大小

`background-size`：设置背景图片的大小(css3提出的)

- `contain`：宽度和高度铺满一边，另一边不管

- `cover`：宽度和高度都铺满，超出部分隐藏

- `宽度 高度`：像素和百分比

  百分比：默认是参考的盒子的宽度和高度，如果设置`flexed`背景图片固定在页面上时，参考的是显示区域的宽度和高度

### 6、设置背景图片是否固定在页面上

`background-attachment`：设置背景图片是否固定在页面上

- `scroll`：默认值，随着滚动条滚动

- `fixed`：固定在页面上，不随着滚动条滚动

- `background`：复合属性

  ```css
    background: pink url(./img/img-2.jpg) no-repeat  50px 100px /200px 200px;
  ```

  注意：`/`前面代表背景图片的显示位置`position`，`/`后面代表背景图片的大小`size`

### 7、设置背景的显示区域

`background-clip`：设置背景的显示区域（CSS3）

- `border-box`：边框+padding+content区域铺设背景
- `padding-box`：padding+content区域铺设背景
- `content-box`：content区域铺设背景

## 文本样式

- `color`：设置文本的颜色

  - 颜色单词
  - 十六进制
  - rgb(0~255,0~255,0~255)

- `text-align`：设置文本的对齐方式

  - `left`：默认值，左对齐
  - `center`：居中对齐
  - `right`：右对齐

  注意：`text-align`不仅仅可以设置文本的对齐方式，还是设置在标签上控制里面的行级标签的对齐方式

- `line-height`：设置文本的行高

  - 像素
  - 数字或百分比：是参考的当前标签的字体大小font-size的值

- `text-decoration`：设置文本的修饰

  - `underline`：设置下划线
  - `line-through`：设置中划线，删除线
  - `overline`：设置上划线
  - `none`：无，可以用于取消a标签的下划线

- `text-transform`：设置字母的大小写

- `text-indent`：设置首行缩进

- `letter-spacing`：设置字符间距，一个**中文**或一个**字母**或一个符号都是一个字符

- `word-spacing`：设置字间距，是以空格来区分

## 列表标签

### 1、无序列表 ul

- 语法：

  ```html
  <ul>   
    <li>HTML</li> 
    <li>CSS</li>  
    <li>JavaScript</li>
  </ul>
  ```

### 2、有序列表 ol

- 语法：

  ```html
  <ol>  
    <li>前端开发</li> 
    <li>Java开发</li>
    <li>测试开发</li>
  </ol>
  ```

注意：

- `ul`、`ol`、`li`默认独占一行
- `ul`和`ol`标签默认上下有外边距`margin`，和左边的内边距`padding-left`

### 3、取消列表标签的默认的样式

- 语法：

  ```css
  ul{   
    margin:0;   
    padding:0;  
    /* 取消列表标签的小圆点 */   
    list-style:none;
  }
  ```

## 字体样式

- `font-size`：设置字体的大小
- `font-family`：设置字体的类型
  - 可以设置多种风格类似的字体，中间使用逗号隔开，浏览器先在系统中查找第一种字体，如果有则直接使用，如果没有，则找第二种字体，依次类推，一般最后一种字体使用通用字体（大多数计算机默认安装了的字体）。
  - 字体名如果是中文或多个英文单词，则需要使用==单引号==或==双引号==包裹
- `font-weight`：设置字体的粗细
  - `100~900`：数字越大，加粗效果越好，注意不用带单位
  - `normal`：默认值，正常粗细
  - `bold`：加粗
  - `bolder`：更粗
  - `lighter`：比正常字体更细
- `font-style`：设置字体的风格
  - `normal`：默认值，正常
  - `italic`：斜体

#### 字体引用技术

- 可以在网页中使用自己的字体文件，系统中不一定安装了指定的字体，可以将字体文件上传到服务器，访问网页就可以使用服务器中的指定字体

- 语法：

  ```css
  @font-face {  
    /* 设置字体的名字 中文字体名称用''包裹 */ 
    font-family: 字体名称; 
    /* 引入字体文件的文件路径 */  
    src: url(字体文件格式1的文件路径)，url(字体文件格式2的文件路径);}
  
  
  p{   
    font-family:字体名称;
  }
  ```

- 注意：

  - 一个`@font-face`只能引入一种字体
  - 为了解决不同的浏览器对字体文件的兼容不一样，可以同时引入同一类型字体多种文件格式

#### 字体图标

- 图标是以字体形式在页面中显示，可以使用`css`中字体相关的属性来控制
- 设计师在设计字体时，是以图标的形式来进行设计
- [font awesome官网](https://fontawesome.dashgame.com/)

##### 使用

1. 先下载font awesome字体图标文件
2. 将`css`和`fonts`文件夹放入项目中，这两个文件夹是同一目录下的兄弟关系
3. 在页面中引入css文件，再通过不同的class名使用不同的字体图标

## 行和块分类

HTML目前为止学习的标签，比如

- h1~h6：标题标签独占一行
- div：布局容器，独占一行
- p：段落标签，独占一行
- span：用于存放文本内容，可以同行显示
- img：图片标签，可以同行显示

### 1、分类

- ==块级标签==：一般来说，用块级标签进行页面布局，比如div标签
- ==行内标签==：行内标签一般用于组织文本内容，比如span标签
- ==行内块级标签==：它是一种比较特殊的标签，这种标签依然具有行级标签的特点，但是又具备块的特点

### 2、特点

#### （1）块级标签

- 特点：
  - 独占一行，其他元素会被挤压换行显示
  - 可以设置宽度和高度

#### （2）行内标签

- 特点：
  - 可以同行显示的
  - 不可以设置宽度和高度，宽高由内容撑开的

#### （3）行内块级标签

- 特点：
  - 可以同行显示的
  - 可以设置宽度和高度

### 3、标签的相互转换

通过`display`属性可以进行标签之间的相互转换

- `display:inline;`：转为行内元素
- `display:inline-block;`：转为行内块级元素
- `display:block;`：转为块级元素
- `display:none;`：隐藏元素，元素会从页面中消失

注意：可以将图片转为块级元素，来解决父元素高度超出的问题

### 4、让块级元素同行显示

1. 转为行内块级元素——-`display：inline-block;`
   - 中间有间距，存在兼容性问题
2. 浮动
   - W3C提出的解决元素排列的一种布局方式
   - 在需要同行显示的元素上设置`float:left;`

## 外边距margin

### 1、基本使用

- 用于设置盒子与盒子之间的间距，外边距

- 语法：

  ```css
  margin-top
  margin-left
  margin-right
  margin-bottom
  
  复合属性：
  margin
  一个值：上下左右
  两个值：上下   左右
  三个值：上    左右    下
  四个值：上  右  下  左
  
  例子：margin:10px 20px 30px 40px;
  ```

### 2、使用技巧

#### （1）margin可以设置为负值

#### （2）盒子水平居中

- `margin:0 auto;`：可以让盒子水平居中，设置上下外边距为0，左右为auto，代表自适应，盒子会自动将父盒子剩余的空间均分到盒子的两边
- 注意：垂直方向上的`auto`被禁用，原因在于一般父标签的高度是由内容决定的，高度无法确定的，将垂直方向的禁用。

#### （3）盒子水平垂直居中

- 设置盒子水平居中：`margin:0 auto`

- 设置盒子垂直居中：`margin-top:calc( (父盒子的高度 - 子盒子的高度) / 2 )`

  注意：`calc()`函数可以进行数学运算，运算符号前后必须添加空格

#### （4）margin设置百分比

- margin设置百分比时，无论哪个方向都是**参考的父元素的宽度**。

### 3、margin传递性

- 子标签在设置`margin-top`时，会传递给父标签显示
- 原因：子标签在设置`margin-top`后，会找父元素的边界作为参考，找不到父元素的边界，就会传递给父元素显示。
- 解决方案：
  - 给父元素添加边框border，但会改变盒子大小
  - 给父元素添加内边距padding，但会改变盒子大小
  - 给父元素添加`overflow:hidden;`，会将盒子变成BFC容器，这个容器里面的元素如何排列不会影响容器外面的元素的排列

### 4、margin重叠性

- 相邻两个盒子垂直方向上的margin会发送重叠，以值大的为准，水平方向上的margin是叠加在一起

## 盒模型

### 标准盒模型

目前div+css布局进行页面布局时，布局过程中，是由一个个的盒子构成

![标准盒子模型](C:\StudyRecords\03CSS\notes\01CSS.assets\20140124141001609)

一个盒子由四部分构成：

- `content`：代表内容区域，存放内容的空间，可以是文本或其他的标签
- `padding`：内边距，盒子边框和内容之间的间距，相当于快递盒子中的泡沫
- `border`：代表边框，盒子四周的边框
- `margin`：代表外边距，指的是盒子与盒子之间的间距

### 怪异盒模型

又称为==IE盒模型==，width和height就包含了content+padding+border

![image-20230508141845390](C:\StudyRecords\03CSS\notes\01CSS.assets\20230508141852.png)

目前主流的浏览器默认都是标准盒模型

#### 1、盒模型的相互转化

通过`box-sizing`属性可以切换标准盒模型和怪异盒模型

- `content-box`：标准盒模型
- `border-box`：怪异盒模型

#### 2、怪异盒模型的真正大小

- 宽度=`width`（包含了`content`+`padding`+`border`）
- 高度=`height`（包含了`content`+`padding`+`border`）

注意：给盒子设置`margin`后，它不会改变盒子的大小，只会更改盒子在页面中所占空间的大小

## 边框border

- 设置盒子四周的边框

- 盒子的边框主要研究几部分：

  - 边框的方向（top、bottom、left、right）
  - 边框的宽度
  - 边框的类型
  - 边框的颜色

- 语法：

  ```css
  边框的三要素：
  border-方位-width:宽度;
  border-方位-style:类型;
  border-方位-color:颜色;
  
  复合属性：
  设置一条边框的复合属性
  border-方位: 宽度  类型 颜色；
  
  同时设置四条边框的复合属性
  border:宽度  类型 颜色；
  ```

- 颜色：

  - 颜色单词
  - `#十六进制`
  - rgb(0~255,0~255,0~255)

- 类型：

  - `solid`：实线
  - `dashed`：虚线
  - `dotted`：点线
  - `double`：双实线，双边线

- 注意：

  - 属性至少需要设置两个值：宽度和类型，颜色默认显示为黑色

  - 边框会改变盒子的大小

  - 边框会铺设背景颜色

  - 渲染原理：如果只设置一条边框，显示为矩形形状，但是如果有相邻的边框，相交部分是沿着对角线进行均分

    可以绘制三角形：设置盒子的宽高为0，三条边框设置透明颜色，一条边框设置不透明

    `transparent`：设置透明的颜色

## 浮动

- 浮动常用于页面布局，可以让元素同行显示，浮动布局时开发中用得比较多的一种布局方式

- 语法：

  ```css
  float: left | right | none;
  ```

  - `left`：左浮动
  - `right`：右浮动
  - `none`：默认值，无，不浮动

- 特点

  1. 浮动元素可以同行显示，排列不下时会自动换行显示，不存在兼容性问题
  2. 浮动元素会脱离文档流，显示标准文档流之上
  3. 浮动元素原来的空间不再占用
  4. 行内元素设置浮动后，行内元素可以支持宽度和高度

- 注意：

  - 只有设置的了浮动的元素才可以同行显示
  - 多个元素同时设置浮动时，后面浮动的元素会找到前面浮动元素的边界就停下来或第一个浮动元素找到父元素的边界
  - 块级元素如果没有设置宽度时，默认值为auto，代表自适应，设置浮动后，宽度由内容决定。

### 1、文档流的概念

- 标准文档流：在页面布局过程中，元素默认按住从上到下，从左到右，块级元素独占一行，行级标签共享一行的排列规范进行排列
- 脱离文档流：在页面布局过程中，元素不再遵循标准文档流的排列规范，按照自己的排列规范进行排列

### 2、浮动布局遇到的问题

#### 1、子元素设置浮动后，父元素高度塌陷

一般在开发中经常让父元素高度由内容决定，一旦子元素设置了浮动后，父元素的高度就塌陷了

原因在于：子元素设置浮动后，脱离文档流，原来的空间不再占用，子元素的高度就不会参与父元素高度的计算

- 解决方案：
  - 给父盒子设置高度，不能让父盒子根据内容来自动计算
  - 给父盒子设置`overflow:hidden;`：将盒子变成了一个BFC容器，这个容器里面的元素的排列不会影响外面，而且浮动的子元素会参与父元素高度的计算

#### 2、后面非浮动的元素的文本会被浮动元素挤压显示

早期的浮动不是用来进行页面布局，是用于实现图文混排的效果

- 语法：

  ```html
  <img src="">
  <p>文本</p>
  
  
  <style>   
  img{  
  	float:left;  
  }
  </style>
  ```

### 3、清除浮动

- 清除浮动元素带来的影响

- 语法：

  ```css
  clear: left | right | both;
  ```

  - `left`：清除左浮动带来的影响
  - `right`：清除右浮动带来的影响
  - `both`：同时清除左浮动和右浮动带来的影响

- 清除浮动的方法：

  - 在浮动元素后添加空白的`div`，设置`clear`属性来清除浮动

  - 给父元素添加伪元素选择器`::after`来清除浮动

    ```css
    .clearfix::after{ 
      content: ""; 
      display: block;  
      clear: both;
    }
    ```

## CSS继承

继承的概念更多出现在编程语言中，`JavaScript`就要学习基础继承概念

CSS继承：子元素可以获取到父元素的样式

- 自动继承：子元素不需要任何的操作，可以自动将父标签处获取到的对应样式作用在子元素上

- 手动继承：子元素需要设置对应的代码来从父元素上继承该属性的值

  `css属性名:inherit`：inherit代表从父元素上继承该属性的值

### 1、可以被子元素自动继承的CSS属性

- 文本样式默认是可以被自动继承

  - color
  - text-align
  - line-height
  - text-decoration
  - letter-spacing
  - worde-spacing
  - text-indent
  - text-transform

- font系列的字体样式是可以被自动继承

  - font-size
  - font-family
  - font-weight
  - font-style

- list-style属性：li标签可以从ul或ol标签上自动继承

- 鼠标样式：cursor 可以从父元素上自动继承

  `cursor: pointer;`：抓手

### 2、不可以被子元素自动继承的属性

- width、height、border、background、padding、margin等

## 表格标签及样式

### 1、表格的标签

- 用于在页面中绘制表格

- 语法:

  - `<table></table>`：代表一个表格，一个table就代表一个表格
  - `<tr></tr>`：代表行，一个tr就代表一行，不可以设置宽度，但是可以设置高度，会影响整行的高度
  - `<td></td>`：代表列，单元格，一个td就代表一个单元格，设置宽度会影响整列的宽度，设置高度会影响整行的高度
  - `<th></th>`：代表表头，内容会加粗并水平居中显示
  - `<thead></thead>`：代表表格的头部
  - `<tbody></tbody>`：代表表格的内容区域
  - `<tfoot></tfoot>`：代表表格的尾部

  ```html
  <!-- 绘制一个3行4列表格 --><!-- 代表表格 -->
  <table>  
    <!-- 代表表格的头部 -->   
    <thead>    
      <tr class="tr1">    
        <th class="td1">姓名12</th>     
        <td>年龄</td>    
        <td>性别</td>          
        <td>爱好</td>    
      </tr>  
    </thead> 
    <!-- 代表表格内容区域 -->  
    <tbody>    
      <tr>      
        <td>张三</td>     
        <td>18</td>       
        <td>男</td>       
        <td>女</td>      
      </tr>  
      <tr>       
        <td>李四</td>     
        <td>18</td>          
        <td>男</td>        
        <td>男</td>   
      </tr>  
    </tbody>
    <!-- 代表表格的尾部 --> 
    <tfoot>  
      <tr>     
        <td></td>      
        <td></td>         
        <td></td>        
        <td></td>  
    </tr>   
    </tfoot></table>
  ```

### 2、表格标签的属性（了解）

- 设置table标签的属性
- `cellpacing`：设置单元格之间的间距（不推荐使用，可以使用border-spacing解决）
- `cellpadding`：设置单元格内容和边框的间距（不推荐使用，使用padding解决）

### 3、表格标签的css样式

- `border-spacing`：设置单元格之间的间距
- `border-collapse:collapse;`：将表格边框合并为一条

### 4、单元格合并

- `rowspan`：跨行合并，垂直方向上合并单元格
- `colspan`：跨列合并，水平方向上合并单元格

注意：是单元格标签上的属性，不管跨行还是跨列，合并几个单元格，对应属性值就写几。

### 5、单元格样式（了解）

- 设置单元格中文本水平方向的对齐方式：`text-align`
- 设置单元格中文本垂直方向的对齐方式：`vertical-align`
  - `middle`：默认值，居中对齐
  - `top`：顶部对齐
  - `bottom`：底部对齐

## 表单标签

- 表单元素主要用于进行前后端数据交互

### 1、表单组件

#### （1）普通输入框

- 语法：

  ```html
  <input type="text"   placeholder="设置文本框中提示性的信息"  value="设置文本框中的默认值">
  ```

#### （2）密码框

- 密码框中的内容是不可见的

- 语法：

  ```html
  <input type="password"   placeholder="设置文本框中提示性的信息"  value="设置文本框中的默认值">
  ```

#### （3）下拉列表

- 语法：

  ```html
  <select name="" id="">  
    <option value="">身份证</option>
    <option value="">学生证</option> 
    <option value="">结婚证</option>
  </select>
  ```

- 注意：

  - 一个选项就是一个option标签
  - 下拉列表中默认选中第一个选项，可以在`option`标签上添加`selected`属性控制默认选中
  - 下拉列表默认只能选择一个选项，可以在`select`标签上添加`multiple`属性控制多选

#### （4）单选框

- 语法：

  ```html
  <input type="radio" name="gender">男
  <input type="radio" name="gender">女
  ```

- 注意：

  - 单选需要设置相同的name值进行绑定，才可以实现单选的功能

#### （5）多选框

- 语法：

  ```html
   <input type="checkbox">
  ```

- 注意：

  - 单选框和多选框上设置`checked`属性控制默认选中

#### （6）文本域

- 语法：

  ```html
  <textarea  rows="控制显示的行数"  cols="设置一行显示的字符个数"></textarea>
  ```

- 注意：rows和cols变相控制了文本域的大小，一般使用css的样式来控制宽度和高度

#### （7）按钮

- 语法：

  ```html
  input:
  <input type="button" value="普通按钮">
  <input type="reset" value="重置按钮">
  <input type="submit" value="提交按钮">
  
  button:
  <button>按钮</button>
  <button type="button">普通按钮</button>
  <button type="reset">重置按钮</button>
  <button type="submit">提交按钮</button>
  ```

- 注意：

  - 提交和重置按钮需要配合form标签一起使用
  - 推荐使用button

#### （8）文件上传—-H5

- 语法：

  ```html
   <input type="file">
  ```

- 注意：默认只能上传一个文件，可以在标签上添加`multiple`属性实现上传多个文件

#### （9）H5新增表单元素

- HTML5.0提出，不同的浏览器的显示效果是一样的，不同的浏览器的兼容性不一样

- 语法：

  ```html
  1. 数字输入框：只能输入数字
  <input type="number">
  
  2. 网址输入框：可以提供在提交数据时验证网址
  <input type="url">
  
  3. 邮箱输入框：可以提供邮箱的验证，以后通过js进行验证
  <input type="email">
  
  4. 时间控件 
  <!-- 年/月/日 -->
  <input type="date">
  <!-- 年/月 -->
  <input type="month">
  <!-- 某年第几周 -->
  <input type="week">
  <!-- 时间 -->
  <input type="time">
  ```

### 2、label标签

- 语法：

  ```html
  <label for="">文本</label>
  
  例子：
  性别：
  <input type="radio" name="gender" id="man"> <label for="man">男</label>
  <input type="radio" name="gender" id="woman"><label for="woman">女 </label>
  ```

  - `label`是可以同行显示的，是一个行内元素

- 注意：`label`的特殊用法

  - `label`标签通过标签上的`for`属性指定表单元素的`id`名，可以实现点击`label`中的内容控制对应的表单元素获取焦点

## CSS定位

### 1、静态定位

- 所有的元素==默认==都是静态定位，元素在标准文档流中

- 语法:

  ```css
  position:static;
  ```

### 2、固定定位

- 可以让元素固定在页面上，不会随着滚动条滚动

- 语法：

  ```css
  position:fixed;
  ```

- 设置偏移量（移动量）：

  - `top`：距离参考位置上边缘的间距
  - `bottom`：距离参考位置下边缘的间距
  - `left`：距离参考位置左边缘的间距
  - `right`：距离参考位置右边缘的间距

- 特点：

  - 固定定位的元素会脱离文档流，固定在页面上，不会随着滚动条滚动
  - 原来的空间不再占用
  - 如果只设置固定定位，元素会在当前位置脱离文档流，一旦设置偏移量，元素会参考整个显示区域（视口）进行移动

## 弹性盒模型

#### 传统布局

- 基于盒模型，通过`display`+`float`+`position`进行页面布局
- 这种方式布局兼容性比较好，但是布局过程比较繁琐
- 不方便：
  - 盒子同行显示设置浮动——清除浮动
  - 盒子之间的间距需要自己计算
  - 各种对齐的问题

#### 弹性布局（弹性盒模型）

- CSS3提出了一种自适应的布局模式——弹性布局，它用来替代或辅助传统布局

### 1、弹性盒模型

#### 1、基本概念

- 概念：是一种当页面需要使用不同的屏幕大小确保元素拥有恰当行为的布局方式
- 目的：提供了一种布局模式，这种布局模式可以实现元素同行显示，可以自动分配剩余空间，以及实现对齐

#### 2、基本结构

![image-20230515105910320](C:\StudyRecords\03CSS\notes\01CSS.assets\20230515105910.png)

弹性盒模型是由弹性容器和弹性项目构成

- ==弹性容器==：包含弹性项目的父元素
- ==弹性项目==：弹性容器中的每个子元素
- ==主轴==：弹性项目同行显示的方向就是主轴的方向
- ==侧轴==：与主轴垂直的方向

### 2、设置在父元素（弹性容器）上的属性

#### 1、display:flex | inline-flex

- 将元素设置为弹性容器，它里面的子元素会以弹性项目的形式显示
- `display:flex`：设置块级的弹性容器，对于其他的兄弟的元素来说，它是一个普通的块级标签，对于子元素来说，它就是一个弹性容器。
- `display:inline-flex`：设置行级的弹性容器，对于其他的兄弟的元素来说，它是一个普通的行级标签，对于子元素来说，它就是一个弹性容器。

弹性容器的==特点==

- 弹性容器里面的弹性项目可以同行显示，排列不下时会按照比例压缩显示
- 弹性容器如果没有设置高度时，高度可以自适应的
- 对于兄弟标签来说，没有影响
- 弹性容器只对直接子元素有影响

#### 2、flex-wrap

- 设置弹性项目是否同行显示，默认不换行

- 语法：

  ```css
  flex-wrap: nowrap | wrap；
  ```

  - `nowrap`：默认值，不换行
  - `wrap`：换行

#### 3、flex-direction

- 设置主轴的方向和弹性项目的排列方式
- 属性值：
  - `row`：默认值，将水平方向设置为主轴方向，弹性项目是从左到右依次排列
  - `row-reverse`：将水平方向设置为主轴方向，弹性项目是从右到左依次排列
  - `column`：将垂直方向设置为主轴，弹性项目从上到下依次排列
  - `column-reverse`：将垂直方向设置为主轴，弹性项目从下到上依次排列

#### 4、justify-content

- 设置主轴上富裕空间的分配
- 取值：
  - `flex-start`：默认值，将主轴上的富裕空间放在弹性项目之后
  - `flex-end`：将主轴上的富裕空间放在弹性项目之前
  - `center`：将弹性项目在主轴上居中
  - `space-between`：首尾弹性项目紧靠弹性容器，中间均分
  - `space-around`：将富裕空间均分到每个弹性项目两边
  - `space-evenly`：每个弹性项目之间的间距均分，包含首尾与弹性容器之间的间距

#### 5、align-items

- 设置弹性容器中所有的弹性项目在侧轴上的富裕空间的分配
- 取值:
  - `flex-start`：当弹性项目设置高度时的默认值，将侧轴上的富裕空间均分到每行弹性项目之后
  - `flex-end`:将侧轴上的富裕空间均分到每行弹性项目之前
  - `center`：居中，每行弹性项目上下均分，弹性项目在每行侧轴上居中
  - `stretch`：当弹性项目不设置高度时的默认值，弹性项目会在侧轴上拉伸撑满弹性容器

### 3、设置在子元素（弹性项目）上的属性

#### 1、align-self

- 设置当前弹性项目在侧轴上的富裕空间的分配
- 取值:
  - `flex-start`：当弹性项目设置高度时的默认值，将侧轴上的富裕空间均分到每行弹性项目之后
  - `flex-end`:将侧轴上的富裕空间均分到每行弹性项目之前
  - `center`：居中，每行弹性项目上下均分，弹性项目在每行侧轴上居中
  - `stretch`：当弹性项目不设置高度时的默认值，弹性项目会在侧轴上拉伸撑满弹性容器

#### 2、flex-shrink

- 设置弹性项目的压缩因子、压缩比例

- 原理：当弹性容器宽度不够时，为了保证弹性项目在一行显示并且不换行，`flex-shrink`可以用来控制弹性项目压缩的比例。

- 语法：

  ```css
  flex-shrink: 数字；
  ```

  - 默认值为1，数字越大，压缩的空间越大，盒子的大小越小

- 计算公式：

  > 总压缩空间 = 弹性项目的总宽度 - 弹性容器的宽度
  >
  > 弹性项目压缩的空间 = 总压缩空间 / 压缩因子总数 * 弹性项目的压缩因子
  >
  > 盒子的大小= 原来的大小 - 弹性项目的压缩的空间

#### 3、flex-grow

- 设置弹性项目的弹性因子

- 作用：可以让弹性项目占满弹性容器主轴方向，让弹性项目消化掉主轴上富裕的空间

- 语法：

  ```css
  flex-grow: 数字;
  ```

  - 默认值为0，数字越大，消化的富裕空间越多，盒子的大小越大

- 计算公式：

  > 富裕空间= 弹性容器的宽度 - 弹性项目的总宽度
  >
  > 弹性项目弹性空间 = 富裕空间/弹性因子总数 * 弹性项目的弹性因子
  >
  > 盒子的大小 = 原来的大小 + 弹性项目弹性空间

  弹性空间：指的是每个弹性项目消化掉主轴上的富裕空间

#### 4、order

- 设置弹性项目的显示顺序

- 语法：

  ```css
  order:数字；
  ```

  - 默认值为0，数字越大，元素显示顺序越靠后，数字相同时，按住html代码顺序依次显示

#### 5、flex-basis

- 设置弹性项目的默认宽度

- 语法：

  ```css
  flex-basis: 500px;
  ```

- 注意：优先级：`flex-basis` > `width`

#### 6、flex

- 复合属性，是`flex-grow`、`flex-shrink`、`flex-basis`的复合属性

- 语法：

  ```css
  flex: flex-grow  flex-shrink  flex-basis;
  ```

  - 默认值：`flex: 0 1 auto;`

### 4、富裕空间

- 概念：指的是弹性容器中除了弹性项目之外剩余的空间，就是富裕空间
- 主要分为
  - 主轴上的富裕空间：`justify-content`
  - 侧轴上的富裕空间：`align-items`和`align-self`

## CSS3新特性

### 1、结构选择器

- 可以根据HTML代码结构找到页面满足条件的标签来作用css样式代码，也是伪类选择器中的一种

#### （1）:first-child

- 找到某个标签的第一个子标签

- 语法：

  ```css
  找到class名为box里面的所有a标签，并且这个a标签是某个标签的第一个子标签
  .box a:first-child{
    
  }
  ```

#### （2）:last-child

- 找到某个标签的最后一个子标签

- 语法：

  ```css
  找到class名为box里面的所有a标签，并且这个a标签是某个标签的最后一个子标签.box a:last-child{}
  ```

#### （3）:nth-child(n)

- 找到某个标签的第n个子标签

- 语法：

  ```css
  找到class名为box里面的所有a标签，并且这个a标签是某个标签的第2个子标签
  .box a:nth-child(2){
    
  }
  ```

- 注意：

  - 找到偶数的子标签：`:nth-child(2n)`
  - 找到奇数的子标签：`:nth-child(2n-1)`或`:nth-child(2n+1)`

#### （4）:nth-last-child(n)

- 找到某个标签的倒数第n个子标签

- 语法：

  ```css
  找到class名为box里面的所有a标签，并且这个a标签是某个标签的倒数第2个子标签
  .box a:nth-last-child(2){
    
  }
  ```

#### （5）:nth-of-type(n)

- 找到满足条件的同类型的标签，将其筛选出来，重新排序，找到其中的第n个标签

- 语法：

  ```css
  找到class名为box里面的所有a标签，将其在兄弟标签中进行重新排序，找到其中的第n个标签
  .box a:nth-of-type(2){
    
  }
  ```

#### （6）:nth-last-of-type(n)

- 找到满足条件的同类型的标签，将其筛选出来，重新排序，找到其中的倒数第n个标签

- 语法：

  ```css
  找到class名为box里面的所有a标签，将其在兄弟标签中进行重新排序，找到其中的倒数第n个标签
  .box a:nth-last-of-type(2){
    
  }
  ```

### 2、圆角

- 盒子默认四个角都是直角，使用`border-radius`来设置圆角

- 语法：

  ```css
  分别设置四个角的圆角
  border-top-left-radius
  border-top-right-radius
  border-bottom-right-radius
  border-bottom-left-radius
  
  复合属性：
  border-radius
  一个值：左上右上右下左下
  两个值：左上右下    右上左下
  三个值：左上  右上左下  右下
  四个值：左上  右上  右下  左下
  八个值：/前面代表每个角的水平半径，/后面代表每个角的垂直半径
  border-radius: 30px 30px 30px 30px /30px 30px 30px 60px ;
  ```

- 圆角的形成：椭圆是由水平半径和垂直半径构成。圆角是由一个椭圆或一个正圆的圆弧构成的

  ![image-20230516113727266](C:\StudyRecords\03CSS\notes\01CSS.assets\20230516113727.png)

  注意：水平半径和垂直半径相等，取得是正圆的圆弧，如果不相等，取得是椭圆的圆弧

  ![image-20230516113851868](C:\StudyRecords\03CSS\notes\01CSS.assets\20230516113851.png)

- 圆角的应用：

  - 绘制正圆：盒子宽高相同，设置`border-radius:50%;`
  - 绘制胶囊状：设置`border-radius:最短边的大小的一半;`

#### （1）内半径和外半径（了解）

- 当盒子的边框足够宽时，设置`border-radius`的值小于或等于边框的宽度时，边框内边缘是直角，外边缘是圆角
- 当盒子的边框足够宽时，设置`border-radius`的值大于边框的宽度时，边框的内边缘和外边缘都是圆角
- 外半径=border-radius的值
- 内半径=border-radius - 边框的宽度
- 注意：
  - 当盒子的边框足够宽时，设置`border-radius`的值小于或等于边框的宽度时，内半径为负或为0，边框内边缘显示为直角
  - 当盒子的边框足够宽时，设置`border-radius`的值大于边框的宽度时，内半径为正数，边框的内边缘和外边缘都是圆角

### 3、盒子阴影

- `box-shadow`来设置盒子的阴影

- 语法：

  ```css
  box-shadow:  x轴移动量  y轴移动量 模糊程度  阴影大小  颜色 ; 
  
  /* inset 将外阴影变为内阴影 */
  box-shadow: x轴移动量  y轴移动量 模糊程度  阴影大小  颜色 inset;
  
  /*可以设置多层阴影，中间使用逗号隔开*/
  box-shadow:  x轴移动量  y轴移动量 模糊程度  阴影大小  颜色,  x轴移动量  y轴移动量 模糊程度  阴影大小  颜色 ;
  ```

### 4、文字阴影（了解）

- 通过`text-shadow`来设置文字的阴影

- 语法：

  ```css
  text-shadow: x轴移动量  y轴移动量 模糊程度 颜色;
  ```

### 5、渐变背景

渐变背景可以看作是一个“图像”，使用`background-image`来进行设置

#### （1）线性渐变

- 概念：沿着一条直线进行渐变效果

- 语法：

  ```css
  background-image: linear-gradient(渐变方向 , 颜色1 位置1, 颜色2  位置2， 颜色3 位置3);
  ```

##### 色标

- 是由一个颜色和一个位置构成，用来控制渐变过渡的范围

- 位置可以是百分比或像素

- 注意：

  - 色标不设置位置时，默认是均匀渐变

  - 首尾的色标不设置位置时，默认在0%或100%

  - 如果首尾的色标不在0%或100%时，默认是以纯色填充

    ```css
    /*0%~10%是red，10%~40%是red到green的渐变，40%~60%是green到yellow的渐变，60%~100%是yellow*/
    background-image:linear-gradient( red 10%, green  40%,yellow  60%)
    ```

  - 如果有两个相邻的色标的位置是一样的，会出现断层的效果，因为渐变范围为0.

##### 渐变方向

- to 结束方向

  - to bottom
  - to top
  - to right
  - to left
  - to bottom right
  - to bottom left
  - to top left
  - to top right

- 角度：是以deg为单位，0deg是垂直向上，顺时针是正方向，逆时针是负方向

  ![image-20230516143211739](C:\StudyRecords\03CSS\notes\01CSS.assets\20230516143211.png)

#### （2）径向渐变

- 概念：沿着椭圆的半径方向进行渐变

- 语法：

  ```css
  background-image: radial-gradient( 大小   形状  at  x轴 y轴, 颜色1  位置1, 颜色2  位置2,颜色3  位置3)
  ```

##### 圆心

- at x轴 y轴：默认在盒子的中心点，默认值为center center
  - 方位单词：top bottom left right center 两两搭配使用
  - 像素：0px 0px相当于盒子的左上角
  - 百分比：参考的是盒子的宽度和高度，50% 50% 相当于center center

##### 形状

- `ellipse`：默认值，椭圆
- `circle`:正圆

##### 大小

- `farthest-corner`：默认值，半径从圆心到最远的角
- `closest-corner`：半径从圆心到最近的角
- `farthest-side`：半径从圆心到最远的边
- `closest-corner`：半径从圆心到最近的边

#### （3）重复渐变

- 线性渐变和径向渐变都可以设置重复渐变

- 语法：

  ```css
  重复线性渐变
  background-image: repeating-linear-gradient(渐变方向 , 颜色1 位置1, 颜色2  位置2， 颜色3 位置3);
  
  重复径向渐变
  background-image: repeating-radial-gradient( 大小   形状  at  x轴 y轴, 颜色1  位置1, 颜色2  位置2,颜色3  位置3);
  ```

- 注意：设置多层渐变背景或图片时，中间使用逗号隔开，前面的效果会盖住后面的效果

## CSS过渡

- 过渡可以在更改css样式时控制动画的执行和执行速率等等，让动画不会立即执行

### 1、基本属性

- ```css
  transition-property
  ```

  ：设置过渡的CSS属性名，需要配合执行时长一起使用，默认值为all，代表所有css属性名，

  - 可以同时设置多个css属性名进行过渡，中间使用逗号隔开

- ```css
  transition-duration
  ```

  ：设置过渡的执行时长，默认值是0s，时间的单位：s(秒)、ms（毫秒） 1s=1000ms

  - 如果设置过渡的css属性名的个数多于时间的个数，属性名和时长是一一对应，时间重复

- `transition-delay`：设置过渡的延迟时长，默认值为0s

- `transition-timing-function`：设置过渡的执行速率

  - `ease`：默认值，以低速开始，变快，以低速结束
  - `linear`：匀速
  - `ease-in`：以低速开始
  - `ease-out`：以低速结束
  - `ease-in-out`：以低速开始或结束
  - `cubic-bezier(x1,y1,x2,y2)`：贝塞尔曲线

- `transition`：复合属性

  - 语法：

    ```css
    transition: CSS属性名  执行时长  延迟时长   执行速率;
    
    多个css属性名同时设置过渡时，中间使用逗号隔开
    transition: CSS属性名1  执行时长  延迟时长   执行速率，
    CSS属性名2  执行时长  延迟时长   执行速率，
    CSS属性名3  执行时长  延迟时长   执行速率;
    ```

注意：transition并不是针对所有的css属性都有效，比如`display`。

### 2、贝塞尔曲线

- 用于构建速率的二维曲线，本质上就是一个数学曲线

- 语法：

  ```css
  cubic-bezier(x1,y1,x2,y2)
  ```

  - 这两个坐标决定了曲线的形状，不同的形状代表的速率是不同的，可以为负数

- 构建贝塞尔曲线网址：https://cubic-bezier.com/

## 2D转换

### 一、2D转换

CSS3提出可以控制元素的变化，通过`transform`属性来设置

- 2D 转换的效果不会影响页面中其他元素的布局
- 一般会配合过渡transition一起使用

#### 1、缩放

- 让元素放大或缩小

- 语法：

  ```css
  transform:scale(宽度的倍数,高度的倍数);
  
  等比例缩放
  transform:scale(倍数);
  ```

  - `0`：元素为原来的0倍，元素会从页面中消失
  - `0~1`：元素缩小
  - `1`：盒子原来的大小不变
  - `1以上`：元素放大

- 注意：盒子进行缩放时是参考盒子的中心点进行缩放

#### 2、位移

- 让元素进行移动

- 语法：

  ```css
  沿着x轴进行移动
  transform:translateX(移动量);
  
  沿着y轴进行移动
  transform:translateY(移动量);
  
  transform: translate(x轴移动量 , y轴移动量); 
  transform: translate(x轴移动量);
  ```

#### 3、旋转

- 让元素进行旋转

- 语法：

  ```css
  围绕着盒子中心点进行旋转
  transform: rotate(角度);
  
  围绕着x轴进行旋转
  transform: rotateX(角度);
  
  围绕着y轴进行旋转
  transform: rotateY(角度);
  ```

  - `rotate(角度)`:围绕着盒子中心点进行旋转，设置正值是顺时针旋转，设置负值时逆时针旋转

- 注意：盒子进行旋转时，中心点的位置不变的

#### 4、倾斜（了解）

- 让元素沿着x轴或y轴倾斜

- 语法:

  ```css
  沿着x轴进行倾斜
  transform: skew(角度)
  transform: skewX(角度)
  
  沿着y轴进行倾斜
  transform: skewY(角度)
  ```

### 二、转换基点

- 基点：进行css 2d转换时的参考点

- 盒子进行转换时默认的基点是盒子的中心点，默认在`center` `center`

- 语法：

  ```css
  transform-origin:x轴  y轴;
  ```

  - 单词： `left` `right` `top` `bottom` `center` 两两搭配使用
  - 像素：0px 0px就是盒子的左上角

- 注意：如果盒子需要设置转换基点时，需要设置在盒子的样式未更改时的位置

### 三、组合变换

- 多个2D转换同时设置在同一标签上时，组合在一起使用，中间使用`空格`隔开

- 语法：

  ```css
   transform: scale(0.5)   translateY(-500px)  rotate(90deg);
  ```

- 注意：旋转会改变坐标轴的方向

## Animation动画

### 1、完成自动播放的动画

- 可以自动播放动画的标签，比如marquee标签
- 可以使用flash技术完成动画的设计
- CSS3提出Animation动画可以实现自动播放的动画
- js也可以实现

### 2、什么是动画？

- 概念：快速切换连续的图片而达到的流畅的画面，即动画。
- 帧数：一秒钟切换的图片的数量。数量越多，画面越流畅。60hz（每秒60帧）

### 3、关键帧

- 概念：指的盒子状态将发生改变的帧，就是设置动画的步骤，将一个完整的动画拆分为多个步骤，每一个步骤就是第一个关键帧，将所有的步骤整合在一起，就是完整的动画
- 例子：盒子向右移动500px，关键帧有2个，开始状态和结束状态
- 例子：盒子变成圆后，向右移动500px，关键帧有3个，开始状态——变圆——右移500px

## 二、Animation的基本使用

### 1、定义关键帧

- 利用`@keyframe`来定义关键帧

- 这个定义关键帧属于css代码，不需要写在任何选择器中

- 语法：

  ```css
  定义关键帧@keyframes 动画名称{ 
    from {   
      /* 开始状态 */  
    }  
    to {    
      /* 结束状态  */   
    }
  }
  
  还可以使用百分比来定义关键帧
  @keyframes 动画名称{ 
    0%{  
    }  
    20%{ 
    }   
    50%{ 
    }  
    100%{   
    }
  }
  
  
  使用动画选择器{  
    /* 设置动画的名称 */ 
    animation-name: 动画名称; 
    /* 设置动画的执行时长 */   
    animation-duration: 执行时长;
  }
  ```

  - form和to等价于0%和100%；
  - 每一帧的执行时长跟两帧之间的百分比有关，跨度越大，分配的时间越大
  - 计算公式：分配的时间=两帧之间的百分比之差 * 动画总时间

### 2、动画属性

- CSS3中提供很多的动画的属性来控制动画的执行，比如：执行速率、执行次数等等

- 属性：

  - `animation-name`：设置动画名称，需要配合动画执行时长一起使用

  - `animation-duration`：设置动画的执行时长，默认值为0s

  - `animation-delay`：设置动画的延迟时长，默认值为0s

  - `animation-timing-function`：设置动画的执行速率

    - `ease`：默认值，以低速开始，变快，以低速结束
    - `linear`：匀速
    - `ease-in`：以低速开始
    - `ease-out`：以低速结束
    - `ease-in-out`：以低速开始或结束
    - `cubic-bezier(x1,y1,x2,y2)`：贝塞尔曲线

  - `animation-iteration-count`：设置动画的执行次数

    - `n`：数字代表次数，执行几次就写几
    - `infinite`：代表无限次

  - `animation-direction`：设置动画的执行方向

    - `normal`：默认值，正向播放动画

       `reverse`：反向播放动画

       `alternate`：奇数次正向播放动画，偶数次反向播放动画

       `alternate-reverse`：奇数次反向播放动画，偶数次正向播放动画

  - `animation-fill-mode`：设置第一帧或者最后一帧是否作用在元素上，设置是否保存开始或结束状态

    - `backwards`：将第一帧作用在元素上，保持开始状态
    - `forwards`：将最后一帧作用在元素上，保持结束状态
    - `both`：同时将第一帧和最后一帧作用在元素上，保持开始和结束状态

  - `animation-play-state`：设置动画的播放状态

    - `running`：默认值，播放
    - `paused`：暂停

  - `animation`：复合属性

    ```css
    animation: name duration timing-function delay iteration-count direction fill-mode;
    animation:动画名称  执行时长  执行速率  延迟时长  执行次数   执行方向  是否保持开始或结束状态
    ```

## SASS

### 1、基本概念

- less和sass是一个CSS预处理器，可以减少css代码重复编写，节省开发时间，加快开发效率
  - CSS预处理器是一种脚本语言，可以扩展css语法并编译成常规的css代码，以便浏览器可以正常渲染
  - SASS是对css的扩展，可以提供嵌套、变量等等语法来提供css代码的开发效率
- less和sass都是css预处理，但是less更新得太慢
- [SASS官网](https://www.sass.hk/)

### 2、基本使用

#### （1）使用vs code中`easy sass`插件

1. 利用`easy sass`插件来编写sass代码
   - 安装`easy sass`插件
   - 新建以`.scss`为后缀名的文件，在里面可以编写sass代码
   - 保存文件时，`easy sass`会自动将sass代码编译为css文件，在页面中引入css文件即可

#### （2）手动更改自动保存的css文件的文件路径

注意：路径从工作区出发，工作区必须有名字

![image-20230510165846194](C:\StudyRecords\03CSS\notes\01CSS.assets\20230510165853.png)

### 3、嵌套

- SASS支持父选择器里面嵌套子选择器

- 好处：让css代码层级结构更加清晰，减少了重复的选择器的书写，不会出现父子标签的权重的问题

- 语法：

  ```css
  父选择器{ 
    css代码  
    子选择器{      
      css代码   
    }
  }
  
  sass代码：
  .header {   
    width: 100%; 
    height: 140px;   
    background-color: pink; 
    .header-top {      
      width: 1160px;    
      height: 100px;     
      background-color: tomato; 
    }  
    .header-bottom {  
      width: 1160px;      
      height: 40px;       
      background-color: yellowgreen; 
      ul {        
        margin: 0;    
        padding: 0;          
        list-style: none;      
        >li {             
          width: 100px;         
          height: 40px;         
          // &代表父选择器         
          &:hover{            
            color: red;       
          }         
        }     
      }       
      &::after{   
        content: "";    
      }    
      +div{     
        width: 100px;    
      }  
    }
  }
  
  编译后的css代码：
  .header {  
    width: 100%;   
    height: 140px;   
    background-color: pink;
  }
  .header .header-top {  
    width: 1160px;   
    height: 100px;   
    background-color: tomato;
  }
  .header .header-bottom {  
    width: 1160px;   
    height: 40px;   
    background-color: yellowgreen;
  }
  .header .header-bottom ul {   
    margin: 0;   
    padding: 0;   
    list-style: none;
  }
  .header .header-bottom ul > li {
    width: 100px;   
    height: 40px;
  }
  .header .header-bottom ul > li:hover { 
    color: red;
  }
  .header .header-bottom::after { 
    content: "";
  }
  .header .header-bottom + div { 
    width: 100px;
  }
  ```

### 4、变量

- 概念：变量可以看作一个保存数据的容器，可以在代码中重复使用

- 用途：可以达到一处改处处改的效果

- 语法：

  ```css
  1. 定义变量$变量名:数据;
  2. 使用变量css属性名: $变量名;
  ```

  - 变量名的命名规范可以参考id的命名规范
  - 数据可以是任意的css属性的属性值，比如100px，red，还可以是复合属性的属性值，比如`1px solid red`

- 注意：变量需要先在页面开头定义，再使用变量

### 5、数学运算

- sass支持数学运算

- css中如果需要进行运算，使用`calc()`函数来进行运算

- 语法：

  ```css
  .box1{   
    width: 100px - 50px;  
    height: 100px +10px;
  }
  ```

- 注意：`%`和`px`不能混合使用

### 6、导入sass文件

- 可以在一个sass文件中导入另外一个sass文件

- 可以将移入的sass文件和当前的sass文件合并编译为一个css文件

- 语法:

  ```css
  @import "sass文件的文件路径"
  ```

## end
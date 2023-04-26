==所有的HTML标签默认是没有样式，浏览器默认添加的样式==

### 1、文本标签

- 用于存放页面中文本

#### （1）标题标签 h1~h6

- 语法：

  ```html
  <h1>h1标签</h1>
  <h2>h2标签</h2>
  <h3>h3标签</h3>
  <h4>h4标签</h4>
  <h5>h5标签</h5>
  <h6>h6标签</h6>
  ```

- 注意：

  - 内容默认会加粗，数字越大，字号越小
  - 默认独占一行
  - 默认标签上下有外边距margin
  - 好处：便于搜索引擎收录，有利于SEO优化

#### （2）段落标签 p

- 语法：

  ```html
  <p>内容</p>
  ```

- 注意：

  - 一个段落就是一个p标签
  - 独占一行，默认上下有外边距margin
  - p标签里面不能嵌套p标签

#### （3）span标签

- 一般用于简单的文本或提示性信息

- 语法：

  ```html
  <span>内容</span>
  ```

- 注意：可以在一行显示

#### （4）label标签

- 一般配合表单元素一起使用

- 语法：

  ```html
  <label>内容</label>
  ```

- 注意：可以同行显示

#### （5）b/strong标签

- 用于文本加粗处理

- 语法：

  ```html
  <b>内容</b>
  <strong>内容</strong>
  ```

- 注意：可以同行显示，推荐使用strong标签

#### （6）em/i标签

- 用于对文本做斜体处理

- 语法：

  ```html
  <em>内容</em>
  <i>内容</i>
  ```

- 注意：em和i标签都可以同行显示

#### （7）br标签

- 换行标签，一个br换一行，单标签

- 语法：

  ```html
  <br>或<br/>
  ```

#### （8）hr标签

- 分割线标签，单标签

- 语法：

  ```html
  <hr>或<hr/>
  ```

### 2、图片标签 img

- 可以在网页中引入图片

- 语法：

  ```html
  <img src="连接需要引入的图片的文件路径"  alt="图片加载失败时显示的信息"  title="鼠标移入时显示的信息"  width="设置图片的宽度"  height="设置图片的高度">
  ```

- 路径：找到目标文件的具体位置

  - 绝对路径：是指目标文件在目录下的具体位置

    在开发中，一般是指以http或https开头的网络路径或磁盘盘符路径

  - 相对路径：是指以某个文件出发找到目标文件的具体位置

    在开发中，一般是从当前的文件出发找到目标文件的具体位置

    ./ 代表当前文件的目录 ../ 代表返回上一级目录

    返回多个上一级就使用多个../

- 注意：

  - `title`可以在其他标签上使用
  - 在设置图片的宽度和高度时，如果只设置其中的一个值，图片等比例缩放，如果宽度和高度同时设置，图片可能被拉伸变形。

### 3、超链接标签 a

- 用于网页中进行页面跳转

- 语法：

  ```html
  <a href="连接需要跳转的网页的文件路径" target="设置网页的打开方式">内容</a>
  ```

  - `href`：连接需要跳转的网页的文件路径，可以是以http或htttps开头的网络路径，也可以是本地路径（建议使用相对路径）
  - `target`：设置网页的打开方式
    - `_self`：默认值，当前窗口打开网页
    - `_blank`：新开窗口打开网页

注意：

- `href=""`或`href="#"`：刷新页面
- `href="#id名"`：锚点，可以跳转到页面的指定位置
  - id是每个标签都有的属性，id是唯一，同一个网页中同名的id只能出现一次
  - id命名方式：
    - 是由字母、数字、_或-构成
    - 不能以数字开头，不能包含其他的特殊符号

### 4、表格标签

- 用于在网页中绘制表格

- 语法：

  ```html
  创建一个2行3列表格
  <table>
    <tr>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </table>
  ```

- `table`:代表表格，一个table就是一个表格

  - `border`：设置表格的边框
  - `width`：设置表格的宽度
  - `height`：设置表格的高度
  - `align`：设置表格的对齐方式 left 默认值，左对齐 center 居中 right 右对齐
  - `bgcolor`:设置表格的背景颜色，颜色单词，#十六进制
  - `cellspacing`:设置表格单元格与单元格之间的间距
  - `cellpadding`：设置单元格内容与边框的之间的间距

- `tr`：代表行，一个tr代表一行

  - `height`：设置整行的高度
  - `align`：设置整行单元格中内容的对齐方式
  - `bgcolor`:设置整行的背景颜色

- `td`：代表列，单元格，一个td就是一个单元格

  - `width`：设置单元格的宽度，会影响整列的宽度
  - `height`：设置单元格的高度，会影响整行的高度
  - `align`：设置当前单元格内容的对齐方式
  - `bgcolor`：设置当前单元格的背景颜色

- `th`：代表表头，单元格中的内容会加粗并居中显示

注意：

- align设置table上，控制整个表格的对齐方式，设置`tr`或td或`th`时，控制单元格中内容的对齐方式
- `bgcolor`在设置时，优先级：`td`>`tr`>`table`
- table里面只能放`tr`，`tr`里面只能放`th`或`td`
- 表格是可以进行嵌套，不能破坏外层表格的结构。内层表格放在外层表格的单元格td中

#### 单元格合并（重点）

- `rowspan`：跨行合并单元格，垂直方向上合并单元格
- `colspan`：跨列合并单元格，水平方向上合并单元格
- 注意：属性设置在`td`上，合并几行或几列，属性值就写几

### 5、表单标签

- 用于进行页面数据交互

#### （1）普通输入框

- 语法：

  ```html
  <input type="text"  placeholder="输入框中提示性信息"   value="输入框中的默认值">
  ```

#### （2）密码框

- 语法：

  ```html
  <input type="password"  placeholder="输入框中提示性信息"   value="输入框中的默认值">
  ```

- 注意：密码框中的内容是不可见的。

#### （3）单选框

- 语法：

  ```html
  性别：
  <input type="radio" name="gender" id="man"> <label for="man">男</label>
  <input type="radio" name="gender" id="woman"><label for="woman">女 </label>
  ```

- 注意：

  - 单选框需要设置相同的`name`值才能使用单选的效果
  - label的特殊用法：通过label标签上的for属性指定表单元素的id名，通过点击label中 的内容控制对应的表单元素获取焦点

#### （4）多选框

- 语法：

  ```html
  爱好：
  <input type="checkbox">LOL
  <input type="checkbox"  checked>吃鸡
  <input type="checkbox">CF
  ```

- 注意：单选框和多选框可以在标签上设置`checked`属性控制默认选中

#### （5）下拉列表

- 语法：

  ```html
  证件类型：
  <select name="" id=""  multiple>    
    <option value="">身份证</option>    
    <option value="" selected>学生证</option>  
    <option value="">驾驶证</option> 
    <option value="">军官证</option>
  </select>
  ```

- 注意：

  - 一个选项就是一个option标签
  - 下拉列表默认选中第一个选项，可以在`<option>`标签上设置`selected`来控制默认选中
  - 下拉列表默认只能选择一个选项，可以在`<select>`标签上设置`multiple`来控制多选

#### （6）文本域

- 语法：

  ```html
  <textarea  row="设置显示的行数"  cols="设置一行显示的字符个数"></textarea>
  ```

#### （7）按钮

- 语法：

  ```html
  <!-- input -->
  <input type="button"  value="普通按钮">
  <input type="submit"  value="提交按钮">
  <input type="reset"  value="重置按钮">
  <!-- button -->
  <button>按钮</button>
  <button type="button">普通按钮</button>
  <button type="submit">提交按钮</button>
  <button type="reset">重置按钮</button>
  ```

- 注意：

  - 推荐使用button
  - 提交按钮和重置按钮需要配合form标签一起使用才有效
  - button如果没有设置type，也具有提交功能

#### （8）form标签

- 会将form标签中所有的表单元素的数据提交给服务器

- 语法：

  ```html
  <form  action="设置提交数据的服务器地址"  method="设置提交数据的方式"></form>
  ```

  - `method`：设置提交数据的提交方式
    - `get`：从服务器获取数据，也有提交数据的功能，数据会显示在地址栏上
    - `post`：提交数据给服务器，数据不会显示在地址栏上

### 6、列表标签

#### （1）无序列表 ul

- 语法：

  ```html
  <ul>   
    <li>列表项一</li>  
    <li>列表项二</li> 
    <li>列表项三</li>
  </ul>
  ```

- 注意：

  - ul默认上下有外边距margin，有左边的内边距padding-left
  - ul、li标签可以独占一行

#### （2）有序列表 ol

- 语法：

  ```html
  <ol>  
    <li>列表项一</li>  
    <li>列表项二</li>   
    <li>列表项三</li>
  </ol>
  ```

- 注意：

  - ol默认上下有外边距margin，有左边的内边距padding-left
  - ol、li标签可以独占一行
  - 有序列表和无序列表可以相互嵌套使用

#### （3）定义列表 dl

- 语法：

  ```html
  <!--     dt：指定名称。需要解释名词    dd：针对名词进行解释说明-->
  <dl>  
    <dt>中国</dt>    
    <dd>中华人民共和国</dd> 
    <dt>可乐</dt>  
    <dd>肥仔快乐水</dd>
  </dl>
  ```

- 注意：dl、dt、dd都是独占一行

### 7、其他标签

#### （1）div标签

- 可以看做是一个布局的容器，没有任何的样式，独占一行

- 语法：

  ```html
  <div>内容</div>
  ```

#### （2）marquee标签

- 跑马灯，从页面右边进入，滚动到左边出去，无限循环，以后通过使用动画来实现

- 语法：

  ```html
  <marquee behavior="" direction="">公告：明天晚上我们考试</marquee>
  ```

#### （3）del标签

- 删除线标签

- 语法：

  ```html
  <del>998</del>
  ```

#### （4）iframe标签

- 可以将其它网页嵌套进当前页面中

- 语法：

  ```html
   <iframe src="https://woniuxy.com/" frameborder="0" width="1000px" height="500px"></iframe>
  ```

  - `frameborder`：设置显示区域是否有边框
  - 不推荐使用，需要手动设置宽度和高度，网页的高度无法确定的。

#### （5）带边框和标题的标签

- 语法：

  ```html
  <fieldset>  
    <!-- 设置边框上的标题 -->  
    <legend>登录</legend>   
    用户名：<input type="text"> 
    <br>
    密码：<input type="password"> 
    <br>  
    <button>登录</button>
  </fieldset>
  ```
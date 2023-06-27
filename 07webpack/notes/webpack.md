# Nodejs

## 概述

- 一个可以独立运行JavaScript的服务器环境。
- 底层基于谷歌浏览器V8引擎实现。
- 官网:https://nodejs.cn/

## 环境搭建

- 下载Nodejs安装包:https://registry.npmmirror.com/binary.html?path=node/

  - 推荐下载v14，过高的版本后期可能存在兼容问题;
  - windows系统根据系统位数下载对应`.msi`文件

- 安装nodejs

  - 一路next;(建议安装在默认路径下)

- 测试环境

  - 打开命令行窗口(win+R打开运行窗口，输入`cmd`回车);

  - 输入系统命令，检查nodejs版本;

    ```
    node -v
    ```

## 执行JS文件(基于VSCode)

- 创建目标JS文件；

- 选中目标JS文件，鼠标右键`在集成终端中打开`；

- 输入执行JS文件命令

  ```
  node 目标JS文件名称
  ```

## 注意

- nodejs只支持ECMAScript语法，不支持BOM和DOM；

## 作用

- 使用nodejs内置的`npm`命令下载项目常用的第三方库(包)。
- 可以实现后端代码编码运行(可以用JavaScript语法编写后端程序);
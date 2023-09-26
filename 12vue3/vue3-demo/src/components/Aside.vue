<template>
  <el-aside width="250px" style="background-color:#393e46">
      <el-menu active-text-color="#ffd04b" background-color="#393e46" class="el-menu-vertical-demo" default-active="2"
        text-color="#fff" width="100%" @open="handleOpen" @close="handleClose">
        <el-menu-item class="tit">
          <template #title>
            <el-image class="logo" src="http://xawn.x3322.net:8002/distremote/static/img/logo.png" fit="fill" :lazy="true"></el-image>
            <span>赤兔养车</span>
          </template>
        </el-menu-item>
        <el-menu-item index="1" key="">
          <template #title>
            <el-icon>
              <IconMenu />
            </el-icon>
            <span>系统主页</span>
          </template>
        </el-menu-item>

        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <location />
            </el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="2-1">用户管理</el-menu-item>
          <el-menu-item index="2-2">角色管理</el-menu-item>
          <el-menu-item index="2-3">菜单管理</el-menu-item>
          <el-menu-item index="2-4">字典管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <Setting />
            </el-icon>
            <span>系统监控</span>
          </template>
          <el-menu-item index="3-1">在线用户</el-menu-item>
          <el-menu-item index="3-2">系统日志</el-menu-item>
          <el-menu-item index="3-3">Redis监控</el-menu-item>
          <el-menu-item index="3-4">请求追踪</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
</template>

<script lang='ts' setup>
import {
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang='scss' scoped>
  .tit{
    .logo{
      width: 30px;
      height: 16px;
    }
    span{
      font-size: 20px;
      margin-left: 12px;
      font-weight: bold;
    }
  }
</style>
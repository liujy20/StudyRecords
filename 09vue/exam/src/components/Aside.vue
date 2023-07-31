<template>
  
  <el-aside width="200px">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
      :unique-opened="true"
      text-color="#fff"
      background-color="#304156"
    >
      <el-menu-item>
        <span slot="title">
          <img :src="logo" alt="" />
        </span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" text-color="#263445">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
import logo from "../assets/images/woniu.png";
export default {
  data(){
    return{
      logo,
      isCollapse: false,
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss">
.el-aside {
  background-color: #304156;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100vh;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    height: 100%;
    border: none;
    img {
      width: 160px;
    }
  }
}
</style>
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
      router
    >
      <el-menu-item>
        <span slot="title">
          <img :src="logo" alt="" />
        </span>
      </el-menu-item>
      <el-submenu v-for="(item,index) in menus" :key="item.name" :index="String(index+1)">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{item.name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="val in item.children" :key="val.name" :index="val.path">{{val.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">用户</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/user/content">用户管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">订单</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/order/index">订单</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">拼团</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/list/good">拼团商品</el-menu-item>
          <el-menu-item index="/list/group">拼团列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->
    </el-menu>
  </el-aside>
</template>

<script>
import logo from "@/assets/images/woniu.png";
import menus from '@/data/menu.js'
export default {
  data() {
    return {
      logo,
      isCollapse: false,
      menus,
    };
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
  .el-menu-item,
  .el-submenu {
    text-align: left;
  }
}
</style>
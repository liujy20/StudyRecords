<template>
  <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-goods"></i>
          <span>拼团管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">拼团商品</el-menu-item>
          <el-menu-item index="1-2">拼团列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>订单管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">订单详情</el-menu-item>
          <el-menu-item index="2-2">订单列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      
    </el-menu>
</template>

<script>
export default {

}
</script>

<style lang="scss">
// .el-menu{
//   width: 100%;
// }
// .el-submenu{
//   width:100%;
//   color:red !important;
// }
</style>
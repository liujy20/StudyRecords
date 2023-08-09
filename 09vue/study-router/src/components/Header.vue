<template>
  <el-header height="100px">
    <div class="top">
      <i class="el-icon-s-fold"></i>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">营销</a></el-breadcrumb-item>
        <el-breadcrumb-item>拼团管理</el-breadcrumb-item>
      </el-breadcrumb>
      <i class="el-icon-search"></i>
      <i class="el-icon-full-screen"></i>
      <i class="el-icon-bell"></i>
      <el-dropdown>
        <span class="el-dropdown-link">
          {{userName}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>黄金糕</el-dropdown-item>
          <el-dropdown-item>狮子头</el-dropdown-item>
          <el-dropdown-item>螺蛳粉</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="bottom">
      <el-tag>标签一</el-tag>
      <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type">
        {{ tag.name }}
      </el-tag>
    </div>
  </el-header>
</template>

<script>
export default {
  data() {
    return {
      tags: [
        { name: "标签一", type: "danger" },
        { name: "标签二", type: "success" },
        { name: "标签三", type: "info" },
        { name: "标签四", type: "warning" },
      ],
      userName:''
    };
  },
  created(){
    this.userName=this.$route.query.user
  }
};
</script>

<style lang="scss">
.el-header {
  padding: 0 !important;
  background-color: #f5f5f5;
  .top {
    display: flex;
    align-items: center;
    margin-left: 20px;
    padding-right: 30px;
    height: 50px;
    background-color: #fff;
    i {
      margin: 0 10px;
      font-size: 20px;
    }
    .el-breadcrumb {
      flex-grow: 1;
    }
  }
  .bottom {
    display: flex;
    align-items: center;
    padding-left: 20px;
    height: 50px;
    background-color: #f5f5f5;

    .el-tag {
      margin-right: 20px;
    }
  }
}
</style>
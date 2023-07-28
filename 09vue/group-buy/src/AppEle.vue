<template>
  <div class="App">
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          :unique-opened="true"
          text-color="#fff"
          background-color="#263445"
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
              <el-menu-item index="1-1" text-color="#263445"
                >选项1</el-menu-item
              >
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
      <el-container>
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
          <i class="el-icon-chat-square"></i>
          <el-dropdown>
            <span class="el-dropdown-link">
              下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          </div>
        </el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import logo from "./assets/images/woniu.png";
export default {
  name: "App",
  mixins: [],
  components: {},
  props: {},
  data() {
    return {
      logo,
      isCollapse: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
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
body {
  margin: 0;
}
.el-header,
.el-footer {
  // background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-header {
  .top {
    display: flex;
    align-items: center;
    height: 50px;
    i {
      margin: 0 10px;
      font-size: 20px;
    }
    .el-breadcrumb {
      flex-grow: 1;
    }
  }
}

.el-aside {
  background-color: #304156;
  color: #333;
  text-align: center;
  line-height: 200px;
  height: 100vh;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    height: 100%;
    img {
      width: 160px;
    }
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
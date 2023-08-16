<template>
  <el-header height="100px">
    <div class="top">
      <i class="el-icon-s-fold"></i>
      <el-breadcrumb separator="/">
        <transition-group>
          <el-breadcrumb-item v-for="item in getBreadcrumb" :key="item">{{
            item
          }}</el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
      <i class="el-icon-search"></i>
      <i class="el-icon-full-screen"></i>
      <i class="el-icon-bell"></i>
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{ getUser.realName
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="modifyUser">修改用户</el-dropdown-item>
          <el-dropdown-item command="quit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="bottom">
      <el-tag
        v-for="(tag, index) in getTags"
        :key="tag.name"
        :closable="tag.isClosable"
        :type="tag.path == $route.path ? '' : 'info'"
        @click="changePath(tag)"
        @close="closeTag(tag, index)"
      >
        {{ tag.name }}
      </el-tag>
    </div>
  </el-header>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  props: ["name"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getBreadcrumb", "getUser", "getTags"]),
  },
  methods: {
    handleCommand(val) {
      switch (val) {
        case "quit":
          localStorage.removeItem("token");
          this.$router.push({
            name: "good",
          });
          break;
        case "modifyUser":
          this.$router.push({
            name: "adminmodify",
          });
          break;
        default:
          break;
      }
    },
    changePath(tag) {
      this.$router.push({
        path:tag.path
      });
      localStorage.setItem('tag',JSON.stringify(tag))
    },
    closeTag(tag,index) {
      this.delTag(tag);
      if(index==this.getTags.length)
        this.$router.push({
          path: this.getTags[this.getTags.length-1].path,
      });
    },
    ...mapMutations(["delTag"]),
  },
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
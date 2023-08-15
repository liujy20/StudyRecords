<template>
  <div class="App">
    <el-container>
      <!-- 侧边栏 -->
      <aside-vue></aside-vue>
      <el-container direction="vertical">
        <!-- 头部 -->
        <header-vue></header-vue>
        <keep-alive>
          <router-view v-if="$route.meta.isKeepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.isKeepAlive"></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import bus from "@/util/bus.js";

import AsideVue from "../components/Aside.vue";
import HeaderVue from "../components/Header.vue";

export default {
  name: "App",
  mixins: [],
  components: {
    AsideVue,
    HeaderVue,
  },
  props: {},
  data() {
    return {
      user: {},
      menuList:[]
    };
  },
  methods: {
    async info() {
      let res1 = await this.$http.userHttp.getUserInfo();
      // console.log(res1.data.userInfo);
      this.user = res1.data.userInfo;
      // console.log(this.user.roles[0]._id);
      let res2=await this.$http.userHttp.getRightById({_id:this.user.roles[0]._id})
      // console.log(res2.data.data.menu);
      this.menuList=res2.data.data.menu
    },
  },
  async created() {
    // this.info();
    // bus.$on("user", () => {
    //   this.info();
    // });
    await this.$store.dispatch('reqInfo')
    this.$store.dispatch('reqMenus',this.$store.getters.getUserID)
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
}
.el-footer {
  // background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}
body > .el-container {
  margin-bottom: 40px;
}
</style>
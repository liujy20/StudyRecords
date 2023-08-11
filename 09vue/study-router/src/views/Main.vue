<template>
  <div class="App">
    <el-container>
      <!-- 侧边栏 -->
      <aside-vue></aside-vue>
      <el-container direction="vertical">
        <!-- 头部 -->
        <header-vue :name="user.realName"></header-vue>
        <router-view></router-view>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import bus from "@/util/bus.js";

import AsideVue from "../components/Aside.vue";
import HeaderVue from "../components/Header.vue";
import axios from 'axios';

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
    };
  },
  methods:{
    async info(){
      let res = await axios.get("http://localhost:4001/admin/getUserInfo", {
      headers: { Authorization: localStorage.getItem("token") },
    });
    console.log(res.data.userInfo);
    this.user = res.data.userInfo;
    }
  },
  created() {
    this.info()
    bus.$on('user',()=>{
      this.info()
    })

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
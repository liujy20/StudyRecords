<template>
  <div class="App">
    <el-container>
      <!-- 侧边栏 -->
      <aside-vue></aside-vue>
      <el-container direction="vertical">
        <!-- 头部 -->
        <header-vue></header-vue>
        <group-vue></group-vue>
        <!-- <good-vue></good-vue> -->
        <!-- 尾部 -->
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<script>

import AsideVue from './components/Aside.vue';
import HeaderVue from './components/Header.vue';
import GoodVue from './views/Good.vue';
import GroupVue from './views/Group.vue';

export default {
  name: "App",
  mixins: [],
  components: {
    AsideVue,
    HeaderVue,
    GroupVue,
    GoodVue,
  },
  props: {},
  data() {
    return {
     
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    
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
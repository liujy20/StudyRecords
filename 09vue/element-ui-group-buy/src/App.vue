<template>
  <div class="App">
    <el-container>
      <!-- 侧边栏 -->
      <aside-vue></aside-vue>
      <el-container>
        <!-- 头部 -->
        <header-vue></header-vue>
        <main-vue></main-vue>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import AsideVue from './components/Aside.vue';
import HeaderVue from './components/Header.vue';
import MainVue from './components/Main.vue';

export default {
  name: "App",
  mixins: [],
  components: {
    AsideVue,
    HeaderVue,
    MainVue,
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
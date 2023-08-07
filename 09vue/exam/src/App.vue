<template>
  <div class="App">
    <el-container>
      <!-- 侧边栏 -->
      <aside-vue></aside-vue>
      <el-container direction="vertical">
        <!-- 头部 -->
        <header-vue></header-vue>
        <OrderVue></OrderVue>

      </el-container>
    </el-container>
  </div>
</template>

<script>

import AsideVue from './components/Aside.vue';
import HeaderVue from './components/Header.vue';
import ContentVue from './views/Content/Content.vue';
import OrderVue from './views/Order/Order.vue';

export default {
  name: "App",
  mixins: [],
  components: {
    AsideVue,
    HeaderVue,
    ContentVue,
    OrderVue,
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
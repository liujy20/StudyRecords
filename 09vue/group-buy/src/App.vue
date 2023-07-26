<template>
  <div id="app">
    <aside-vue></aside-vue>
    <div class="main">
      <header-vue></header-vue>
      <content-vue></content-vue>
      <!-- <all-content-vue></all-content-vue> -->
    </div>
    <!-- <good-info-vue></good-info-vue> -->
  </div>
</template>

<script>
import AllContentVue from './views/AllContent.vue';
import AsideVue from "./components/Aside.vue";
import ContentVue from "./views/Content.vue";
import GoodInfoVue from "./components/GoodInfo.vue";
import HeaderVue from "./components/Header.vue";
export default {
  name: "App",
  components: {
    AsideVue,
    ContentVue,
    HeaderVue,
    GoodInfoVue,
    AllContentVue
  },
  data(){
    return{
      count:0
    }
  },
  methods:{
    
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  height: 100%;
}
html {
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
}
* {
  list-style: none;
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
}
.main {
  width: calc(100% - 200px);
  height: 100%;
  // overflow: auto;
}
</style>

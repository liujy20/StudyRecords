<template>
  <div id="app">
    <AsideVue></AsideVue>
    <div class="main">
      <HeaderVue></HeaderVue>
      <ContentVue></ContentVue>
      <FooterVue></FooterVue>
    </div>
  </div>
</template>

<script>
import AsideVue from "./components/Aside.vue";
import ContentVue from './components/Content.vue';
import HeaderVue from './components/Header.vue';
export default {
  name: "App",
  components: {
    AsideVue,
    ContentVue,
    HeaderVue
  },
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
a{
  text-decoration: none;
}
.main {
  width: 90%;
  height: 100%;
  overflow: auto;
}
</style>

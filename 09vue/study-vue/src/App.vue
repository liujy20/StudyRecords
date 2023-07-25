<template>
  <div id="app">
    <!-- <AsideVue></AsideVue>
    <div class="main">
      <HeaderVue></HeaderVue>
      <ContentVue></ContentVue>
      <FooterVue></FooterVue>
    </div> -->
  <study-vue></study-vue>
  </div>
</template>

<script>
import AsideVue from "./components/Aside.vue";
import ContentVue from "./components/Content.vue";
import FooterVue from "./components/Footer.vue";
import HeaderVue from './components/Header.vue';
import StudyVue from './components/Study.vue';

export default {
  name: "App",
  components: {
    HeaderVue,
    AsideVue,
    ContentVue,
    FooterVue,
    StudyVue
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
  height: 100vh;
  color: #fff;
}
body{
  margin: 0;
}
.main{
  width: 90%;
}
</style>

<template>
  <div id="app">
    <!-- <study></study> -->
    <study-v-model></study-v-model>
  </div>
</template>

<script>
import Study from "./study/计算属性练习.vue";
import StudyVModel from "./study/计算属性练习v-model.vue";
export default {
  name: "App",
  components: {
    Study,
    StudyVModel,
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
a {
  text-decoration: none;
}
</style>

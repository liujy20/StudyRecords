<template>
  <div id="app">
    <!-- <keep-alive> -->
    <router-view></router-view>
    <!-- </keep-alive> -->
  </div>
</template>

<script>

export default {
  name: "app",
  components: {
  },
};
</script>

<style>
#app {
  height: 100vh;
  overflow: hidden;
  background-color: #050328;
  background-image: url("./assets/bg.png");
}
</style>

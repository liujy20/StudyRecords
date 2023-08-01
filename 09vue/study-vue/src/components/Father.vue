<template>
  <div>
    <son-vue>
    <template v-slot:header>
      <h1>header</h1>
    </template>
    <template v-slot:main>
      <h2>main</h2>
    </template>
    <template v-slot:footer>
      <h3>footer</h3>
    </template>
  </son-vue>
  </div>
</template>

<script>
import SonVue from "./Son.vue";
export default {
  components: {
    SonVue,
  },
};
</script>

<style>
*{
  color: aquamarine;
}
</style>
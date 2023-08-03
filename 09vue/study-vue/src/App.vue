<template>
  <div id="app">
    <!-- <father-vue></father-vue> -->
    <brother-1-vue></brother-1-vue>
    <brother-2-vue></brother-2-vue>
  </div>
</template>

<script>
import brother1Vue from './components/brother1.vue'
import brother2Vue from './components/brother2.vue'
import FatherVue from './components/Father.vue'
export default {
  components: {
    FatherVue,
    brother1Vue,
    brother2Vue
}
}
</script>

<style>
</style>

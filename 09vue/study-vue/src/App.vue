<template>
  <div id="app">
    <!-- <dynamic-components></dynamic-components> -->
    <father-vue></father-vue>
  </div>
</template>

<script>
import brother1Vue from './components/brother1.vue'
import brother2Vue from './components/brother2.vue'
import FatherVue from './components/生命周期/Father.vue'
// import FatherVue from './components/Father.vue'
import DynamicComponents from './components/动态组件/Father.vue'
export default {
  components: {
    FatherVue,
    brother1Vue,
    brother2Vue,
    DynamicComponents,
}
}
</script>

<style>
</style>

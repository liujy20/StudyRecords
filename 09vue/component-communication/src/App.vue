<template>
  <div id="app">
    <!-- <user-control></user-control> -->
  <student-vue></student-vue>
  </div>
</template>

<script>
import StudentVue from './views/Student/Student.vue'
import UserControl from './views/UserControl/UserControl.vue'

export default {
  name: 'app',
  components: {
    UserControl,
    StudentVue,
  }
}
</script>

<style>
</style>

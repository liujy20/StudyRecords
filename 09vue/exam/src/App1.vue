<template>
  <div class="App">
    <to-do-list-vue></to-do-list-vue>
  </div>
</template>

<script>
import ToDoListVue from './views/ToDoList/ToDoList.vue';
export default {
  name: "App",
  mixins: [],
  components: {
    ToDoListVue
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
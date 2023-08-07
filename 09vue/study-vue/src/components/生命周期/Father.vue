<template>
  <div>
    <div >{{count}}</div>
    <son-vue @add="add" :count="count"> </son-vue>
  </div>
</template>

<script>
import sonVue from "./son.vue";
export default {
  components: {
    sonVue,
  },
  data() {
    return {
      count: 1,
    };
  },
  methods:{
    add(){
      this.count++
    }
  },
  beforeCreate() {
    console.log("父组件beforeCreate");
  },
  created() {
    console.log("父组件created");
  },
  beforeMount() {
    console.log("父组件beforeMount");
  },
  mounted() {
    console.log("父组件mounted");
  },
  beforeUpdate() {
    console.log("父组件beforeUpdate");
  },
  updated() {
    console.log("父组件updated");
  },
  beforeDestroy() {
    console.log("父组件beforeDestroy");
  },
  destroy() {
    console.log("父组件destroy");
  },
};
</script>

<style>
</style>
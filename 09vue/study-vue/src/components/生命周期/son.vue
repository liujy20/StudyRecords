<template>
<button @click="$emit('add')">{{count}}</button>
</template>

<script>
export default {
  props:['count'],
  data(){
    return{
    }
  },
  beforeCreate() {
    console.log("子组件beforeCreate");
  },
  created() {
    console.log("子组件created");
  },
  beforeMount() {
    console.log("子组件beforeMount");
  },
  mounted() {
    console.log("子组件mounted");
  },
  beforeUpdate() {
    console.log("子组件beforeUpdate");
  },
  updated() {
    console.log("子组件updated");
  },
  beforeDestroy() {
    console.log("子组件beforeDestroy");
  },
  destroy() {
    console.log("子组件destroy");
  },
};
</script>

<style>
</style>
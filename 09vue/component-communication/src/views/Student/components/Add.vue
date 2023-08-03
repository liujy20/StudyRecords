<template>
    <form-vue v-bind="$attrs" v-on="$listeners"></form-vue>
</template>

<script>
import FormVue from './Form.vue';
export default {
  components:{
    FormVue,
  },
data(){
    return {
      
    }
  }
};
</script>

<style>

</style>
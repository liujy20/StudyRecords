<template>
  <!-- <div>
    <slot name="header"></slot>
    <slot name="main" :val1="wg1" :val2="wg2"></slot>
    <slot name="footer"></slot>
  </div> -->
  <div>
    info: {{info}} <br>
    phone: {{phone}} <br>
    <input type="text" v-model="info.name">
  </div>
</template>

<script>
export default {
  // props: {
  //   fInfo:{
  //     type:Object,
  //     default:function(){
  //       return {}
  //     }
  //   },
  //   fPhone:{
  //     type:String,
  //     default:function(){
  //       return '未知'
  //     }
  //   }
  // },
  props:['phone','info'],
  data() {
    return {
      wg1: "xwg",
      wg2: "dwg",
    };
  },
};
</script>

<style>
</style>
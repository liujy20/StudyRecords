<template>
  <!-- <div>
    <slot name="header"></slot>
    <slot name="main" :val1="wg1" :val2="wg2"></slot>
    <slot name="footer"></slot>
  </div> -->
  <!-- <div>
    info: {{info}} <br>
    phone: {{phone}} <br>
    <input type="text" v-model="info.name">
  </div> -->
  <div>
    <input type="text" name="" id="" :value="value" @input="demo">
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
  // props:['phone','info'],
  props:['value'],
  data() {
    return {
      wg1: "xwg",
      wg2: "dwg",
    };
  },
  methods:{
    demo(e){
      this.$emit('input',e.target.value)
    }
  }
};
</script>

<style>
</style>
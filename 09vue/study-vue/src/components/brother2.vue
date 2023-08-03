<template>
  <h1>
    brother2接收消息
    <el-button @click="getMsg">接收消息注册</el-button>
    {{info}}
    <input type="text" v-model="info">
  </h1>
</template>

<script>
import bus from "../util/bus";
export default {
  data() {
    return {
      info: "123",
    };
  },
  created(){
    // bus.$on("msg",this.getMsg)
  },
  methods: {
    // getMsg(msg) {
    //     this.info = msg;
    // },
    getMsg(){
      bus.$on('msg', (newValue) => {
        this.info = newValue;
      });
    }
  },
};
</script>

<style>
</style>